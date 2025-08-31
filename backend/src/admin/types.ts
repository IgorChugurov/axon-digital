import type { ApiKeyRecord } from "../keys/types.js";

export interface CreateKeyBody {
  owner: string;
  days?: number;
  noExpiry?: boolean;
}

export interface CreateKeyResponse {
  owner: string;
  key: string; // secret, shown once
  last4: string;
  expiresAt: string; // ISO
}

export interface RevokeKeyBody {
  key?: string;
  keyHash?: string;
}

export interface DeleteKeyBody {
  keyHash: string;
}

export type ListKeysResponse = ApiKeyRecord[];
