#!/bin/sh
set -eu
# Runs only when the named database volume is first initialized.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<'SQL'
\getenv app_password APP_DB_PASSWORD
CREATE USER word_garden_app WITH PASSWORD :'app_password';
GRANT CONNECT ON DATABASE word_garden TO word_garden_app;
SQL
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /opt/garden/001_sync.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<'SQL'
GRANT USAGE ON SCHEMA public TO word_garden_app;
GRANT SELECT, INSERT, UPDATE ON garden_accounts, garden_entries TO word_garden_app;
SQL
