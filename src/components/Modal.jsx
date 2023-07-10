import React, { useContext, useState } from "react";
import { Button } from "./Button";
import { MyContext } from "../services/Context";
import { useNavigate } from "react-router-dom";

export const Modal = ({ bookData, addBookToLibrary }) => {
  const { setModal, setError } = useContext(MyContext);
  const [input, setInput] = useState("");
  const [completedBook, setCompletedBook] = useState(0);

  const navigate = useNavigate();

  const addBook = (e) => {
    e.preventDefault();
    const { pageCount } = bookData;

    const inputNumber = Number(input);

    if (
      input === "" ||
      isNaN(inputNumber) ||
      inputNumber <= 0 ||
      inputNumber > pageCount
    ) {
      setError(
        `Preencha com um número válido maior que 0 e menor ou igual a ${pageCount}`
      );
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      const completion = Math.ceil(pageCount / inputNumber);
      setCompletedBook(completion);

      addBookToLibrary({
        ...bookData,
        completedBook: completion,
        inputNumber,
      });

      navigate("/biblioteca");
      setModal(false);
    }
  };

  const closeModal = () => {
    setModal(false);
    setError(false);
  };

  return (
    <div className="modal fadeUp">
      <div>
        <h2>
          Antes de adicionar à sua biblioteca, por favor informe a quantidade de
          páginas que você costuma ler diariamente deste livro.
        </h2>
        <form>
          <input
            type="number"
            min={1}
            placeholder="Páginas diárias"
            required
            value={input}
            onChange={({ target }) => {
              setInput(target.value);
            }}
          />

          <Button type="button" children="Finalizar" click={addBook} />
          <Button type="button" children="Cancelar" click={closeModal} />
        </form>
      </div>
    </div>
  );
};
