import React, { useCallback, useEffect, useMemo, useState } from "react";

interface KeysPageProps {
  backendUrl: string;
}

interface ApiKeyRecord {
  keyHash: string;
  last4: string;
  owner: string;
  createdAt: string;
  expiresAt: string;
  disabled?: boolean;
}

interface CreateKeyResponse {
  owner: string;
  key: string;
  last4: string;
  expiresAt: string;
}

const formatIso = (iso: string): string => new Date(iso).toLocaleString();

export const KeysPage: React.FC<KeysPageProps> = ({ backendUrl }) => {
  const adminToken = useMemo(
    () => (import.meta as any).env.VITE_ADMIN_TOKEN as string,
    [],
  );
  const [rows, setRows] = useState<ApiKeyRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [owner, setOwner] = useState("");
  const [days, setDays] = useState<number>(90);
  const [noExpiry, setNoExpiry] = useState<boolean>(false);
  const [createdSecret, setCreatedSecret] = useState<CreateKeyResponse | null>(
    null,
  );

  const handleLoad = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${backendUrl}/v1/admin/keys`, {
        headers: { "X-Admin-Token": adminToken },
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = (await r.json()) as ApiKeyRecord[];
      setRows(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [adminToken, backendUrl]);

  useEffect(() => {
    void handleLoad();
  }, [handleLoad]);

  const handleCreate = useCallback(async () => {
    if (!owner.trim()) return;
    setError(null);
    try {
      const r = await fetch(`${backendUrl}/v1/admin/keys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": adminToken,
        },
        body: JSON.stringify({ owner, days, noExpiry }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = (await r.json()) as CreateKeyResponse;
      setCreatedSecret(data);
      await handleLoad();
    } catch (e) {
      setError((e as Error).message);
    }
  }, [adminToken, backendUrl, days, handleLoad, noExpiry, owner]);

  const handleRevoke = useCallback(
    async (keyHash: string) => {
      setError(null);
      try {
        const r = await fetch(`${backendUrl}/v1/admin/keys/revoke`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Token": adminToken,
          },
          body: JSON.stringify({ keyHash }),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        await handleLoad();
      } catch (e) {
        setError((e as Error).message);
      }
    },
    [adminToken, backendUrl, handleLoad],
  );

  const handleCopy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      alert("Secret copied");
    } catch {
      alert("Copy failed");
    }
  }, []);

  return (
    <div>
      <h3>API Keys</h3>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <input
          aria-label="Owner"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <input
          type="number"
          aria-label="Days"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          disabled={noExpiry}
          min={1}
        />
        <label>
          <input
            type="checkbox"
            checked={noExpiry}
            onChange={(e) => setNoExpiry(e.target.checked)}
          />
          No expiry
        </label>
        <button onClick={handleCreate} disabled={!owner}>
          Create
        </button>
      </div>

      {createdSecret && (
        <div
          style={{ padding: 12, border: "1px solid #ccc", marginBottom: 16 }}
        >
          <div>
            <b>Owner:</b> {createdSecret.owner}
          </div>
          <div>
            <b>Secret (copy now):</b> <code>{createdSecret.key}</code>
          </div>
          <div>
            <b>Last4:</b> {createdSecret.last4}
          </div>
          <div>
            <b>Expires:</b> {formatIso(createdSecret.expiresAt)}
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => handleCopy(createdSecret.key)}>
              Copy secret
            </button>
            <button
              style={{ marginLeft: 8 }}
              onClick={() => setCreatedSecret(null)}
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {error && (
        <div style={{ color: "#b00020", marginBottom: 8 }}>Error: {error}</div>
      )}
      {loading ? (
        <div>Loading…</div>
      ) : (
        <table
          width="100%"
          cellPadding={6}
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th align="left">Owner</th>
              <th>Last4</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Disabled</th>
              <th>Hash</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.keyHash} style={{ borderTop: "1px solid #eee" }}>
                <td>{r.owner}</td>
                <td align="center">{r.last4}</td>
                <td align="center">{formatIso(r.createdAt)}</td>
                <td align="center">{formatIso(r.expiresAt)}</td>
                <td align="center">{r.disabled ? "yes" : "no"}</td>
                <td style={{ fontFamily: "monospace", fontSize: 12 }}>
                  {r.keyHash}
                </td>
                <td align="center">
                  {r.disabled ? (
                    <button
                      onClick={async () => {
                        try {
                          const resp = await fetch(
                            `${backendUrl}/v1/admin/keys/delete`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                "X-Admin-Token": adminToken,
                              },
                              body: JSON.stringify({ keyHash: r.keyHash }),
                            },
                          );
                          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                          await handleLoad();
                        } catch (e) {
                          setError((e as Error).message);
                        }
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    <button onClick={() => void handleRevoke(r.keyHash)}>
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
