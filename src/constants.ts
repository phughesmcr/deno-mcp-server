import DenoJson from "../deno.json" with { type: "json" };

export const SERVER_NAME = "deno_mcp_server";

export const SERVER_VERSION = DenoJson.version;

export const DEFAULT_HOSTNAME = "localhost";

export const DEFAULT_PORT = 8080;

export const OBJ_PROP_NAME_PATTERN = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/;

export const SEMVER_PATTERN = /^[0-9]+\.[0-9]+\.[0-9]+$/;

export const HOSTNAME_PATTERN =
  /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
