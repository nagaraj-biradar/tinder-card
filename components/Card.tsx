import { useState } from "react";
import { CardProps } from "types";
import { PanInfo, motion } from "framer-motion";
import Image from "next/image";

const Card: React.FC<CardProps> = ({
  card,
  removeCard,
  active,
  handleInfo,
}) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);

  const { id, emoji, name, color, description, image } = card;
  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(card, "superlike");

      return;
    }
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(card, "like");
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(card, "nope");
    }
  };

  const classNames = `absolute h-[screen] w-[25rem] bg-white shadow-xl rounded-2xl   `;
  return (
    <>
      {active ? (
        <div className="absolute  flex flex-col justify-center items-center transition ease-out delay-700 ">
          <motion.div
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={onDragEnd}
            initial={{
              scale: 1,
            }}
            animate={{
              scale: 1.05,
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
              <Image
                src={card.image}
                width={400}
                height={100}
                className="rounded-xl "
                alt="picture"
                priority
              />
              <div className=" flex justify-between items-center p-5">
                <Title title={card.name} color={card.color} />
                <p
                  className=" bg-slate-400 p-2 ml-4 mt-3 rounded-full cursor-pointer "
                  onClick={() => handleInfo()}
                >
                  Info
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div
          className={`${classNames} transition ease-out delay-700
            `}
        >
          <Image
            src={card.image}
            width={400}
            height={100}
            className=" rounded-xl "
            alt="picture"
          />
          <Title title={card.name} color={card.color} />
        </div>
      )}
    </>
  );
};

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
