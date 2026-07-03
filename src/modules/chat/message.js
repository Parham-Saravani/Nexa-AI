const model = localStorage.getItem("model");

class Message {
  constructor(msg, role) {
    this.id = Math.floor(Math.random() * 10000000);
    this.content = msg;
    this.role = role;
    this.createdAt = new Date();
    this.model = model;
  }
}

export default Message;
