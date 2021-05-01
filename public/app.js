// DOM queries
const chatList = document.querySelector(".chat-list");
const newChat = document.querySelector(".form");
const chatInput = document.querySelector(".input");
const rooms = document.querySelector(".chatrooms");
const roomList = document.querySelectorAll(".room");
const roomTitle = document.querySelector(".room-title");
const userProfile = document.querySelector(".user");
const signOutButton = document.querySelector(".signout-button");

// Set window height 100%
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// Mobile Nav Toggle
const header = document.querySelector(".header");
const navIcons = document.querySelector(".nav-icons");
const mainBot = document.querySelector(".main-bot");
const menuIcon = document.querySelector(".menu-icon");
const clearIcon = document.querySelector(".clear-icon");

navIcons.addEventListener("click", () => {
  header.classList.toggle("toggle");
  menuIcon.classList.toggle("hide");
  clearIcon.classList.toggle("show");
});

mainBot.addEventListener("click", () => {
  if (header.classList.contains("toggle")) {
    header.classList.remove("toggle");
    menuIcon.classList.remove("hide");
    clearIcon.classList.remove("show");
  }
});

// Check sign in status, if yes, render to DOM
auth.onAuthStateChanged((user) => {
  if (user) {
    // Class instances
    const chatUI = new ChatUI(chatList, user.displayName);
    const chatroom = new Chatroom("General", "Anonymous", "img/user.png");

    // Get chats and render
    chatroom.getChats((data) => chatUI.render(data));

    // Add new chat
    newChat.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value;
      if (message && message.trim() != "") {
        chatroom
          .addChat(message)
          .then(() => {
            // Empty chat input
            newChat.reset();
            // Close emoticon window
            closeEmoticons();
            // Scroll to bottom of chat list
            chatList.scrollTop = chatList.scrollHeight;
          })
          .catch((err) => console.log(err));
      }
    });

    // Update chatroom
    rooms.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        // First clear the chats
        chatUI.clear();
        // Update the name of the selected room
        chatroom.updateRoom(e.target.getAttribute("id"));
        roomTitle.textContent = e.target.getAttribute("id");
        // Highlight selected room
        Array.from(roomList).forEach((room) => {
          room.classList.remove("active");
          e.target.classList.add("active");
        });
        // Call getChats method again to refresh chats
        chatroom.getChats((chats) => {
          chatUI.render(chats);
          chatList.scrollTop = chatList.scrollHeight;
        });
      }
    });

    // Update user profile
    chatroom.updateUser(user.displayName, user.photoURL);

    const showUserProfile = () => {
      userProfile.innerHTML += `
        <img
          class="user-avatar"
          src="${user.photoURL}"
          alt="user_photo"
        />
        <h3 class="username">${user.displayName}</h3>
      `;
    };
    showUserProfile();
  } else {
    // Redirect to sign in page if no user is signed in
    window.location.replace("index.html");
  }
});

// Sign out user
const signOutUser = () => {
  auth
    .signOut()
    .then()
    .catch((err) => console.log(err));
};

signOutButton.addEventListener("click", signOutUser);
