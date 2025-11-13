import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { KeysPage } from "./KeysPage";
import { LogsPage } from "./LogsPage";
import { ErrorLogsPage } from "./ErrorLogsPage";
export const App = () => {
    const [tab, setTab] = useState("keys");
    const backendUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL, []);
    return (_jsxs("div", { style: { fontFamily: "Inter, system-ui, sans-serif", padding: 16 }, children: [_jsx("h2", { children: "Admin Panel" }), _jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 16 }, children: [_jsx("button", { onClick: () => setTab("keys"), "aria-pressed": tab === "keys", children: "Keys" }), _jsx("button", { onClick: () => setTab("logs"), "aria-pressed": tab === "logs", children: "Logs" }), _jsx("button", { onClick: () => setTab("errors"), "aria-pressed": tab === "errors", children: "Error Logs" })] }), tab === "keys" && _jsx(KeysPage, { backendUrl: backendUrl }), tab === "logs" && _jsx(LogsPage, { backendUrl: backendUrl }), tab === "errors" && _jsx(ErrorLogsPage, { backendUrl: backendUrl })] }));
};
