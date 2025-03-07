(async () => {
  const myUser = await generateRandomUser();
  let activeUsers = [];
  let typingUsers = [];

  const socket = new WebSocket(generateBackendUrl());

  socket.addEventListener("open", () => {
    console.log("WebSocket connected!");
    socket.send(JSON.stringify({ type: "newUser", user: myUser }));
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    console.log("WebSocket message:", message);

    switch (message.type) {
      case "message":
        const messageElement = generateMessage(message, myUser);
        document.getElementById("messages").appendChild(messageElement);
        setTimeout(() => {
          messageElement.classList.add("opacity-100");
        }, 100);
        break;

      case "activeUsers":
        activeUsers = message.users;
        break;

      case "typing":
        typingUsers = message.users;
        updateTypingUI(typingUsers);
        break;

      default:
        break;
    }
  });

  socket.addEventListener("close", () => {
    console.log("WebSocket closed.");
  });

  socket.addEventListener("error", (event) => {
    console.error("WebSocket error:", event);
  });

  // Wait until the DOM is fully loaded before adding event listeners
  document.addEventListener("DOMContentLoaded", () => {
    // Send a message when the send button is clicked
    document.getElementById("sendButton").addEventListener("click", () => {
      sendMessage();
    });

    // Detect when the user starts typing
    document.getElementById("messageInput").addEventListener("input", () => {
      socket.send(JSON.stringify({ type: "typing", user: myUser }));
    });

    // Detect key presses in the input field
    document.getElementById("messageInput").addEventListener("keydown", (event) => {
      if (event.key.length === 1) {
        socket.send(JSON.stringify({ type: "typing", user: myUser }));
      }

      if (event.key === "Enter") {
        sendMessage();
      }
    });
  });

  // Function to send a message
  function sendMessage() {
    const message = document.getElementById("messageInput").value.trim();
    if (message) {
      socket.send(JSON.stringify({ type: "message", message, user: myUser }));
      document.getElementById("messageInput").value = "";
    }
  }

  // Function to update the UI with users currently typing
  function updateTypingUI(typingUsers) {
    const typingDiv = document.getElementById("typingStatus");
    if (!typingDiv) return; // Prevents errors if the element is missing

    if (typingUsers.length > 0) {
      typingDiv.innerText = `${typingUsers.map((user) => user.name).join(", ")} is typing...`;
    } else {
      typingDiv.innerText = "";
    }
  }
})();
