import { createContext, useEffect, useState } from "react";

export const Todocontext = createContext({
  addtodo: (todo) => {},
  updatetodo: (id, todo) => {},
  Removetodo: (id) => {},
  clearAll: () => {},
  Completed: (id) => {},
  Lightmode: () => {},
  darkmode: () => {},
});

const Todocontextprovider = ({ children }) => {
  const [mode, setmode] = useState("dark");
  const [todos, settodos] = useState(() => {
    const savetodos = JSON.parse(localStorage.getItem("tododata"));
    return savetodos || [];
  });

  const darkmode = () => {
    setmode("dark");
  };
  const Lightmode = () => {
    setmode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("tododata", JSON.stringify(todos));
  }, [todos]);

  const addtodo = (todo) => {
  
    settodos((prev) => {
      return [...prev, { id: Date.now(), ...todo }];
    });
  };
  const updatetodo = (id, todo) => {
    settodos((prev) => {
      return prev.map((prevtodo) => {
        prevtodo.id === id ? { ...prevtodo, ...todo } : prevtodo;
      });
    });
  };
  const Removetodo = (id) => {
    settodos((prev) => {
      return prev.filter((prevtodo) => {
        return prevtodo.id !== id;
      });
    });
  };
  const Completed = (id) => {
    settodos((prev) => {
      return prev.map((prevtodo) => {
        return prevtodo.id === id
          ? { ...prevtodo, completed: !prevtodo.completed }
          : prevtodo;
      });
    });
  };
  const clearAll = () => {
    settodos([]);
  };
  return (
    <Todocontext.Provider
      value={{
        addtodo,
        updatetodo,
        Removetodo,
        Completed,
        clearAll,
        Lightmode,
        darkmode,
        todos,
        settodos,
        mode,
      }}
    >
      {children}
    </Todocontext.Provider>
  );
};
export default Todocontextprovider;
