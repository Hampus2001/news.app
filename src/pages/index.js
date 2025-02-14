import { useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import { SiPokemon } from "react-icons/si";

//SSR - Server side rendering

export async function getServerSideProps() {
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
        <a href={"/news/" + sets.data[i].id} onClick={() => setLoading(true)}>
          <div
            key={i}
            className="flex flex-wrap justify-center items-center h-64 bg-[url(/images/pokemonCard.png)] bg-cover bg-no-repeat  px-3 rounded-lg shadow-lg shadow-gray-900"
          >
            <img className="w-40" src={sets.data[i].images.logo} />
          </div>
        </a>
      );
    }
  }
  return (
    <>
      <div className="flex flex-col min-h-screen bg-blue-400 justify-center items-center gap-5 pb-20">
        {!loading && (
          <>
            <img src="/images/pokemonLogo.png" className="py-20" />
            <div className="flex flex-wrap gap-5 items-center justify-center px-20">
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
