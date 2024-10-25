import clsx from "clsx";
import { Card } from "../types/cardType";

const CardComponent = ({
  card,
  className,
}: {
  card: Card;
  className?: string;
}) => {
  return (
    <div className={clsx("h-[20vh] w-[10vw] rounded-lg", className)}>
      <p>{card.suit}</p>
      <p>{card.value}</p>
    </div>
  );
};
export default CardComponent;
