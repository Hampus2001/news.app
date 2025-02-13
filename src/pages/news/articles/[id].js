export async function getServerSideProps(context) {
  const id = context.params.id;

  const response = await fetch("https://api.pokemontcg.io/v2/cards/" + id);
  const data = await response.json();

  return {
    props: {
      pokemon: data,
    },
  };
}

export default function SSRuser({ pokemon }) {
  return (
    <div>
      <img src={pokemon.data.images.large} />
      <p>{pokemon.data.tcgplayer.prices.holofoil.market} dollar</p>
    </div>
  );
}
