import clsx from "clsx";
import { Card } from "../types/cardType";
import ReactCardFlip from "react-card-flip";

const CardComponent = ({
  card,
  className,
}: {
  card: Card;
  className?: string;
}) => {
  const flipped = false;

  return (
    <ReactCardFlip isFlipped={flipped}>
      <img
        src="src/images/Card-back.svg"
        className={clsx("h-[150px] w-[100px]", className)}
      />
      <img
        src="src/images/CLUB-1.svg"
        className={clsx("h-12 w-8", className)}
      />
    </ReactCardFlip>
  );
};
export default CardComponent;
