import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import toast, { Toaster } from "react-hot-toast";

function randomID(len = 5) {
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const App = () => {
  const [userInfo, setUserInfo] = useState({ userName: "", userID: "" });
  const [calleeID, setCalleeID] = useState("");

  useEffect(() => {
    const userID = randomID();
    const userName = "user_" + userID;
    setUserInfo({ userName: userName, userID: userID });
  }, []);

  const handleCall = (callType) => {
    const appID = parseInt(import.meta.env.VITE_appID);
    const serverSecret = import.meta.env.VITE_serverSecret;

    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      // userID, try this
      // userName try this
      userInfo.userID,
      userInfo.userName
    );

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });
    let callee = calleeID;
    if (!callee) {
      toast.error("enter valid callee ID");
      return;
    }
    zp.sendCallInvitation({
      callees: [{ userID: callee, userName: userInfo.userName }],
      callType,
      timeout: 10,
    })
      .then((response) => {
        console.log(response, "response");
        if (response.errorInvitees.length) {
          toast.error("user is not available");
        }
      })
      .catch((error) => {
        toast.error(error);
        console.log(error, "error");
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="bottom-center" reverseOrder={false} />
      <Header />
      <main className="flex-grow p-5">
        <div className="title">
          <h2>Username: {userInfo.userName}</h2>
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
          <button
            onClick={() =>
              handleCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)
            }
            className="border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white px-2"
          >
            Voice Call
          </button>
          <button
            onClick={() =>
              handleCall(ZegoUIKitPrebuilt.InvitationTypeVideoCall)
            }
            className="border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white px-2"
          >
            Video Call
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
