import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header"; // importa seu header

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="p-6">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
