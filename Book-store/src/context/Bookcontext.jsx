import React, { createContext, useEffect, useState } from "react";

// Create the context
export const BookContext = createContext({
  add: (Book) => {},
  remove: (id) => {},
  update: (id, Book) => {},
  clearALL: () => {},
  Books: [],
});

const BookContextProvider = ({ children }) => {
  const [Books, setBooks] = useState(() => {
    const Booksare = localStorage.getItem("BOOK");
    return Booksare ? JSON.parse(Booksare) : [];
  });

  useEffect(() => {
    localStorage.setItem("BOOK", JSON.stringify(Books));
  }, [Books]);

  const add = (Book) => {
    setBooks((prev) => [...prev, { ...Book, id: Date.now() }]);
  };

  const update = (id, Book) => {
    setBooks((prev) =>
      prev.map((item) => (id === item.id ? { ...item, ...Book } : item))
    );
  };

  const clearALL = () => {
    setBooks([]);
  };

  const remove = (id) => {
    setBooks((prev) => prev.filter((item) => id !== item.id));
  };

  return (
    <BookContext.Provider value={{ add, update, remove, clearALL, Books }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
