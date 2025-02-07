import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk";

export function createEchoTool(server: McpServer) {
  return server.tool(
    "echo",
    { message: z.string() },
    // deno-lint-ignore require-await
    async ({ message }: { message: string }) => ({
      content: [{ type: "text", text: `Tool echo: ${message}` }],
    }),
  );
}
