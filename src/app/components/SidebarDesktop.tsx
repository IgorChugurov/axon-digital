"use client";

import { sendMessage } from "@/utils/sendMessage";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ButtonForLeftPanel from "./ButtonForLeftPanel";
import { THREAD_KEY } from "./ChatWindowStream";
import Link from "next/link";
import { ThreadItemWithActions } from "@/components/ThreadItemWithActions/ThreadItemWithActions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
export interface Thread {
  threadId: string;
  title: string;
  createdAt: string;
}

export const SidebarDesktop: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogForDelete, setDialogForDelete] = useState<Thread | null>(null);

  const pathname = usePathname();
  const router = useRouter();
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
          });
        })
        .catch(console.error);
    };

    fetchThreads(); // initial loading

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
      setExpanded(!!event.detail);
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
  const handleSelectThread = (threadId: string) => {
    localStorage.setItem(THREAD_KEY, threadId);
    setActiveThreadId(threadId);
    sendMessage("selectThread", threadId);

    // Если мы не на главной странице — делаем переход на главную
    if (pathname !== "/") {
      router.push("/");
    }
  };
  const handleDelete = () => {
    const id = dialogForDelete?.threadId;
    if (!id) return;
    // здесь можно сделать fetch на API удаления и обновить список
    setThreads((prev) => prev.filter((t) => t.threadId !== id));
    // и если удалён активный — сбросить активный тред
    if (id === activeThreadId) {
      setActiveThreadId(null);
      localStorage.removeItem(THREAD_KEY);
    }
    sendMessage("selectThread", null);
    setDialogOpen(false);
    setDialogForDelete(null);
  };
  return (
    // Основной контейнер сайдбара: Flex-колонка, занимает всю высоту родителя
    <>
      <div
        className={`
        flex flex-col h-full 
        overflow-hidden      
        transition-all duration-300 ease-in-out shadow-xl md:shadow-none bg-gray-100 border-r border-gray-200
        ${expanded ? "w-64" : "w-0"} 
        fixed md:static top-0 left-0 z-[49] 
        shadow-xl md:shadow-none md:bg-gray-100 
      `}
      >
        {/* 1. Верхний блок (заголовок/кнопка закрытия) */}
        <div
          className="flex-shrink-0 flex items-center justify-start px-2 border-b border-gray-200" // justify-end чтобы кнопка была справа
          style={{ height: "50px" }} // Фиксированная высота
        >
          <ButtonForLeftPanel />
        </div>

        {/* 2. Средний блок (растягивается, скролл внутри) */}
        <div className="flex-grow overflow-hidden min-h-0">
          {/* <-- Растягивается, скрывает свой overflow, min-h-0 для flex-багов */}
          {/* Внутренний контейнер для контента, который будет скроллиться */}
          <span className="px-3 text-sm font-bold">Chats</span>
          <div className="h-full overflow-y-auto px-3 pb-4 pt-1 space-y-1 scrollbar-hide">
            {" "}
            {/* <-- Занимает всю высоту среднего блока, скроллится по Y */}
            {threads.map((thread) => (
              <ThreadItemWithActions
                setDialogOpen={setDialogOpen}
                setDialogForDelete={setDialogForDelete}
                key={thread.threadId}
                thread={thread}
                isActive={thread.threadId === activeThreadId}
                onSelect={handleSelectThread}
              />
            ))}
          </div>
        </div>

        {/* 3. Нижний блок (прижат книзу, динамическая высота) */}
        <div className="flex-shrink-0 p-3 border-t border-gray-200">
          {/* <-- Не сжимается, отступы, рамка сверху */}
          <Link
            href="/public-offer"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline block"
          >
            Public Offer
          </Link>
          {/* Здесь можно добавить другие ссылки в будущем */}
        </div>
      </div>
      {/* Dialog вынесен отдельно, не внутри DropdownMenu */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="animate-in fade-in-0 zoom-in-95 duration-200">
          <DialogHeader>
            <DialogTitle>Delete thread?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            {`Are you sure you want to delete this chat? This action cannot be undone.`}
          </p>
          <DialogFooter>
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-base"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-base"
              onClick={handleDelete}
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  // return (
  //   <div
  //     style={{ overflow: "hidden", minHeight: "100dvh", maxHeight: "100dvh" }}
  //     className={`
  //     transition-all duration-300 bg-gray-100 border-r border-gray-200
  //     ${expanded ? "w-64" : "w-0"}

  //     fixed md:static top-0 left-0 z-[1001]
  //     h-screen
  //     shadow-xl bg-white
  //      md:h-full md:shadow-none md:bg-gray-100

  //   `}
  //   >
  //     <div
  //       className="flex items-center justify-between px-2 "
  //       style={{ height: "50px" }}
  //     >
  //       <ButtonForLeftPanel />
  //     </div>

  //     <div className="space-y-1 px-2 overflow-y-auto">
  //       {threads.map((thread) => (
  //         <button
  //           key={thread.threadId}
  //           onClick={() => onSelectThread(thread.threadId)}
  //           className={`w-full text-left text-sm px-2 py-1 rounded-md flex items-center ${
  //             thread.threadId === activeThreadId
  //               ? "bg-gray-300 text-gray-900"
  //               : "hover:bg-gray-200 text-gray-800"
  //           }`}
  //           title={thread.title}
  //         >
  //           {thread.title}
  //         </button>
  //       ))}
  //     </div>
  //   </div>
  // );
};
