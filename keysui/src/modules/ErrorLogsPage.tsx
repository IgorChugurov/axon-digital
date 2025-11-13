import React, { useCallback, useEffect, useMemo, useState } from "react";

interface ErrorLogsPageProps {
  backendUrl: string;
}

export const ErrorLogsPage: React.FC<ErrorLogsPageProps> = ({ backendUrl }) => {
  const adminToken = useMemo(
    () => (import.meta as any).env.VITE_ADMIN_TOKEN as string,
    [],
  );
  const [items, setItems] = useState<any[]>([]);
  const [bytes, setBytes] = useState<number>(200000);
  const [limit, setLimit] = useState<number>(200);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `${backendUrl}/v1/admin/error-logs/list?bytes=${bytes}&limit=${limit}`,
        {
          headers: { "X-Admin-Token": adminToken },
        },
      );
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const json = (await r.json()) as any[];
      setItems(json);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [adminToken, backendUrl, bytes, limit]);

  useEffect(() => {
    void handleLoad();
  }, [handleLoad]);

  return (
    <div>
      <h3>Error Logs</h3>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <label>
          Tail bytes:
          <input
            type="number"
            min={1000}
            step={1000}
            value={bytes}
            onChange={(e) => setBytes(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
        <label>
          Limit:
          <input
            type="number"
            min={10}
            step={10}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
        <button onClick={() => void handleLoad()}>Reload</button>
      </div>
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
              <th align="left">At</th>
              <th>Message</th>
              <th>Route</th>
              <th>Method</th>
              <th>Status</th>
              <th>API Key</th>
              <th>Client IP</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r, idx) => (
              <tr key={idx} style={{ borderTop: "1px solid #eee" }}>
                <td>{r.at}</td>
                <td>{r.message}</td>
                <td>{r.route || "-"}</td>
                <td align="center">{r.method || "-"}</td>
                <td align="center">{r.status ?? "-"}</td>
                <td align="center">{r.apiKeyMasked || "-"}</td>
                <td align="center">{r.clientIp || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
