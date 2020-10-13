import React, { useState, useCallback, useEffect } from "react";
import Lobby from "./Lobby";
import Room from "./Room";

import firebase from "firebase";

const VideoChat = () => {
  const [username, setUsername] = useState("");
  const roomName = "test";
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {}, []);

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyDi21L2LBqNnYyTJBuaAZCGLMk3zXdXioA",
      authDomain: "videostream-af379.firebaseapp.com",
      databaseURL: "https://videostream-af379.firebaseio.com",
      projectId: "videostream-af379",
      storageBucket: "videostream-af379.appspot.com",
      messagingSenderId: "349858613585",
      appId: "1:349858613585:web:808f64620eddccaf6e6b70",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      firebase
        .database()
        .ref(username)
        .on("value", (snapshot) => {
          const tokenData = snapshot.val();
          if (tokenData) {
            setToken(tokenData);
          }
        });

      // const data = await fetch("/video/token", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     identity: username,
      //     room: roomName,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }).then((res) => res.json());
      // setToken(data.token);
    },
    [roomName, username]
  );

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
