import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <main className="flex flex-1 flex-col  bg-white overflow-auto">
      <Header />
      <div className="flex flex-col flex-1  overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto  scrollbar-hide"></div>
        <Footer />
      </div>
    </main>
  );
}
