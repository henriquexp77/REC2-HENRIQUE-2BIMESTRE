import { useContext } from "react";
import { FavoritosContext } from "../../context/FavoritosContext";

export default function Favoritos() {
  const { favoritos } = useContext(FavoritosContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perguntas Favoritadas</h1>

      {favoritos.length === 0 ? (
        <p className="text-gray-500">Nenhuma pergunta foi favoritada ainda.</p>
      ) : (
        <ul className="space-y-4">
          {favoritos.map((pergunta, index) => (
            <li
              key={index}
              className="border border-gray-300 p-4 rounded shadow hover:bg-gray-50"
            >
              <p className="font-semibold">{pergunta.question}</p>
              <p className="text-sm text-gray-600">{pergunta.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
