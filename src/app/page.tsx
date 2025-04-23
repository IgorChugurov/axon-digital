import ChatWindowStream from "./components/ChatWindowStream";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          alignSelf: "stretch",
          width: "100%",
        }}
        className="bg-white"
      >
        <Header />
      </div>

      <ChatWindowStream />
    </>
  );
}
