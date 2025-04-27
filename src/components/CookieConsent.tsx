"use client";

import React, { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 bg-gray-900 text-white text-sm rounded-lg p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 z-50">
      <span>
        We use cookies to enhance your browsing experience. By continuing to use
        our site, you accept our use of cookies.
      </span>
      <button
        onClick={acceptCookies}
        className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        Accept
      </button>
    </div>
  );
}
