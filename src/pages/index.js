//SSR - Server side rendering

export async function getServerSideProps() {
  //hämta data här:
  const response = await fetch("https://api.pokemontcg.io/v2/cards/xy1-1");
  const data = await response.json();

  return {
    props: { pokemon: data },
  };
}

// All kod körs på servern och
// det som returneras från komponenten skickas till browsern
export default function Home({ pokemon }) {
  return (
    <div>
      <p>
        <a href={"/news/articles/" + pokemon.data.id}>{pokemon.data.name}</a>
      </p>
    </div>
  );
}
