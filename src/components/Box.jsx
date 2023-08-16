import { useContext } from "react";
import { Button } from "./Button";
import { useLocation } from "react-router-dom";
import { MyContext } from "../services/Context";

export const Box = ({
  categories,
  thumb,
  title,
  authors,
  description,
  index,
  pageCount,
  openModal,
  publishedDate,
  handleRemoveBook,
  completedBook,
  inputNumber,
  id,
}) => {
  const { setModal } = useContext(MyContext);
  const location = useLocation();
  const activeModal = () => {
    setModal(true);
    openModal({
      categories,
      thumb,
      title,
      authors,
      description,
      index,
      pageCount,
      publishedDate,
      inputNumber,
      id,
    });
  };
  return (
    <div className="box">
      <span>{categories}</span>
      <img src={thumb} alt="" />
      <h3>{title}</h3>
      <Button
        type="button"
        click={
          location.pathname === "/"
            ? activeModal
            : () => handleRemoveBook(index)
        }
      >
        {location.pathname === "/" ? "Adicionar" : "Excluir"}
      </Button>

      {completedBook && (
        <p>
          Estimativa de término: {completedBook} dias para ler {pageCount}{" "}
          Páginas, lendo {inputNumber} páginas por dia!
        </p>
      )}
    </div>
  );
};
