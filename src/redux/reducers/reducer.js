import { achatsInitial } from "../data";

const initialState = {
  achats: achatsInitial
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "AJOUTER_ACHAT":
      return {
        ...state,
        achats: [...state.achats, action.payload]
      };

    case "SUPPRIMER_ACHAT":
      return {
        ...state,
        achats: state.achats.filter(
          achat =>
            !(
              achat.numero === action.payload.numero &&
              achat.codeProduit === action.payload.codeProduit
            )
        )
      };

    default:
      return state;
  }
}
