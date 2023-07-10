import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import "./scss/index.css";
import { Biblioteca } from "./pages/Biblioteca";
import { MyContext } from "./services/Context";
import { useContext } from "react";
const App = () => {
  const { error } = useContext(MyContext);
  return (
    <>
      <Header />
      {error && (
        <div className="error">
          <span>{error}</span>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </>
  );
};

export default App;
