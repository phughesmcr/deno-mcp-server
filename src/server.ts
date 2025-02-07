// @ts-types="npm:@types/express"

import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { isObject, validateHostname, validateServerName, validateServerPort, validateServerVersion } from "./utils.ts";
import { DEFAULT_HOSTNAME, DEFAULT_PORT } from "./constants.ts";
import type { ServerSpec, ServerState } from "./types.ts";

export function validateServerSpec(spec: ServerSpec): ServerSpec {
  if (!isObject(spec)) {
    throw new TypeError("Server spec must be an object");
  }
  const name = validateServerName(spec.name);
  const version = validateServerVersion(spec.version);
  const port = spec.port ? validateServerPort(spec.port) : DEFAULT_PORT;
  const hostname = spec.hostname ? validateHostname(spec.hostname) : DEFAULT_HOSTNAME;
  return { name, version, port, hostname };
}

export default class Server {
  #hostname: string;
  #name: string;
  #port: number;
  #server: McpServer;
  #state: ServerState;

  constructor(spec: ServerSpec) {
    const { name, version, port, hostname } = validateServerSpec(spec);
    this.#server = new McpServer({ name, version });
    this.#name = name;
    this.#hostname = hostname ?? DEFAULT_HOSTNAME;
    this.#port = port ?? DEFAULT_PORT;
    this.#state = { stdio: false, sse: false };
  }

  get hostname(): string {
    return this.#hostname;
  }

  set hostname(hostname: string) {
    this.#hostname = validateHostname(hostname);
    console.error(`Server hostname set to ${this.#hostname}`);
  }

  get server(): McpServer {
    return this.#server;
  }

  get name(): string {
    return this.#name;
  }

  get port(): number {
    return this.#port;
  }

  set port(port: number) {
    this.#port = validateServerPort(port);
    console.error(`Server port set to ${this.#port}`);
  }

  async startStdioServer(): Promise<void> {
    if (this.#state.stdio) throw new Error("stdio server already started");
    const transport = new StdioServerTransport();
    await this.#server.connect(transport);
    this.#state.stdio = true;
    console.error(`Server "${this.#name}" started on stdio`);
  }

  startSseServer(): void {
    if (this.#state.sse) throw new Error("SSE server already started");

    let transport: SSEServerTransport | null = null;

    const app = express();

    app.get("/sse", async (_, res) => {
      transport = new SSEServerTransport("/messages", res);
      await this.#server.connect(transport);
    });

    app.post("/messages", async (req, res) => {
      if (!transport) throw new Error("No SSE transport found");
      await transport.handlePostMessage(req, res);
    });

    app.listen(this.#port, this.#hostname);

    this.#state.sse = true;
    console.error(`Server "${this.#name}" started at ${this.#hostname}:${this.#port}`);
  }
}

export { Server };
