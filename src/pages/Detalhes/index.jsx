import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detalhes() {
  const { name } = useParams();
  const [pergunta, setPergunta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta da API");
        return res.json();
      })
      .then((data) => {
        // Procurar pergunta que contenha o parâmetro 'name' no texto (decoded)
        const decodeHtml = (html) =>
          new DOMParser().parseFromString(html, "text/html").body.textContent;

        const encontrada = data.results.find(
          (p) => decodeHtml(p.question).toLowerCase() === decodeHtml(name).toLowerCase()
        );

        if (encontrada) {
          setPergunta(encontrada);
        } else {
          setError("Pergunta não encontrada.");
        }
      })
      .catch(() => setError("Erro ao carregar dados da API."))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <p className="p-4">Carregando detalhes...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!pergunta) return null;

  // Função para decodificar HTML entities do texto da pergunta/respostas
  const decodeHtml = (html) =>
    new DOMParser().parseFromString(html, "text/html").body.textContent;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 underline">
        ← Voltar
      </Link>
      <h1 className="text-2xl font-bold mt-4">{decodeHtml(pergunta.question)}</h1>
      <p>
        <strong>Categoria:</strong> {pergunta.category}
      </p>
      <p>
        <strong>Dificuldade:</strong> {pergunta.difficulty}
      </p>
      <p>
        <strong>Resposta correta:</strong> {decodeHtml(pergunta.correct_answer)}
      </p>
      <p>
        <strong>Respostas incorretas:</strong>{" "}
        {pergunta.incorrect_answers.map((a, i) => (
          <span key={i}>{decodeHtml(a)}{i < pergunta.incorrect_answers.length - 1 ? ", " : ""}</span>
        ))}
      </p>
    </div>
  );
}
