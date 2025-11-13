import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
const formatIso = (iso) => new Date(iso).toLocaleString();
export const KeysPage = ({ backendUrl }) => {
    const adminToken = useMemo(() => import.meta.env.VITE_ADMIN_TOKEN, []);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [owner, setOwner] = useState("");
    const [days, setDays] = useState(90);
    const [noExpiry, setNoExpiry] = useState(false);
    const [createdSecret, setCreatedSecret] = useState(null);
    const handleLoad = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const r = await fetch(`${backendUrl}/v1/admin/keys`, {
                headers: { "X-Admin-Token": adminToken },
            });
            if (!r.ok)
                throw new Error(`HTTP ${r.status}`);
            const data = (await r.json());
            setRows(data);
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    }, [adminToken, backendUrl]);
    useEffect(() => {
        void handleLoad();
    }, [handleLoad]);
    const handleCreate = useCallback(async () => {
        if (!owner.trim())
            return;
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
            if (!r.ok)
                throw new Error(`HTTP ${r.status}`);
            const data = (await r.json());
            setCreatedSecret(data);
            await handleLoad();
        }
        catch (e) {
            setError(e.message);
        }
    }, [adminToken, backendUrl, days, handleLoad, noExpiry, owner]);
    const handleRevoke = useCallback(async (keyHash) => {
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
            if (!r.ok)
                throw new Error(`HTTP ${r.status}`);
            await handleLoad();
        }
        catch (e) {
            setError(e.message);
        }
    }, [adminToken, backendUrl, handleLoad]);
    const handleCopy = useCallback(async (text) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            }
            else {
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
        }
        catch {
            alert("Copy failed");
        }
    }, []);
    return (_jsxs("div", { children: [_jsx("h3", { children: "API Keys" }), _jsxs("div", { style: {
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 16,
                }, children: [_jsx("input", { "aria-label": "Owner", placeholder: "Owner", value: owner, onChange: (e) => setOwner(e.target.value) }), _jsx("input", { type: "number", "aria-label": "Days", placeholder: "Days", value: days, onChange: (e) => setDays(Number(e.target.value)), disabled: noExpiry, min: 1 }), _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: noExpiry, onChange: (e) => setNoExpiry(e.target.checked) }), "No expiry"] }), _jsx("button", { onClick: handleCreate, disabled: !owner, children: "Create" })] }), createdSecret && (_jsxs("div", { style: { padding: 12, border: "1px solid #ccc", marginBottom: 16 }, children: [_jsxs("div", { children: [_jsx("b", { children: "Owner:" }), " ", createdSecret.owner] }), _jsxs("div", { children: [_jsx("b", { children: "Secret (copy now):" }), " ", _jsx("code", { children: createdSecret.key })] }), _jsxs("div", { children: [_jsx("b", { children: "Last4:" }), " ", createdSecret.last4] }), _jsxs("div", { children: [_jsx("b", { children: "Expires:" }), " ", formatIso(createdSecret.expiresAt)] }), _jsxs("div", { style: { marginTop: 8 }, children: [_jsx("button", { onClick: () => handleCopy(createdSecret.key), children: "Copy secret" }), _jsx("button", { style: { marginLeft: 8 }, onClick: () => setCreatedSecret(null), children: "Hide" })] })] })), error && (_jsxs("div", { style: { color: "#b00020", marginBottom: 8 }, children: ["Error: ", error] })), loading ? (_jsx("div", { children: "Loading\u2026" })) : (_jsxs("table", { width: "100%", cellPadding: 6, style: { borderCollapse: "collapse" }, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { align: "left", children: "Owner" }), _jsx("th", { children: "Last4" }), _jsx("th", { children: "Created" }), _jsx("th", { children: "Expires" }), _jsx("th", { children: "Disabled" }), _jsx("th", { children: "Hash" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: rows.map((r) => (_jsxs("tr", { style: { borderTop: "1px solid #eee" }, children: [_jsx("td", { children: r.owner }), _jsx("td", { align: "center", children: r.last4 }), _jsx("td", { align: "center", children: formatIso(r.createdAt) }), _jsx("td", { align: "center", children: formatIso(r.expiresAt) }), _jsx("td", { align: "center", children: r.disabled ? "yes" : "no" }), _jsx("td", { style: { fontFamily: "monospace", fontSize: 12 }, children: r.keyHash }), _jsx("td", { align: "center", children: r.disabled ? (_jsx("button", { onClick: async () => {
                                            try {
                                                const resp = await fetch(`${backendUrl}/v1/admin/keys/delete`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "X-Admin-Token": adminToken,
                                                    },
                                                    body: JSON.stringify({ keyHash: r.keyHash }),
                                                });
                                                if (!resp.ok)
                                                    throw new Error(`HTTP ${resp.status}`);
                                                await handleLoad();
                                            }
                                            catch (e) {
                                                setError(e.message);
                                            }
                                        }, children: "Delete" })) : (_jsx("button", { onClick: () => void handleRevoke(r.keyHash), children: "Revoke" })) })] }, r.keyHash))) })] }))] }));
};
