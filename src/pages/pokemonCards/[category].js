import { useState, useContext, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbPlayCardStar, TbPlayCardStarFilled } from "react-icons/tb";
import { HandleCollectionContext } from "../../../collectionContext";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

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

  useEffect(() => {
    if (collection.includes(activeCard)) {
      setFillIcon(true);
    } else {
      setFillIcon(false);
    }
  }, [activeCard]);

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
            alt={`Pokemoncard - Name: ${pokemon[i].data.name}, HP: ${pokemon[i].data.hp}, Rarity: ${pokemon[i].data.rarity}`}
            className="shadow-lg w-40 shadow-gray-900 rounded-sm"
          />
        </button>
      </div>
    );
  }

  return (
    <>
      {!showCard && (
        <div className="flex flex-col min-h-screen bg-blue-400 justify-center items-center gap-5 py-20">
          <h1 className="py-20 text-5xl md:text-7xl font-bold font-pokemon tracking-widest text-blue-950">
            {pokemon[0].data.set.name}
          </h1>
          <div className="flex flex-wrap gap-5 items-center justify-center px-5 md:px-20">
            {displayCards}
          </div>
        </div>
      )}
      {showCard && (
        <div className="flex flex-col gap-5 bg-blue-400 justify-center items-center min-h-screen px-5 md:px-0 py-10">
          <img
            src={activeCard}
            className="shadow-2xl shadow-gray-950 rounded-3xl"
          />
          <div className="flex gap-5">
            <button
              className="flex rounded-full justify-center items-center"
              onClick={() => {
                setShowCard(false);
                setActiveCard("");
              }}
            >
              <FaRegArrowAltCircleLeft className="text-7xl text-white rounded-full text-center bg-blue-400" />
            </button>
            {!fillIcon && (
              <button
                className="flex border-8 bg-blue-500 rounded-full border-white px-4 justify-center items-center"
                onClick={() => {
                  setFillIcon(!fillIcon);
                  const copy = [...collection, activeCard];
                  setCollection(copy);
                  console.log({ pokemon });
                }}
              >
                <>
                  <TbPlayCardStar className="text-4xl text-yellow-400  " />
                  <p className="text-2xl font-bold text-white">ADD</p>
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
                  <TbPlayCardStarFilled className="text-4xl text-yellow-400 " />
                  <p className="text-2xl font-bold text-white">REMOVE</p>
                </>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
