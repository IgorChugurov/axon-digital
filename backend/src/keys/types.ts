export interface ApiKeyRecord {
  keyHash: string; // sha256 hex
  last4: string;
  owner: string;
  createdAt: string; // ISO
  expiresAt: string; // ISO
  disabled?: boolean;
}
