"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatButton.module.css";
import { ChevronDown, MessageCircle, X } from "lucide-react";

import { InputArea } from "../InputArea/InputArea";
import { useChatMessaging } from "./useChatMessaging";


interface PROPS {
  apiUrl: string;
  labels?: {
    title?: string;
    placeholder?: string;
  };
}

const ChatButton = ({ labels, apiUrl }: PROPS) => {
  const title = labels?.title || "AI Assistant";
  const placeholder = labels?.placeholder || "Type your message...";
  const [openModal, setOpenModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { input, setInput, loading, messages, handleSendMessage, resetThread } =
    useChatMessaging(apiUrl);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.copilotMainContainer}>
      <div className={styles.container}>
        <button
          className="iconButton primaryIconButton"
          onClick={() => setOpenModal(!openModal)}
        >
          {!openModal ? <MessageCircle /> : <ChevronDown />}
        </button>
      </div>

      {openModal && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.titleWrapper}>
              <span className={styles.title}>{title}</span>
            </div>

            <button className="iconButton" onClick={() => setOpenModal(false)}>
              <X />
            </button>
          </div>

          <div className={`${styles.chatBody} ${styles.scrollbarHide}`}>
            <div
              className={`${styles.wrapper} ${styles.scrollbarHide}`}
              id="copilotchat"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageRow} ${
                    msg.sender === "user"
                      ? styles.justifyEnd
                      : styles.justifyStart
                  }`}
                >
                  <div
                    className={`
                      ${styles.messageBubble}
                      ${
                        msg.sender === "user"
                          ? styles.userBubble
                          : msg.error
                            ? styles.errorBubble
                            : styles.botBubble
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className={styles.chatFooter}>
            <InputArea
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              resetThread={resetThread}
              loading={loading}
              isListening={isListening}
              setIsListening={setIsListening}
              messagesLength={messages.length}
              placeholder={placeholder}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
