import React, { useMemo, useState } from "react";
import { KeysPage } from "./KeysPage";
import { LogsPage } from "./LogsPage";
import { ErrorLogsPage } from "./ErrorLogsPage";

export const App: React.FC = () => {
  const [tab, setTab] = useState<"keys" | "logs" | "errors">("keys");
  const backendUrl = useMemo(
    () => import.meta.env.VITE_BACKEND_URL as string,
    [],
  );

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 16 }}>
      <h2>Admin Panel</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTab("keys")} aria-pressed={tab === "keys"}>
          Keys
        </button>
        <button onClick={() => setTab("logs")} aria-pressed={tab === "logs"}>
          Logs
        </button>
        <button
          onClick={() => setTab("errors")}
          aria-pressed={tab === "errors"}
        >
          Error Logs
        </button>
      </div>
      {tab === "keys" && <KeysPage backendUrl={backendUrl} />}
      {tab === "logs" && <LogsPage backendUrl={backendUrl} />}
      {tab === "errors" && <ErrorLogsPage backendUrl={backendUrl} />}
    </div>
  );
};
