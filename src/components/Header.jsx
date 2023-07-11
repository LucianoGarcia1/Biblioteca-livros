import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../services/Context";
import Api from "../services/api";
import { NavLink, useLocation } from "react-router-dom";
import { key } from "../services/auth";

export const Header = () => {
  const [input, setInput] = useState("");
  const { setDados, setError } = useContext(MyContext);
  const location = useLocation();
  const getBooks = async (input) => {
    try {
      const response = await Api.get(`volumes?q=intitle:${input}&key=${key}`);
      const jsonData = response.data;
      setDados(jsonData);
    } catch (erro) {
      console.log(erro);
      setError(erro);
    }
  };

  useEffect(() => {
    getBooks(input);
  }, [input]);
  return (
    <header className="header">
      <div className="logo">
        <h1>Biblioteca de Livros</h1>
      </div>

      <nav className="nav">
        <ul className="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/biblioteca">Biblioteca</NavLink>
        </ul>
      </nav>

      {location.pathname === "/" && (
        <form className="form">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Procure Livros"
            value={input}
            onChange={({ target }) => setInput(target.value)}
          />
        </form>
      )}
    </header>
  );
};
