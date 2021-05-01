class Chatroom {
  constructor(room, username, userphoto) {
    this.room = room;
    this.username = username;
    this.userphoto = userphoto;
    this.chats = db.collection("chats");
    this.unsub;
  }
  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      room: this.room,
      username: this.username,
      userphoto: this.userphoto,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // update chats UI
            callback(change.doc.data());
          }
        });
      });
  }
  updateUser(username, userphoto) {
    this.username = username;
    this.userphoto = userphoto;
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

// Render chat template to the DOM
// Clear chat list when user changes room

class ChatUI {
  constructor(list, username) {
    this.list = list;
    this.username = username;
  }
  render(data) {
    const pastFormatted = dateFns.format(
      data.created_at.toDate(),
      "ddd DD/MM/YY - h:mm:ss a"
    );
    const todayFormatted = dateFns.format(
      data.created_at.toDate(),
      "h:mm:ss a"
    );
    // Check if message created_at time is the same as today, if yes, display only time, if not, display date & time
    const time = dateFns.isSameDay(
      new Date(),
      new Date(data.created_at.toDate())
    )
      ? todayFormatted
      : pastFormatted;

    const checkUsername = this.username === data.username;
    const listHTML = `
      <li class="${checkUsername ? "chat justify-chat" : "chat"}">
        <img class="user-photo" src="${data.userphoto}" alt="${data.username}">
        <div class="message-container" style="${
          checkUsername
            ? "border-radius: 1.5rem 0.5rem;"
            : "border-radius: 0.5rem 1.5rem;"
        } ">
          <div class="${
            checkUsername ? "message-top justify-message-top" : "message-top"
          }">
            <h3 class="username">${data.username}</h3>
            <p class="time">${time}</p>
          </div>
          <p class="message">${data.message}
          </p>
        </div>
      </li>
    `;
    this.list.innerHTML += listHTML;
  }
  clear() {
    this.list.innerHTML = "";
  }
}
