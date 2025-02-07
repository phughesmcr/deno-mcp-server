export type ServerState = {
  stdio: boolean;
  sse: boolean;
};

/** The specification of a server */
export type ServerSpec = {
  /** The hostname for the server to listen on */
  hostname?: string;
  /** The name of the server */
  name: string;
  /** The port for the SSE server to listen on */
  port?: number;
  /** The version of the server */
  version: string;
};
