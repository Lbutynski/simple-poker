import { Deck, HandType, Result } from "../types/cardType";

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
export const detectHand = (hand: Deck) => {
  const cardMap = hand.reduce<Record<string, number>>((acc, next) => {
    if (!acc[next.value]) {
      return { ...acc, [next.value]: 1 };
    }
    return { ...acc, [next.value]: acc[next.value] + 1 };
  }, {});
  const result = [];
  for (const [value, occurence] of Object.entries(cardMap)) {
    if (occurence === 4) result.push([{ handType: HandType.FOUR, value }]);
    if (occurence === 3) result.push([{ handType: HandType.THREE, value }]);
    if (occurence === 2) result.push([{ handType: HandType.PAIR, value }]);
    if (occurence === 1) result.push([{ handType: HandType.HIGHCARD, value }]);
  }
  return result.flat();
};
export const calculateScore = (result: Result) => {
  const scoreByValue = {
    "7": 1,
    "8": 2,
    "9": 3,
    "10": 4,
    jack: 5,
    queen: 6,
    king: 7,
    ace: 8,
  };
  let score = 0;
  const hasTwoPair = result.filter((hand) => hand.handType).length === 2;
  result.forEach(({ handType, value }) => {
    if (!(value in scoreByValue)) return;
    else if (handType === HandType.FOUR)
      score += 100000 * scoreByValue[value as keyof typeof scoreByValue];
    else if (handType === HandType.THREE)
      score += 10000 * scoreByValue[value as keyof typeof scoreByValue];
    else if (handType === HandType.PAIR && hasTwoPair)
      score += 100 * scoreByValue[value as keyof typeof scoreByValue];
    else if (handType === HandType.PAIR)
      score += 10 * scoreByValue[value as keyof typeof scoreByValue];
    else score += 1 * scoreByValue[value as keyof typeof scoreByValue];
  });
  return score;
};
export const detectWin = (playerHand: Deck, opponentHand: Deck) => {
  const isWin =
    calculateScore(detectHand(playerHand)) >
    calculateScore(detectHand(opponentHand));
  const winningHand = isWin ? detectHand(playerHand) : detectHand(opponentHand);
  return { isWin, winningHand };
};
