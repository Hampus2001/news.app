export async function getServerSideProps(context) {
  const id = context.params.id;

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + id
  );
  const data = await response.json();

  return {
    props: {
      user: data,
    },
  };
}

export default function SSRuser({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
}
