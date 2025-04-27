import ChatWindowStream from "./components/ChatWindowStream";
import Header from "./components/Header";
import { SidebarDesktop } from "./components/SidebarDesktop";

export default function Home() {
  return (
    <>
      <SidebarDesktop />
      <main className="flex flex-col flex-1 bg-white overflow-auto">
        <Header />
        <ChatWindowStream />
      </main>
    </>
  );
}
