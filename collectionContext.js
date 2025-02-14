import { createContext, useState, useEffect } from "react";

export const HandleCollectionContext = createContext([]);

export default function CollectionContext({ children }) {
  const [collection, setCollection] = useState([]);

  // read from localstorage:
  useEffect(() => {
    const savedCollection =
      JSON.parse(localStorage.getItem("collection")) || [];
    setCollection(savedCollection);
  }, []);

  //Update localStorage
  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  return (
    <HandleCollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </HandleCollectionContext.Provider>
  );
}
