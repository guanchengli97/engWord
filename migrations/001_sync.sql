BEGIN;
CREATE TABLE IF NOT EXISTS garden_accounts (
  owner text PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS garden_entries (
  owner text NOT NULL REFERENCES garden_accounts(owner),
  key text NOT NULL,
  value jsonb NOT NULL,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  operation_id text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(owner, key)
);
COMMIT;
