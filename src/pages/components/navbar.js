import { TbPlayCardStar } from "react-icons/tb";
import { MdCatchingPokemon } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center text-center bg-blue-500 p-5 border-b-4 border-blue-600">
      <a href="/">
        <MdCatchingPokemon className="text-3xl text-red-500 bg-white rounded-full" />
      </a>
      <nav className="flex gap-5 text-xl">
        <a href="">Home</a>
        <a href="" className="flex gap-2">
          <div>My Collection</div> <TbPlayCardStar />{" "}
        </a>
      </nav>
    </div>
  );
}
