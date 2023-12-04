import React from "react";

function ChatBot() {
  return (
    <iframe
      className="chat-bot"
      width="350"
      height="430"
      allow="microphone;"
      src="https://console.dialogflow.com/api-client/demo/embedded/a6bce2c0-57d6-4ac1-836e-197dfa3b12a7"
      title="Chat Bot"
    ></iframe>
  );
}

export default ChatBot;
