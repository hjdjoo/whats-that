export type EncryptedData = {
  cipher: string
  salt: string
  iv: string
}

type MessagePayloads = {
  "auth:login": {
    token: string
  }
  "auth:logout": {}
}

/**
 * Union from type MessagePayloads;
 * MessagePayloads must be updated when new message types are added for proper type-checking.
 */
export type ExtMessage = {
  [K in keyof MessagePayloads]: {
    type: K
    data: MessagePayloads[K]
  }
}[keyof MessagePayloads]