document.addEventListener("DOMContentLoaded", async () => {
  const myUser = await generateRandomUser();
  let activeUsers = [];
  let typingUsers = [];
  let typingTimeout;

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
        document.getElementById('activeUsers').textContent = `${activeUsers.map(user => user.name).join(', ')}`
        break;
      case "typing":
        typingUsers = message.users;
        updateTypingIndicator(typingUsers);
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

  // Function to send a message
  function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    if (message !== "") {
      socket.send(JSON.stringify({ type: "message", message, user: myUser }));
      messageInput.value = "";
      updateTypingIndicator([]); // Clear typing indicator after sending message
    }
  }

  // Send message when clicking the send button
  document.getElementById("sendButton").addEventListener("click", sendMessage);

  // Send message when pressing Enter key
  document.getElementById("messageInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent newline
      sendMessage();
    }
  });

  // Typing event
  document.getElementById("messageInput").addEventListener("input", () => {
    if (typingTimeout) clearTimeout(typingTimeout);
    socket.send(JSON.stringify({ type: "typing", user: myUser }));

    // Stop "typing" status after 2 seconds of inactivity
    typingTimeout = setTimeout(() => {
      socket.send(JSON.stringify({ type: "typing", user: myUser }));
    }, 2000);
  });

  // Update typing indicator
  function updateTypingIndicator(users) {
    const indicatorElement = document.getElementById("typingIndicator");
    if (!indicatorElement) return;

    if (users.length === 0) {
      indicatorElement.innerText = "";
      indicatorElement.style.display = "none";
      return;
    }

    const names = users.map((user) => user.name).join(", ");
    indicatorElement.innerText = `${names} is typing...`;
    indicatorElement.style.display = "block"; // Make sure it is visible
  }
});
