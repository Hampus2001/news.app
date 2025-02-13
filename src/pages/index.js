import { useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";

//SSR - Server side rendering

export async function getServerSideProps() {
  //hämta data här:
  const response = await fetch("https://api.pokemontcg.io/v2/sets");
  const data = await response.json();
  console.log(data);
  return {
    props: { sets: data },
  };
}

// All kod körs på servern och
// det som returneras från komponenten skickas till browsern
export default function Home({ sets }) {
  const displaySets = [];
  const [loading, setLoading] = useState(false);
  for (let i = 0; i < 9; i++) {
    if (i != 2) {
      displaySets.push(
        <div
          key={i}
          className="flex flex-wrap justify-center items-center w-full h-80 bg-blue-500 border-4 border-blue-600 px-7 rounded-md shadow-lg shadow-gray-900"
        >
          <p>
            <a
              href={"/news/" + sets.data[i].id}
              onClick={() => setLoading(true)}
            >
              <img className="w-40" src={sets.data[i].images.logo} />
            </a>
          </p>
        </div>
      );
    }
  }
  return (
    <>
      <div className="flex flex-col bg-blue-400 justify-center items-center gap-5">
        <div className="flex gap-2 w-2/5 justify-between border-b-4 border-blue-500">
          <img src="https://media.giphy.com/media/khrU3QH64GVAvw4Lqy/giphy.gif" />
          <img src="https://media.giphy.com/media/1flb5oerzfG2xUgjmM/giphy.gif" />
          <img src="https://media.giphy.com/media/8YEgM3ih5TdJOIMxzf/giphy.gif" />
          <img src="https://media.giphy.com/media/4N7v7sz4GI7yfRMDJO/giphy.gif" />
          <img src="https://media.giphy.com/media/2kMQg3Q8HW0AWV1ShF/giphy.gif" />
          <img src="https://media.giphy.com/media/pzdGaX57pfFOP8TLfK/giphy.gif" />
          <img src="https://media.giphy.com/media/46gMxxuM631CbHHjQ0/giphy.gif" />
        </div>
        {!loading && (
          <>
            <div className="grid grid-cols-4 gap-4">{displaySets}</div>
          </>
        )}
        {loading && (
          <MdCatchingPokemon className="text-9xl bg-white rounded-full text-center text-red-500 animate-spin" />
        )}
      </div>
    </>
  );
}
