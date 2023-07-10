import React, { useContext, useState } from "react";
import { Box } from "./Box";
import { Modal } from "./Modal";
import { useLocation } from "react-router-dom";
import { MyContext } from "../services/Context";

export const Content = ({ dados, modal }) => {
  const { setError } = useContext(MyContext);

  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(null);
  const [libraryBooks, setLibraryBooks] = useState(
    JSON.parse(localStorage.getItem("libraryBooks")) || []
  );

  const openModal = (bookData) => {
    setSelectedBook(bookData);
  };

  // Adiciona o livro
  const addBookToLibrary = (bookData) => {
    const bookExists = libraryBooks.some((book) => book.id === bookData.id);

    if (bookExists) {
      setError("O livro já está adicionado na biblioteca!");
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      const updatedBookData = {
        ...bookData,
        id: bookData.id,
      };

      setLibraryBooks((prevBooks) => {
        const updatedBooks = [...prevBooks, updatedBookData];
        saveBookToLocalStorage(updatedBooks);
        return updatedBooks;
      });
    }
  };

  const saveBookToLocalStorage = (books) => {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  };

  // Deleta
  const handleRemoveBook = (index) => {
    const confirm = window.confirm("Tem certeza que deseja excluir?");
    if (confirm) {
      setLibraryBooks((prevBooks) => {
        const updatedBooks = prevBooks.filter((_, i) => i !== index);
        saveBookToLocalStorage(updatedBooks);
        return updatedBooks;
      });
    }
  };

  return (
    <div className="content">
      {modal && selectedBook && (
        <Modal bookData={selectedBook} addBookToLibrary={addBookToLibrary} />
      )}

      {dados &&
        dados.items.map((e, index) => (
          <Box
            key={index}
            categories={e.volumeInfo.categories}
            thumb={
              e.volumeInfo.imageLinks?.smallThumbnail || "Não possui Thumb"
            }
            title={e.volumeInfo.title}
            authors={e.volumeInfo.authors}
            index={index}
            openModal={openModal}
            pageCount={e.volumeInfo.pageCount}
            publishedDate={e.volumeInfo.publishedDate}
            description={e.volumeInfo.description}
            id={e.id}
          />
        ))}

      {location.pathname === "/biblioteca" &&
        libraryBooks.map((book, index) => (
          <Box
            key={index}
            categories={book.categories}
            thumb={book.thumb}
            title={book.title}
            authors={book.authors}
            index={index}
            openModal={openModal}
            pageCount={book.pageCount}
            publishedDate={book.publishedDate}
            description={book.description}
            handleRemoveBook={handleRemoveBook}
            completedBook={book.completedBook}
            inputNumber={book.inputNumber}
            id={book.id}
          />
        ))}
    </div>
  );
};
