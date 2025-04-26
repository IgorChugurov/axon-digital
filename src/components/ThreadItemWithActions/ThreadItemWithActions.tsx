"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Download, MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { getMessagesFromServer } from "@/services/threads";
import { Thread } from "@/app/components/SidebarDesktop";

interface Props {
  thread: Thread;
  isActive: boolean;
  onSelect: (threadId: string) => void;
  setDialogOpen: (open: boolean) => void;
  setDialogForDelete: (thread: Thread | null) => void;
}

export const ThreadItemWithActions: React.FC<Props> = ({
  thread,
  isActive,
  onSelect,
  setDialogOpen,
  setDialogForDelete,
}) => {
  const { threadId, title } = thread;
  const [menuOpen, setMenuOpen] = useState(false); // <--- добавляем state для открытия меню

  const downloadThread = async () => {
    const res = await getMessagesFromServer(threadId);

    const dataStr = JSON.stringify(res, null, 2); // красиво форматируем JSON
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `conversation_${threadId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url); // очищаем объект после скачивания
  };

  return (
    <>
      <div
        onClick={() => onSelect(threadId)}
        // className={cn(
        //   "relative group flex items-center justify-between w-full text-left text-base px-2 py-1 rounded-md transition-colors",
        //   isActive
        //     ? "bg-gray-300 text-gray-900 font-medium"
        //     : "hover:bg-gray-200 text-gray-800",
        //   (menuOpen || undefined) && "bg-gray-200", // при наведении тоже перекрываем на bg-gray-200
        // )}

        className={`
          relative group flex items-center justify-between w-full text-left text-base px-2 py-1 rounded-md transition-colors
          ${
            menuOpen
              ? "bg-gray-200 text-gray-900 font-medium"
              : isActive
              ? "bg-gray-300 text-gray-900 font-medium hover:bg-gray-200"
              : "hover:bg-gray-200 text-gray-800"
          }
        `}
        title={title || `Thread ${threadId.substring(0, 6)}...`}
      >
        {/* Текст с отступом под троеточие */}
        <span className="truncate pr-6 pointer-events-none">
          {title || `Thread ${threadId.substring(0, 6)}...`}
        </span>

        {/* Троеточие — появляется при ховере */}
        <div
          className={cn(
            "absolute right-1 top-1/2 -translate-y-1/2 transition-opacity pointer-events-auto",
            menuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            "transition-all duration-200 transform group-hover:scale-100 scale-95"
          )}
        >
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 rounded  cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="z-[9000]">
              <DropdownMenuItem
                className="text-red-600  focus:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:text-red-600 cursor-pointer"
                onClick={() => {
                  setDialogForDelete(thread);
                  setDialogOpen(true);
                }}
              >
                <Trash2 className="text-red-600" /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-gray-800  focus:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-800 cursor-pointer"
                onClick={() => downloadThread()}
              >
                <Download className="text-gray-800" /> Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
