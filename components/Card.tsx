import { useState } from "react";
import { CardProps } from "types";
import { PanInfo, motion } from "framer-motion";
import Image from "next/image";

const Card: React.FC<CardProps> = ({ card, removeCard, active }) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);

  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(card, "superlike");
      console.log("Up");
      return;
    }
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(card, "like");
      console.log("Right");
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(card, "nope");
      console.log("Left");
    }
  };
  const classNames = `absolute h-[30rem] w-[25rem] bg-white shadow-xl rounded-2xl  overflow-y-scroll `;
  return (
    <>
      {active ? (
        <div className="absolute  flex flex-col justify-center items-center  ">
          <motion.div
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={onDragEnd}
            initial={{
              scale: 1,
            }}
            animate={{
              scale: 1.05,
              // rotate: `${card.name.length % 2 === 0 ? 6 : -6}deg`,
            }}
            exit={{
              x: leaveX,
              y: leaveY,
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.2 },
            }}
            className={classNames}
            data-testid="active-card"
          >
            <div className=" w-full flex flex-col justify-center items-center">
              <Emoji label={card.name} emoji={card.emoji} />
              {/* <Image
                src={card.image}
                width={100}
                height={100}
                className=" mt-4"
                alt="picture"
              /> */}
              <Title title={card.name} color={card.color} />
            </div>
            <Description details={card.description} />
          </motion.div>
        </div>
      ) : (
        <div
          className={`${classNames}
            `}
          // className={`${classNames}
          //   ${card.name.length % 2 === 0 ? "rotate-6" : "-rotate-6"}`}
        >
          <Emoji label={card.name} emoji={card.emoji} />
          {/* <Image src={card.image} width={100} height={100} alt="picture" /> */}
          <Title title={card.name} color={card.color} />
          <Description details={card.description} />
        </div>
      )}
    </>
  );
};

/**
 * a11y friendly component for emojis
 * @reference https://devyarns.com/accessible-emojis
 */
const Emoji: React.FC<{ emoji: string; label: string }> = ({
  emoji,
  label,
}) => {
  return (
    <span role="img" aria-label={label} className="text-[100px] ">
      {emoji}
    </span>
  );
};

const Title: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => {
  return (
    <span style={{ color }} className="text-5xl font-bold ">
      {title}
    </span>
  );
};

const Description: React.FC<{ details: string }> = ({ details }) => {
  return (
    <div className=" ">
      <p className="text-md m-5 font-bold h-24  ">{details}</p>
    </div>
  );
};

export default Card;
