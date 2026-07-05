import setModel from "../models/model.js";

class Message {
  constructor(msg, role) {
    this.id = Math.floor(Math.random() * 1000000);
    this.content = msg;
    this.role = role;
    this.createdAt = new Date();
    this.model = setModel();
  }
}

export default Message;
