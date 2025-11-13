import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
export const ErrorLogsPage = ({ backendUrl }) => {
    const adminToken = useMemo(() => import.meta.env.VITE_ADMIN_TOKEN, []);
    const [items, setItems] = useState([]);
    const [bytes, setBytes] = useState(200000);
    const [limit, setLimit] = useState(200);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleLoad = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const r = await fetch(`${backendUrl}/v1/admin/error-logs/list?bytes=${bytes}&limit=${limit}`, {
                headers: { "X-Admin-Token": adminToken },
            });
            if (!r.ok)
                throw new Error(`HTTP ${r.status}`);
            const json = (await r.json());
            setItems(json);
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    }, [adminToken, backendUrl, bytes, limit]);
    useEffect(() => {
        void handleLoad();
    }, [handleLoad]);
    return (_jsxs("div", { children: [_jsx("h3", { children: "Error Logs" }), _jsxs("div", { style: {
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                }, children: [_jsxs("label", { children: ["Tail bytes:", _jsx("input", { type: "number", min: 1000, step: 1000, value: bytes, onChange: (e) => setBytes(Number(e.target.value)), style: { marginLeft: 8 } })] }), _jsxs("label", { children: ["Limit:", _jsx("input", { type: "number", min: 10, step: 10, value: limit, onChange: (e) => setLimit(Number(e.target.value)), style: { marginLeft: 8 } })] }), _jsx("button", { onClick: () => void handleLoad(), children: "Reload" })] }), error && (_jsxs("div", { style: { color: "#b00020", marginBottom: 8 }, children: ["Error: ", error] })), loading ? (_jsx("div", { children: "Loading\u2026" })) : (_jsxs("table", { width: "100%", cellPadding: 6, style: { borderCollapse: "collapse" }, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { align: "left", children: "At" }), _jsx("th", { children: "Message" }), _jsx("th", { children: "Route" }), _jsx("th", { children: "Method" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "API Key" }), _jsx("th", { children: "Client IP" })] }) }), _jsx("tbody", { children: items.map((r, idx) => (_jsxs("tr", { style: { borderTop: "1px solid #eee" }, children: [_jsx("td", { children: r.at }), _jsx("td", { children: r.message }), _jsx("td", { children: r.route || "-" }), _jsx("td", { align: "center", children: r.method || "-" }), _jsx("td", { align: "center", children: r.status ?? "-" }), _jsx("td", { align: "center", children: r.apiKeyMasked || "-" }), _jsx("td", { align: "center", children: r.clientIp || "-" })] }, idx))) })] }))] }));
};
