import { TbPlayCardStar, TbPlayCardStarFilled } from "react-icons/tb";
import { MdCatchingPokemon } from "react-icons/md";
import { useState } from "react";

export default function Navbar() {
  const [fillIcon, setFillIcon] = useState(false);

  return (
    <div className="flex h-16 w-full justify-between items-center  bg-blue-500 px-5 py-10 border-b-4 border-blue-600">
      <a href="/" className="w-1/5 hover:cursor-default">
        <MdCatchingPokemon
          className=" text-5xl cursor-pointer  text-red-500 bg-white rounded-full"
          onClick={() => setFillIcon(false)}
        />
      </a>
      <div className="flex gap-36 h-16 justify-center">
        <img src="https://media.giphy.com/media/khrU3QH64GVAvw4Lqy/giphy.gif" />
        <img src="https://media.giphy.com/media/1flb5oerzfG2xUgjmM/giphy.gif" />
        <img src="https://media.giphy.com/media/8YEgM3ih5TdJOIMxzf/giphy.gif" />
        <img src="https://media.giphy.com/media/4N7v7sz4GI7yfRMDJO/giphy.gif" />
        <img src="https://media.giphy.com/media/2kMQg3Q8HW0AWV1ShF/giphy.gif" />
        <img src="https://media.giphy.com/media/pzdGaX57pfFOP8TLfK/giphy.gif" />
        <img src="https://media.giphy.com/media/46gMxxuM631CbHHjQ0/giphy.gif" />
      </div>
      <nav className="flex gap-5 text-xl w-1/5 justify-end items-center font-extrabold text-white">
        <a
          href="/myCollection"
          className="flex gap-2 items-center"
          onClick={() => setFillIcon(true)}
        >
          <p className="tracking-wider">My Collection</p>
          {!fillIcon && <TbPlayCardStar className="text-3xl" />}
          {fillIcon && <TbPlayCardStarFilled className="text-3xl" />}
        </a>
      </nav>
    </div>
  );
}
