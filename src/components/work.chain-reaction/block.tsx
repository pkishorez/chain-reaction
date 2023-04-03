import clsx from "clsx";
import { Dots } from "./dot";

type Props = {
  dotWidth: string;
  onClick: () => void;
  dots: { id: number; isNew: boolean }[];
  color: string;
  className?: string;
};

export const Block = ({ dotWidth, onClick, dots, color, className }: Props) => {
  return (
    <div
      className={clsx(
        "bg-base2 text-base2",
        "flex items-center justify-center relative",
        "transition-opacity duration-300",
        className
      )}
      onClick={onClick}
    >
      <Dots color={color} dots={dots} size={dotWidth} />
    </div>
  );
};
