import { useState } from "react";

interface Props {
  location: string;
  player: string;
  isSpy: boolean;
  onClick: () => void;
}

function SpyCard(props: Props) {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (hasBeenClicked) {
        setHasBeenClicked(false);
        props.onClick();
      } else {
        setHasBeenClicked(true);
      }

      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      className={`flex flex-col justify-between py-14 px-6 w-full max-w-96 text-center border-2 transition-opacity duration-300 ease-linear cursor-pointer 
      ${isAnimating && "opacity-0"}`}
      style={{ height: "400px" }}
      onClick={handleCardClick}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      {!hasBeenClicked ? (
        <>
          <h2 className="text-2xl mt-16">{props.player}</h2>
          <h3>Click to see your role</h3>
        </>
      ) : (
        <>
          <h2 className={`text-2xl mt-16 ${props.isSpy && "text-red-400"}`}>
            {props.isSpy ? "You are a spy." : props.location}
          </h2>
          <p className="text-sm">
            {props.isSpy
              ? "Listen, ask smart questions, and guess the location without giving away your identity."
              : "The spy does not know the location. Ask questions to uncover who the Spy is among the players."}
          </p>
        </>
      )}
    </div>
  );
}

export default SpyCard;
