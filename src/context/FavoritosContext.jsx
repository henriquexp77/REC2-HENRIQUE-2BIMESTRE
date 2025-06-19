import { createContext, useContext, useState } from "react";

export const FavoritosContext = createContext(); // exportado aqui

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  function adicionarFavorito(pergunta) {
    setFavoritos((prev) => [...prev, pergunta]);
  }

  function removerFavorito(pergunta) {
    setFavoritos((prev) =>
      prev.filter((item) => item.question !== pergunta.question)
    );
  }

  function estaNosFavoritos(pergunta) {
    return favoritos.some((item) => item.question === pergunta.question);
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, adicionarFavorito, removerFavorito, estaNosFavoritos }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}
