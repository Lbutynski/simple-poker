import { ChangeEvent, useState } from "react";
import { detectWin, pick } from "./utils/cards";
import { Card, Deck, State } from "./types/cardType";
import CardComponent from "./component/CardComponent";

function App() {
  const [state, setState] = useState<State>(State.WAITING);
  const values = ["7", "8", "9", "10", "jack", "queen", "king", "ace"];
  const suits = ["heart", "diamond", "spade", "club"];
  const standardDeck = [] as Deck;
  for (const value of values) {
    for (const suit of suits) {
      standardDeck.push({ value, suit });
    }
  }
  const [cardDeck, setCardDeck] = useState<Deck>([...standardDeck]);
  const [botHand, setBotHand] = useState<Deck>([]);
  const [userHand, setUserHand] = useState<Deck>([]);
  const [selectedCards, setSelectedCards] = useState<Set<Card>>(new Set());
  const [redrawNumber, setRedrawNumber] = useState(3);
  const init = () => {
    setState(State.INIT);
    setCardDeck([...standardDeck]);
    const { arr: restCards, sub: cardsPicked } = pick(cardDeck, 8);
    setCardDeck(restCards);
    setBotHand(cardsPicked.slice(0, 4));
    setUserHand(cardsPicked.slice(4));
    setState(State.USER);
    setRedrawNumber(3);
    setSelectedCards(new Set());
  };
  const reveal = () => {
    setState(State.RESULT);
  };
  const handleSelectionCard = (
    e: ChangeEvent<HTMLInputElement>,
    card: Card
  ) => {
    const newSelectedCards = new Set(selectedCards);

    if (e.target.checked) {
      newSelectedCards.add(card);
    } else {
      newSelectedCards.delete(card);
    }

    setSelectedCards(newSelectedCards);
  };
  const redraw = () => {
    setRedrawNumber(redrawNumber - 1);
    const { arr: restCards, sub: newCards } = pick(
      cardDeck,
      selectedCards.size
    );
    setCardDeck(restCards);

    setUserHand(
      userHand.filter((card) => !selectedCards.has(card)).concat(newCards)
    );
    setSelectedCards(new Set());
  };
  return (
    <>
      <div className="w-[100vw] flex flex-col">
        <div className="flex flex-row w-full gap-8 bg-red-500">
          {state !== State.WAITING && state !== State.INIT
            ? botHand.map((card) => (
                <CardComponent
                  card={card}
                  className=""
                  isFlipped={state === State.RESULT}
                />
              ))
            : null}
        </div>
        <div className="flex flex-row w-full gap-8 bg-green-500">
          {state !== State.WAITING && state !== State.INIT
            ? userHand.map((card) => (
                <div>
                  <CardComponent
                    card={card}
                    className=""
                    isFlipped={true}
                    key={`${card.suit}-${card.value}`}
                  />
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectionCard(e, card)}
                  />{" "}
                </div>
              ))
            : null}
        </div>
      </div>
      <div>
        {state === State.WAITING || state === State.RESULT ? (
          <button
            onClick={init}
            className="p-4 rounded-md bg-blue-800 text-white active:bg-blue-600"
          >
            {state === State.WAITING ? "Start" : "Restart"}
          </button>
        ) : null}
        {state === State.USER ? (
          <button
            onClick={reveal}
            className="p-4 rounded-md bg-blue-800 text-white active:bg-blue-600"
          >
            Reveal
          </button>
        ) : null}
        {state === State.USER && redrawNumber > 0 ? (
          <button
            onClick={redraw}
            className="p-4 rounded-md bg-blue-800 text-white active:bg-blue-600"
          >
            Redraw selected cards
          </button>
        ) : null}
        {state === State.USER ? (
          <span>{`${redrawNumber} redraw(s) left`}</span>
        ) : null}
      </div>
      <span>
        {state === State.RESULT
          ? detectWin(userHand, botHand)
            ? "You win"
            : "You lose"
          : null}
      </span>
    </>
  );
}

export default App;
