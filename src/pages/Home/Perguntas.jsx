import { useEffect, useState } from "react";
import { useFavoritos } from "../../context/FavoritosContext";

function Perguntas() {
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const { adicionarFavorito, removerFavorito, estaNosFavoritos } = useFavoritos();

  useEffect(() => {
    // Tenta pegar token do localStorage
    const tokenSalvo = localStorage.getItem("opentdb_token");
    if (tokenSalvo) {
      setToken(tokenSalvo);
      return;
    }

    // Se não tiver token salvo, pede um novo e salva
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.response_code === 0) {
          localStorage.setItem("opentdb_token", data.token);
          setToken(data.token);
        } else {
          throw new Error("Erro ao obter token da API");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar token:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.response_code === 0) {
          setPerguntas(data.results);
        } else if (data.response_code === 3) {
          localStorage.removeItem("opentdb_token");
          throw new Error("Token esgotado");
        } else if (data.response_code === 4) {
          localStorage.removeItem("opentdb_token");
          throw new Error("Token inválido ou expirado");
        } else {
          throw new Error("Erro ao obter perguntas");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar perguntas:", error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <p>Carregando perguntas...</p>;
  }

  if (!perguntas.length) {
    return <p>Não foi possível carregar as perguntas.</p>;
  }

  return (
    <div className="grid gap-4">
      {perguntas.map((pergunta, index) => {
        const favoritado = estaNosFavoritos(pergunta);
        return (
          <div key={index} className="bg-white p-4 shadow rounded">
            <h2
              className="font-bold text-lg"
              dangerouslySetInnerHTML={{ __html: pergunta.question }}
            />
            <p className="text-sm text-gray-600">Categoria: {pergunta.category}</p>
            <p className="text-sm text-gray-600">Dificuldade: {pergunta.difficulty}</p>
            <button
              className="mt-2 px-4 py-1 bg-blue-500 text-black rounded hover:bg-blue-600"
              onClick={() =>
                favoritado ? removerFavorito(pergunta) : adicionarFavorito(pergunta)
              }
            >
              {favoritado ? "Remover dos Favoritos" : "Favoritar"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Perguntas;
