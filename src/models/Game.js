import User from "@/models/User";

export default class Game {
  constructor(data) {
    this.model = data.model;
    this.id = data.id;
    this.score = data.score;
    this.gameTime = data.game_time || data.gameTime;
    this.isOver = data.is_over || this.isOver;
    this.user = new User(data.user);
  }
}
