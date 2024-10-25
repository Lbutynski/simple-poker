import clsx from "clsx";
import { Card } from "../types/cardType";
import ReactCardFlip from "react-card-flip";

const CardComponent = ({
  card,
  className,
  isFlipped,
}: {
  card: Card;
  className?: string;
  isFlipped: boolean;
}) => {
  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <img
        src="src/images/Card-back.svg"
        className={clsx("h-[150px] w-[100px]", className)}
      />
      <img
        src={`src/images/${card.suit}-${card.value}.svg`}
        className={clsx("h-[150px] w-[100px]", className)}
      />
    </ReactCardFlip>
  );
};
export default CardComponent;
