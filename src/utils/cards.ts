import { Deck } from "../types/cardType";

export const pick = (arr: Deck, size: number) => {
  const res = [] as Deck;

  while (res.length < size) {
    const rand = Math.floor(Math.random() * arr.length);

    if (!res.includes(arr[rand])) {
      res.push(arr[rand]);
    }
  }

  return {
    arr: arr.reduce<Deck>((acc, next) => {
      return res.includes(next) ? acc : [...acc, next];
    }, []),
    sub: res,
  };
};
