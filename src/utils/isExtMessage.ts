import { type ExtMessage } from "@src/types";

/**
 * Helper function for checking message structure during runtime;
 * @param m message sent by browser.runtime.sendMessage;
 * @returns boolean
 */

export function isExtMessage(m: unknown): m is ExtMessage {
  if (typeof m !== 'object' || m === null) return false;
  const { type, data } = m as any;
  switch (type) {
    case 'auth:login': return typeof data?.token === 'string';
    case 'auth:logout': return true;
    default: return false;
  }
}