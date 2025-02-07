#!/usr/bin/env -S deno run -A

import Server from "./src/server.ts";
import { SERVER_NAME, SERVER_VERSION } from "./src/constants.ts";
import { attachTools } from "./src/tools/mod.ts";

const server = new Server({
  name: SERVER_NAME,
  version: SERVER_VERSION,
});

attachTools(server);

server.startSseServer();
server.startStdioServer();
