import "@/styles/globals.css";
import Navbar from "./components/navbar";
import CollectionContext from "../../collectionContext";
import Footer from "./components/footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CollectionContext>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CollectionContext>
    </>
  );
}
