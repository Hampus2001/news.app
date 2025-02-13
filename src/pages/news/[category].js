import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

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
          <button
            className="flex rounded-full justify-center items-center"
            onClick={() => {
              setShowCard(false);
              setActiveCard("");
            }}
          >
            <IoMdCloseCircle className="text-7xl text-red-500 rounded-full text-center bg-white" />
          </button>
        </div>
      )}
    </>
  );
}
