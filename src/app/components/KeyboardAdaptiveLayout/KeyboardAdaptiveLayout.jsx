// components/KeyboardAdaptiveLayout.jsx
"use client"; // Обязательно для хуков и доступа к window

import React, { useState, useEffect, useRef } from "react";

export default function KeyboardAdaptiveLayout({ children }) {
  const [visualViewportHeight, setVisualViewportHeight] = useState(null);
  const mainContainerRef = useRef(null);

  useEffect(() => {
    // Устанавливаем начальную высоту при монтировании
    if (window.visualViewport) {
      setVisualViewportHeight(window.visualViewport.height);
    } else {
      // Фолбэк для старых браузеров/десктопа
      setVisualViewportHeight(window.innerHeight);
    }

    const handleResize = () => {
      if (window.visualViewport) {
        setVisualViewportHeight(window.visualViewport.height);
        // Опционально: плавно прокрутить активный инпут в видимую область
        // const activeElement = document.activeElement;
        // if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        //   // Небольшая задержка может помочь
        //   setTimeout(() => {
        //     activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        //   }, 100);
        // }
      } else {
        setVisualViewportHeight(window.innerHeight);
      }
    };

    // Добавляем слушатель события resize для visualViewport
    // Используем 'resize' так как visualViewport API триггерит именно его
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      // Некоторые браузеры могут также требовать 'scroll'
      window.visualViewport.addEventListener("scroll", handleResize);
    } else {
      // Фолбэк на resize окна для браузеров без visualViewport
      window.addEventListener("resize", handleResize);
    }

    // Очистка при размонтировании компонента
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []); // Пустой массив зависимостей - выполняется один раз при монтировании

  const containerStyle = visualViewportHeight
    ? { height: `${visualViewportHeight}px` }
    : { height: "100dvh" }; // Фолбэк, если высота еще не определена
  const styles2 = {
    WebkitFontSmoothing: "antialiased", // эквивалент Tailwind 'antialiased'
    height: "100dvh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    ...containerStyle,
  };

  return (
    <div ref={mainContainerRef} style={styles2}>
      {children}
    </div>
  );
}
