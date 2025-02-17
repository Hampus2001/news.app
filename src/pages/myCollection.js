import { useContext, useState } from "react";
import { HandleCollectionContext } from "../../collectionContext";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function MyCollection() {
  const { collection, setCollection } = useContext(HandleCollectionContext);
  const [showCard, setShowCard] = useState(false);
  const [activeCard, setActiveCard] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalContent = [
    <div className="flex flex-col text-center rounded-xl justify-center gap-5 items-center mx-5 md:mx-0 px-5 md:px-20 py-5 border-8 border-white bg-blue-500">
      <h1 className="text-3xl tracking-wide text-blue-900 font-bold">
        Are you sure?
      </h1>
      <div className="flex gap-5">
        <button
          className="flex bg-red-500 px-5 md:px-20 py-2  font-bold rounded-full text-2xl text-white border-8 border-white"
          onClick={() => {
            setShowModal(false);
            setCollection([]);
          }}
        >
          YES
        </button>
        <button
          className="flex bg-blue-500 px-5 md:px-20 py-2  font-bold rounded-full text-2xl text-white border-8 border-white"
          onClick={() => {
            setShowModal(false);
          }}
        >
          NO
        </button>
      </div>
    </div>,
  ];

  return (
    <>
      {!showCard && (
        <div className="min-h-screen bg-blue-400 flex flex-col items-center ">
          {!showModal && (
            <>
              <h1 className="py-20 text-5xl md:text-7xl font-bold font-pokemon tracking-widest text-blue-950">
                My Collection
              </h1>
              <div className="flex flex-wrap gap-5 items-center justify-center px-20">
                {collection?.map((card) => {
                  return (
                    <button
                      onClick={() => {
                        setActiveCard(card);
                        setShowCard(true);
                      }}
                    >
                      <img className="w-44" src={card} />
                    </button>
                  );
                })}
                {collection.length == 0 && (
                  <h1 className="text-3xl text-blue-800 font-pokemon tracking-widest mt-52">
                    No collection added!
                  </h1>
                )}
              </div>
            </>
          )}
          {showModal && <div className="flex mt-80">{modalContent}</div>}
          {collection.length !== 0 && !showModal && (
            <button
              className="flex bg-red-500 px-20 py-2  font-bold rounded-full text-2xl text-white border-8 border-white my-20"
              onClick={() => {
                setShowModal(true);
              }}
            >
              CLEAR ALL
            </button>
          )}
        </div>
      )}
      {showCard && (
        <div className="flex flex-col gap-5 bg-blue-400 justify-center items-center min-h-screen py-10">
          <img
            src={activeCard}
            className="shadow-2xl shadow-gray-950 rounded-3xl"
          />
          <div className="flex gap-5">
            <button
              className="flex rounded-full justify-center items-center"
              onClick={() => {
                setShowCard(false);
                setActiveCard("");
              }}
            >
              <FaRegArrowAltCircleLeft className="text-7xl text-white rounded-full text-center bg-blue-400" />
            </button>
            <button
              className="flex border-8 bg-red-500 rounded-full border-white px-4 justify-center items-center"
              onClick={() => {
                let copy = [...collection];
                copy = copy.filter((card) => card !== activeCard);
                setCollection(copy);
                setShowCard(false);
              }}
            >
              <p className="text-2xl font-bold text-white">REMOVE</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
