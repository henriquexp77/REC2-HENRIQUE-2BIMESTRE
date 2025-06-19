import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Meu Projeto</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-white hover:text-blue-200">Início</Link>
        <Link to="/favoritos" className="text-white hover:text-blue-200">Favoritos</Link>
      </nav>
    </header>
  );
}
