import { createEchoTool } from "./echo/echo.ts";
import type Server from "../server.ts";

export const attachTools = (server: Server) => [
  createEchoTool(server.server),
];
