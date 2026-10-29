import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clients, produits } from "./data";
import { ajouterAchat as actionAjouterAchat } from "./redux/actions";
import Achats from "./Achats";
import Facture from "./Facture";

export default function App() {
  const [page, setPage] = useState("achats");
  const achats = useSelector(state => state.achats);
  const dispatch = useDispatch();

  function ajouterAchat(achat) {
    dispatch(actionAjouterAchat(achat));
  }

  useEffect(() => {
    document.title = `Achats (${achats.length})`;
  }, [achats]);

  return (
    <div>
      <h1>Gestion des achats</h1>

      <button type="button" onClick={() => setPage("achats")}>
        Achats
      </button>

      <button type="button" onClick={() => setPage("facture")}>
        Facture
      </button>

      <hr />

      {page === "achats" ? (
        <Achats
          clients={clients}
          produits={produits}
          ajouterAchat={ajouterAchat}
        />
      ) : (
        <Facture
          clients={clients}
          produits={produits}
          achats={achats}
        />
      )}
    </div>
  );
}
