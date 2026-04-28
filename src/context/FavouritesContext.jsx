import { createContext, useReducer, useEffect, useContext } from "react";

const FavouritesContext = createContext();

// Reducer
function favouritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVOURITE": {
      const exists = state.some(
        (c) => c.cca3 === action.payload.cca3
      );
      if (exists) return state;
      return [...state, action.payload];
    }

    case "REMOVE_FAVOURITE":
      return state.filter((c) => c.cca3 !== action.payload);

    default:
      return state;
  }
}

export function FavouritesProvider({ children }) {
  const saved = JSON.parse(localStorage.getItem("favourites") || "[]");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    saved
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}