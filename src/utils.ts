import { HOSTNAME_PATTERN, OBJ_PROP_NAME_PATTERN, SEMVER_PATTERN } from "./constants.ts";

/**
 * Exits the program with a given exit code and a message
 * @param message - The error or message to exit with
 * @param exitCode - The exit code to exit with (default: 1)
 */
export function exitWithError(message: Error | string, exitCode: number = 1): void {
  console.error(message instanceof Error ? message.message : message);
  Deno.exit(exitCode);
}

/**
 * Checks if a value is an object
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Validates the server name
 * @param name - The server name
 * @returns The validated server name
 * @throws {TypeError} If the server name is not a string
 * @throws {SyntaxError} If the server name is an empty string or not a valid JSON property name
 */
export function validateServerName(name: string): string {
  if (typeof name !== "string") {
    throw new TypeError(`Error: Expected server name to be a string, got ${typeof name}`);
  }
  if (!name || !name.trim().length) {
    throw new SyntaxError("Error: Expected server name to be a non-empty string");
  }
  if (!OBJ_PROP_NAME_PATTERN.test(name)) {
    throw new SyntaxError("Error: Expected server name to be a valid JSON property name");
  }
  return name;
}

/**
 * Validates the server version
 * @param version - The server version
 * @returns The validated server version
 * @throws {TypeError} If the server version is not a string
 * @throws {SyntaxError} If the server version is an empty string or not a valid semver string
 */
export function validateServerVersion(version: string): string {
  if (typeof version !== "string") {
    throw new TypeError(`Error: Expected server version to be a string, got ${typeof version}`);
  }
  if (!version || !version.trim()) {
    throw new SyntaxError("Error: Expected server version to be a non-empty string");
  }
  if (!SEMVER_PATTERN.test(version)) {
    throw new SyntaxError("Server version must be a valid semver string");
  }
  return version;
}

/**
 * Validates the server port
 * @param port - The server port
 * @returns The validated server port
 * @throws {TypeError} If the server port is not a number
 * @throws {SyntaxError} If the server port is not a valid number
 */
export function validateServerPort(port: number): number {
  if (typeof port !== "number") {
    throw new TypeError(`Error: Expected server port to be a number, got ${typeof port}`);
  }
  if (isNaN(port)) {
    throw new SyntaxError("Server port must be a valid number");
  }
  if (port < 0 || port > 65535) {
    throw new RangeError(`Error: Expected server port to be between 0 and 65535, got ${port}`);
  }
  return port;
}

/**
 * Validates the server hostname
 * @param hostname - The server hostname
 * @returns The validated server hostname
 * @throws {TypeError} If the server hostname is not a string
 * @throws {SyntaxError} If the server hostname is an empty string or not a valid hostname
 */
export function validateHostname(hostname: string): string {
  if (typeof hostname !== "string") {
    throw new TypeError(`Error: Expected server hostname to be a string, got ${typeof hostname}`);
  }
  if (!hostname || !hostname.trim()) {
    throw new SyntaxError("Error: Expected server hostname to be a non-empty string");
  }
  if (!HOSTNAME_PATTERN.test(hostname)) {
    throw new SyntaxError("Error: Expected server hostname to be a valid hostname");
  }
  return hostname;
}
