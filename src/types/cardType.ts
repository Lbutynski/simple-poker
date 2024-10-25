export interface Card {
  value: string;
  suit: string;
}
export type Deck = Array<Card>;

export enum State {
  WAITING = "waiting",
  INIT = "init",
  BOT = "bot",
  USER = "user",
  RESULT = "result",
}
