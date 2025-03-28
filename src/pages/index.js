import { useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import { SiPokemon } from "react-icons/si";

//SSR - Server side rendering

export async function getServerSideProps({ res }) {
  //hämta data här:
  const response = await fetch("https://api.pokemontcg.io/v2/sets");
  const data = await response.json();
  return {
    props: { sets: data },
  };
}

// All kod körs på servern och
// det som returneras från komponenten skickas till browsern
export default function Home({ sets }) {
  console.log(sets);
  const displaySets = [];
  const [loading, setLoading] = useState(false);
  for (let i = 0; i < sets.data.length; i++) {
    if (i != 2) {
      displaySets.push(
        <a
          href={"/pokemonCards/" + sets.data[i].id}
          onClick={() => setLoading(true)}
        >
          <div
            key={i}
            className="flex flex-wrap justify-center items-center h-36 md:h-64 bg-[url(/images/pokemonCard.png)] bg-cover bg-no-repeat  px-3 rounded-lg shadow-lg shadow-gray-900"
          >
            <img
              className="w-20 md:w-40"
              src={sets.data[i].images.logo}
              alt={`Set name: ${sets.data[i].images.logo}`}
            />
          </div>
        </a>
      );
    }
  }
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-900 justify-center items-center gap-5 pb-20">
        {!loading && (
          <>
            <img
              src="/images/pokemonLogo.png"
              alt="Pokemon logo"
              className="w-2/3 md:w-auto py-10 md:py-20"
            />
            <div className="flex flex-wrap gap-2 md:gap-5 items-center justify-center px-5 md:px-20">
              {displaySets}
            </div>
          </>
        )}
        {loading && (
          <MdCatchingPokemon className="text-9xl bg-white rounded-full text-center text-red-500 animate-spin" />
        )}
      </div>
    </>
  );
}
