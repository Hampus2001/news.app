import { useState, useContext } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbPlayCardStar, TbPlayCardStarFilled } from "react-icons/tb";
import { HandleCollectionContext } from "../../../collectionContext";

export async function getServerSideProps(context) {
  const id = context.params.category;

  const response = await fetch("https://api.pokemontcg.io/v2/sets/" + id, {
    headers: {
      "X-Api-Key": "6fa6de3b-4b1f-49c2-8cac-558e45233a7c",
    },
  });
  const sets = await response.json();

  const displayCard = [];

  for (let i = 1; i < sets.data.total; i++) {
    const responsePokemon = await fetch(
      "https://api.pokemontcg.io/v2/cards/" + id + "-" + i,
      {
        headers: {
          "X-Api-Key": "6fa6de3b-4b1f-49c2-8cac-558e45233a7c",
        },
      }
    );
    const dataCard = await responsePokemon.json();
    displayCard.push(dataCard);
  }

  return {
    props: {
      pokemon: displayCard,
    },
  };
}

export default function setPage({ pokemon }) {
  const [showCard, setShowCard] = useState(false);
  const displayCards = [];
  const [activeCard, setActiveCard] = useState();
  const [fillIcon, setFillIcon] = useState(false);
  const { collection, setCollection } = useContext(HandleCollectionContext);
  for (let i = 0; i < pokemon.length; i++) {
    displayCards.push(
      <div>
        <button
          onClick={() => {
            setShowCard(true);
            setActiveCard(pokemon[i].data.images.large);
          }}
        >
          <img
            src={pokemon[i].data.images.small}
            className="shadow-lg shadow-gray-900 rounded-sm"
          />
        </button>
      </div>
    );
  }

  return (
    <>
      {!showCard && (
        <div className="flex bg-blue-400 justify-center items-center min-h-screen p-10">
          <div className="grid grid-cols-10 gap-2">{displayCards}</div>
        </div>
      )}
      {showCard && (
        <div className="flex flex-col gap-5 bg-blue-400 justify-center items-center min-h-screen">
          <img
            src={activeCard}
            className="shadow-2xl shadow-gray-950 rounded-md"
          />
          <div className="flex gap-5">
            <button
              className="flex rounded-full justify-center items-center"
              onClick={() => {
                setShowCard(false);
                setActiveCard("");
                setFillIcon(false);
              }}
            >
              <IoMdCloseCircle className="text-7xl text-red-500 rounded-full text-center bg-white" />
            </button>
            {!fillIcon && (
              <button
                className="flex border-8 bg-blue-500 rounded-full border-white px-4 justify-center items-center"
                onClick={() => {
                  setFillIcon(!fillIcon);
                  const copy = [...collection, activeCard];
                  setCollection(copy);
                }}
              >
                <>
                  <TbPlayCardStar className="text-5xl text-yellow-400  " />
                  <p className="text-2xl font-bold text-blue-900">ADD</p>
                </>
              </button>
            )}
            {fillIcon && (
              <button
                className="flex border-8 bg-red-500 rounded-full border-white px-4 justify-center items-center"
                onClick={() => {
                  setFillIcon(!fillIcon);
                  let copy = [...collection];
                  copy = copy.filter((card) => card !== activeCard);
                  setCollection(copy);
                }}
              >
                <>
                  <TbPlayCardStarFilled className="text-5xl text-yellow-400 " />
                  <p className="text-2xl font-bold text-blue-900">REMOVE</p>
                </>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
