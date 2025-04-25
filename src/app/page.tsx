import ChatWindowStream from "./components/ChatWindowStream";
import Header from "./components/Header";
import { SidebarDesktop } from "./components/SidebarDesktop";

export default function Home() {
  return (
    <>
      <Header />
      <ChatWindowStream />
    </>
  );
}
