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
export enum HandType {
  HIGHCARD = "high card",
  PAIR = "pair",
  THREE = "three of a kind",
  FOUR = "four of a kind",
}
export type Result = Array<{ handType: HandType; value: string }>;
export enum ValueEnum {
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
}
