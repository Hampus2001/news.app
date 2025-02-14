import { SiPokemon } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-blue-500 text-white  border-t-4 border-blue-600 text-center">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center px-5">
          <SiPokemon className="text-9xl" />
        </div>
      </div>
      <div className="mb-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Pokémon Cards Collection. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
