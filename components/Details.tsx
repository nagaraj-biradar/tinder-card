import { DetailsProps } from "types";
import { motion } from "framer-motion";
import Image from "next/image";

const Info: React.FC<DetailsProps> = ({ card, active, handleInfo }) => {
  const classNames = `absolute h-[40rem] w-[25rem] bg-white shadow-xl rounded-2xl overflow-y-scroll  `;
  return (
    <>
      {active ? (
        <div className=" flex flex-col justify-center items-center w-full h-screen gradient">
          <div className="absolute  flex flex-col justify-center items-center  transition ease-in-out delay-150  ">
            <motion.div
              initial={{
                scale: 1,
              }}
              animate={{
                scale: 1.05,
              }}
              className={classNames}
              data-testid="active-card"
            >
              <div className=" w-full flex flex-col justify-center items-center">
                <Image
                  src={card.image}
                  width={350}
                  height={100}
                  className=" mt-4 rounded-xl "
                  alt="picture"
                />
                <div className=" flex justify-between items-center p-5">
                  <Title title={card.name} color={card.color} />
                  <p
                    className=" bg-slate-400 p-2 ml-4 mt-3 rounded-full cursor-pointer "
                    onClick={() => handleInfo()}
                  >
                    Back
                  </p>
                </div>
              </div>
              <Description details={card.description} />
            </motion.div>
          </div>
        </div>
      ) : (
        <div
          className={`${classNames}
            `}
        >
          <Image
            src={card.image}
            width={350}
            height={100}
            className=" mt-4 rounded-xl "
            alt="picture"
          />
          <Title title={card.name} color={card.color} />
          <Description details={card.description} />
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

export default Info;
