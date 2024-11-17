import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const App = () => {
  const [userInfo, setUserInfo] = useState({ username: "", userID: "" });
  const [calleeID, setCalleeID] = useState("");

  useEffect(() => {
    const userID = randomID();
    const username = "user__" + userID;
    setUserInfo({ username: username, userID: userID });

    const appID = import.meta.env.VITE_appID;
    const serverSecret = import.meta.env.VITE_serverSecret;

    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userID,
      userName
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-5">
        <div className="title">
          <h2>Username: {userInfo.username}</h2>
          <h2>User ID: {userInfo.userID}</h2>
        </div>
        <div className="inputs py-2">
          <input
            onChange={(e) => setCalleeID(e.target.value)}
            className="border-2 border-gray-300 rounded px-2"
            type="text"
            placeholder="callee's user ID"
            name=""
            id=""
          />
        </div>
        <div className="buttons flex gap-4 py-2">
          <button className="border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white px-2">
            Voice Call
          </button>
          <button className="border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white px-2">
            Video Call
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
