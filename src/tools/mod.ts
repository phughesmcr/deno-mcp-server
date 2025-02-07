import { createEchoTool } from "./echo/echo.ts";
import type Server from "../server.ts";

const TOOLS = [
  createEchoTool,
];

export const attachTools = (server: Server) => {
  const { server: mcpserver } = server;
  for (const tool of TOOLS) {
    tool(mcpserver);
  }
};
