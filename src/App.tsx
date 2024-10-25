import { useState } from "react";
import { pick } from "./utils/cards";
import { Deck, State } from "./types/cardType";
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
  const [cardDeck, setCardDeck] = useState<Deck>(standardDeck);
  const [botHand, setBotHand] = useState<Deck>([]);
  const [userHand, setUserHand] = useState<Deck>([]);
  const init = () => {
    setState(State.INIT);
    setCardDeck(standardDeck);
    const { arr: restCards, sub: cardsPicked } = pick(cardDeck, 8);
    setCardDeck(restCards);
    setBotHand(cardsPicked.slice(0, 4));
    setUserHand(cardsPicked.slice(4));
    setState(State.USER);
  };
  const flip = () => {
    setState(State.RESULT);
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
                <CardComponent card={card} className="" isFlipped={true} />
              ))
            : null}
        </div>
      </div>
      <div>
        <button
          onClick={init}
          className="p-4 rounded-md bg-blue-800 text-white active:bg-blue-600"
        >
          Start
        </button>
        <button
          onClick={flip}
          className="p-4 rounded-md bg-blue-800 text-white active:bg-blue-600"
        >
          Flip
        </button>
      </div>
    </>
  );
}

export default App;
