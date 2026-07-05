class Chat {
  constructor(title) {
    this.id = Math.floor(Math.random() * 10000000);
    this.title = title;
    this.createAt = new Date();
    this.messages = [];
  }
  addNewMessages(obj) {
    this.messages.push(obj);
  }
}

export default Chat;
