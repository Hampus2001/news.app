//SSR - Server side rendering

export async function getServerSideProps() {
  //hämta data här:
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return {
    props: { users: data },
  };
}

// All kod körs på servern och
// det som returneras från komponenten skickas till browsern
export default function Home({ users }) {
  return (
    <div>
      {users.map((user) => (
        <p>
          <a href={"/news/articles/" + user.id}>{user.name}</a>
        </p>
      ))}
    </div>
  );
}
