# Mac mini + Docker Compose 部署

现在使用一个 Compose 项目管理两个容器：

```text
手机 / 电脑 → HTTPS 域名 → Cloudflare Tunnel
                              ↓
Mac mini：127.0.0.1:3000 → app（Node.js 网页 + API）
                              ↓ Docker 内网
                          db（PostgreSQL）
```

不需要部署 Worker、创建 Hyperdrive 或 TCP VPC 服务。现有隧道可继续使用，新增一个网站的 HTTP 路由。登录保护由 Cloudflare 控制台的 Access 策略负责，Docker 应用不验证登录凭据。所有能访问应用的人共享同一份学习记录。

## 1. 备份旧学习记录

在原来的网页地址点击「导出备份」保存 JSON。新域名无法读取原网址的浏览器 localStorage；原记录仍保留在旧网址。

这套 Compose 会创建独立数据库和持久化卷，不会连接或修改你原来 `8300` 端口上的 PostgreSQL。若原数据库已存有本项目数据，先按下方迁移说明导出。

## 2. 准备 Mac mini

安装并启动 Docker Desktop（或支持 Docker Compose 的容器运行环境）。确保 Mac mini 不自动睡眠、网络可用，Docker 和 cloudflared 在登录/重启后能正常启动。`restart: unless-stopped` 只在 Docker 引擎运行时生效。

在项目目录执行：

```sh
cp .env.example .env
chmod 600 .env
openssl rand -hex 32
openssl rand -hex 32
```

将两次生成的不同密码分别填进 `.env` 的 `POSTGRES_PASSWORD` 和 `APP_DB_PASSWORD`。不要把 `.env` 提交到 Git。

完整配置含义：

| 配置 | 填什么 |
|---|---|
| `APP_PORT` | Mac 上的应用端口，默认 `3000`；被占用可修改 |
| `SYNC_PROFILE` | 可选的数据归属标识，默认 `personal`，不是密码或登录配置 |
| `POSTGRES_PASSWORD` | 新数据库管理员密码 |
| `APP_DB_PASSWORD` | 新数据库应用专用账号密码 |

## 3. 在 Cloudflare 控制台设置访问权限

为最终域名配置 Self-hosted Access 应用，保护整个网站（包括 `/api/*`），Allow 策略只允许你的邮箱，可选择 One-time PIN 邮箱验证码登录。这些配置只在 Cloudflare 控制台完成，不需要在 Docker 中填写 Team domain、AUD 或邮箱。

Docker 应用本身没有登录验证：任何能直接访问应用端口或通过网关的人都能读写共享学习记录。因此 Compose 保持仅发布 `127.0.0.1`，数据库不发布端口。公网访问由 Tunnel + Access 控制；同源检查是写请求保护，不是身份验证。

多台设备默认使用同一个 `personal` 数据标识。如果此前已经用旧版邮箱验证保存过数据，将 `SYNC_PROFILE` 设置为原 OWNER_EMAIL 的小写值，以继续使用原数据库记录和浏览器待同步队列；新安装无需修改默认值。

## 4. 启动两个容器

```sh
docker compose config -q
docker compose up -d --build
docker compose ps
docker compose logs --tail=80 app db
```

第一次启动，PostgreSQL 自动创建 `word_garden` 数据库，执行 `migrations/001_sync.sql`，创建 `word_garden_app` 账号并授予两张应用表的读写权限。应用使用这个普通账号，不使用管理员账号。

数据库健康后应用才启动。数据库数据保存在 `postgres_data` 命名卷，更新应用不会删除它。不要使用 `docker compose down -v`，它会删除数据库卷。

在 Mac mini 上验证应用和数据库：

```sh
curl http://127.0.0.1:3000/healthz
```

返回 `ok` 表示应用能查询应用表。若改了 APP_PORT，此命令也使用相应端口。

数据库没有配置宿主机 `ports` 映射。app 通过 `db:5432` 访问数据库；这段连接位于 Mac mini 的 Docker 私有网络中，当前未启用 PostgreSQL TLS。浏览器到 Cloudflare 使用 HTTPS，Cloudflare 到 cloudflared 使用加密隧道。不要将这套内部数据库配置直接用于跨机器公网连接。

## 5. 将域名接到现有隧道

在现有 Tunnel 的 **Published application routes / Public Hostnames** 中新增：

| 字段 | 填什么 |
|---|---|
| Hostname | `words.example.com`（你准备使用的域名） |
| Service type | **HTTP** |
| URL | `localhost:3000`（cloudflared 直接运行在 Mac mini 时） |

若 cloudflared 在 Docker 容器内，`localhost` 指的是隧道容器，不能使用以上地址。推荐把该隧道容器加入 app 所在的 `word-garden_web` 网络，服务地址使用 `http://app:3000`；可以用 `docker network connect word-garden_web 隧道容器名` 临时接入，并在隧道容器的 Compose 配置中持久声明这个 external network。数据库网络无需接入。

本机 `127.0.0.1` 发布端口不保证能从其他容器通过 `host.docker.internal` 访问，因此不要依赖这种连接方式。

如果域名以前绑在 Worker 上，先解除该域名的 Worker route/custom domain，再交给 Tunnel，避免请求继续到旧应用。数据库的旧 TCP VPC 服务和 Hyperdrive 不参与当前访问流程，可以在确认没有其他应用使用后自行清理。

打开你的访问域名，通过邮箱验证码登录，点击「同步 / 重试」。显示「已同步」即表明整条链路工作正常。

## 6. 迁移和多设备验证

- 原网址有本地学习进度：导出 JSON，在新网址点击「导入备份文件」，再「导入本机记录到云端」。
- 原 PostgreSQL 已经有本项目的表：从原库导出 **仅这两张表的数据**（`garden_accounts`、`garden_entries`），在新的空应用库中恢复。将 SYNC_PROFILE 设置为原数据的 owner（旧版通常是小写邮箱），避免切换到另一份记录。恢复前先备份；不要直接拿其他 PostgreSQL 主版本的数据目录覆盖新卷。
- 在另一台设备用同一邮箱登录。修改一个单词状态，另一台切回页面、点同步或等 30 秒即可看到更新。

现有同步行为保留：本地即时更新、后台保存、离线队列、刷新后重试、按单词版本处理冲突。云端已接受的状态在冲突时优先，页面会提示，你可以再次修改。同一账号的已会/未会、自定义词和小卡片点击方式同步；地图位置、缩放和学习范围各设备独立。

旧记录导入只填补云端不存在的记录，云端已有的「未会」也保留。首次同步前会保存旧本地记录到 `word-garden-local-before-sync`，导入前另存 `word-garden-before-cloud-import`。

## 7. 更新、备份和恢复

更新应用：

```sh
docker compose up -d --build app
```

停止和恢复服务（保留卷）：

```sh
docker compose stop
docker compose up -d
```

备份整个应用数据库，文件会包含学习记录，应复制一份到 Mac mini 以外的位置：

```sh
mkdir -p backups
docker compose exec -T db pg_dump -U postgres -d word_garden -Fc > "backups/word-garden-$(date +%Y%m%d-%H%M%S).dump"
```

恢复到**空的备用数据库**检查备份：

```sh
docker compose exec db createdb -U postgres word_garden_restore
docker compose exec -T db pg_restore -U postgres -d word_garden_restore --no-owner --no-privileges < backups/你的备份文件.dump
```

首次初始化脚本只对空卷运行。更改 `.env` 密码不会自动修改已有数据库角色密码；应先通过数据库管理工具修改角色密码，再更新 `.env` 并重建容器。未来新增数据库迁移也需显式执行，不能依赖重启再次运行初始化目录。

## 本地开发与测试

```sh
npm ci
npm test
npm run build
```

`npm start` 启动 Node.js 服务；`npm run dev` 自动重启服务。直接用 Node.js 时在环境变量或 `.env` 补充 `PGHOST`、`PGPORT`、`PGDATABASE`、`PGUSER`、`PGPASSWORD`，默认监听 `127.0.0.1:3000`。Compose 自动传入这些配置，不需要额外填写。应用不验证 Access 凭据，本机调试也可直接同步，无需另外配置访问域名。

浏览器回归（需 Playwright 和 Chrome）：

```sh
npm run check:map
npm run check:sync
```

`npm test` 使用嵌入式 PostgreSQL 测试 SQL、Node HTTP 服务、无登录接口访问、同源检查、冲突和重试，不连接你的真实数据库。Docker 构建只复制必要文件，`.env`、备份和服务端源码不会通过静态文件服务公开。

## 常见问题

- `Cannot connect to the Docker daemon`：启动 Docker Desktop 后重试。
- Tunnel 返回 502：检查 app 健康状态、路由端口、cloudflared 所在环境。
- `请求来源不匹配`：隧道应保留原始 Host，并传递正确的 X-Forwarded-Proto（公网 HTTPS 时为 https）；不要把 HTTP Host Header 覆盖为 localhost。应用按这些请求信息自动检查同源，不需要填写 APP_ORIGIN。
- Cloudflare 登录页拒绝访问：在控制台检查 Access 的邮箱允许策略，Docker 中无需修改认证配置。
- `数据库暂时不可用`：检查 `docker compose ps`、db 日志和角色权限。
- Mac mini 关机或断网：整个网站不可用。已打开的页面可继续操作并保留本地待同步记录，恢复后重试。

参考：[Compose 内网](https://docs.docker.com/compose/how-tos/networking/)、[启动健康依赖](https://docs.docker.com/compose/how-tos/startup-order/)。
