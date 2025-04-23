"use client";

import { sendMessage } from "@/utils/sendMessage";
import React, { useEffect, useState } from "react";
import ButtonForLeftPanel from "./ButtonForLeftPanel";
import { THREAD_KEY } from "./ChatWindowStream";

interface Thread {
  threadId: string;
  title: string;
  createdAt: string;
}

interface SidebarDesktopProps {
  onSelectThread: (threadId: string) => void;
  activeThreadId?: string;
}

export const SidebarDesktop: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  useEffect(() => {
    const fetchThreads = () => {
      fetch("/api/conversations/threads")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.threads)) {
            setThreads(data.threads);
          }
          setTimeout(() => {
            const savedThreadId = localStorage.getItem(THREAD_KEY);
            if (savedThreadId) {
              setActiveThreadId(savedThreadId);
            }
          }, 1000);
        })
        .catch(console.error);
    };

    fetchThreads(); // начальная загрузка

    const refreshHandler = () => {
      fetchThreads();
    };

    window.addEventListener("refreshThreads", refreshHandler);
    return () => {
      window.removeEventListener("refreshThreads", refreshHandler);
    };
  }, []);

  useEffect(() => {
    const leftPanelState = localStorage.getItem("leftPanel");
    if (leftPanelState) {
      try {
        setExpanded(JSON.parse(leftPanelState));
      } catch {}
    } else {
      setExpanded(false);
    }
    const handleToggleLeftPanel = (event: CustomEvent) => {
      const { detail } = event;
      console.log(detail);
      if (detail === true) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    window.addEventListener(
      "toggleLeftPanel",
      handleToggleLeftPanel as EventListener
    );

    return () => {
      window.removeEventListener(
        "toggleLeftPanel",
        handleToggleLeftPanel as EventListener
      );
    };
  }, []);
  const onSelectThread = (threadId: string) => {
    localStorage.setItem(THREAD_KEY, threadId);
    setActiveThreadId(threadId);
    sendMessage("selectThread", threadId);
  };

  return (
    <div
      style={{ overflow: "hidden", minHeight: "100dvh", maxHeight: "100dvh" }}
      className={`
      transition-all duration-300 bg-gray-100 border-r border-gray-200
      ${expanded ? "w-64" : "w-0"}
      
  
      fixed md:static top-0 left-0 z-[1001]
      h-screen
      shadow-xl bg-white
       md:h-full md:shadow-none md:bg-gray-100
     
    `}
    >
      <div
        className="flex items-center justify-between px-2 "
        style={{ height: "50px" }}
      >
        <ButtonForLeftPanel />
      </div>

      <div className="space-y-1 px-2 overflow-y-auto">
        {threads.map((thread) => (
          <button
            key={thread.threadId}
            onClick={() => onSelectThread(thread.threadId)}
            className={`w-full text-left text-sm px-2 py-1 rounded-md flex items-center ${
              thread.threadId === activeThreadId
                ? "bg-gray-300 text-gray-900"
                : "hover:bg-gray-200 text-gray-800"
            }`}
            title={thread.title}
          >
            {thread.title}
          </button>
        ))}
      </div>
    </div>
  );
};
