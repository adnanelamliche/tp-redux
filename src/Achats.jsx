import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supprimerAchat } from "./redux/actions";

export default function Achats({ clients, produits, ajouterAchat }) {
  const achats = useSelector(state => state.achats);
  const dispatch = useDispatch();

  const [achat, setAchat] = useState({
    numero: "",
    codeProduit: "",
    qte: ""
  });

  const [filtre, setFiltre] = useState("");

  function handleChange(e) {
    setAchat({
      ...achat,
      [e.target.name]: e.target.value
    });
  }

  function ajouter(e) {
    e.preventDefault();

    if (
      !clients.some(c => c.numero === achat.numero) ||
      !produits.some(p => p.codeProduit === achat.codeProduit) ||
      Number(achat.qte) <= 0
    ) {
      alert("Vérifiez les champs");
      return;
    }

    ajouterAchat({
      ...achat,
      qte: Number(achat.qte)
    });

    setAchat({ numero: "", codeProduit: "", qte: "" });
  }

  const achatsFiltres = achats.filter(
    a => filtre === "" || a.numero === filtre
  );

  return (
    <div>
      <h2>Gestion des achats</h2>

      <form onSubmit={ajouter}>
        <select
          name="numero"
          value={achat.numero}
          onChange={handleChange}
          required
        >
          <option value="">Choisir un client</option>
          {clients.map(item => (
            <option key={item.numero} value={item.numero}>
              {item.numero} - {item.nom}
            </option>
          ))}
        </select>

        <select
          name="codeProduit"
          value={achat.codeProduit}
          onChange={handleChange}
          required
        >
          <option value="">Choisir un produit</option>
          {produits.map(item => (
            <option key={item.codeProduit} value={p.codeProduit}>
              {item.intitule} - {item.prix} DH
            </option>
          ))}
        </select>

        <input
          type="number"
          name="qte"
          placeholder="Quantité"
          min="1"
          value={achat.qte}
          onChange={handleChange}
          required
        />

        <button type="submit">Ajouter</button>
      </form>

      <hr />

      <input
        type="text"
        placeholder="Numéro du client pour filtrer"
        value={filtre}
        onChange={e => setFiltre(e.target.value)}
      />

      <button type="button" onClick={() => setFiltre("")}>
        Afficher tous
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Client</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {achatsFiltres.map((a, index) => {
            const produit = produits.find(
              p => p.codeProduit === a.codeProduit
            );

            return (
              <tr key={`${a.numero}-${a.codeProduit}-${index}`}>
                <td>{a.numero}</td>
                <td>{produit?.intitule ?? "Produit inconnu"}</td>
                <td>{a.qte}</td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        supprimerAchat(a.numero, a.codeProduit)
                      )
                    }
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
