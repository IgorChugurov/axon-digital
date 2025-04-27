"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function GlobalLoaderOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleShow = () => setVisible(true);
    const handleHide = () => setVisible(false);

    window.addEventListener("showLoaderOverlay", handleShow);
    window.addEventListener("hideLoaderOverlay", handleHide);

    return () => {
      window.removeEventListener("showLoaderOverlay", handleShow);
      window.removeEventListener("hideLoaderOverlay", handleHide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
      <Loader2 className="w-10 h-10 animate-spin text-white" />
    </div>
  );
}
