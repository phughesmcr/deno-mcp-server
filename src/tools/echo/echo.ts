import type { McpServer } from "@modelcontextprotocol/sdk";
import { z } from "zod";

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
