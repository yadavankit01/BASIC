import React, { useContext, useState } from "react";
import { Todocontext } from "../Context/Todocontext";

function Todoform() {
  const { addtodo } = useContext(Todocontext);
  const initialstate = {
    task: {
      value: "",
    },
    tododate: {
      value: "",
    },
  };
  const handalchange = (identifier, entervalue) => {
    settodostate((currentinput) => {
      return {
        ...currentinput,
        [identifier]: {
          value: entervalue,
        },
      };
    });
  };
  const [todostate, settodostate] = useState(initialstate);
  const Add = (e) => {
    e.preventDefault();
    if (!todostate.task.value || !todostate.tododate.value) return;
    addtodo({
      task: todostate.task.value,
      tododate: todostate.tododate.value,
      complete: false,
    });
    settodostate(initialstate);
  };
  return (
    <>
      <form className="flex" onSubmit={Add}>
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-1/2 mr-0.5 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          name="task"
          value={todostate.task.value}
          onChange={(e) => handalchange("task", e.target.value)}
          // Tagda@123
        />
        <input
          className="w-1/2 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          type="date"
          placeholder="Write Date to Do..."
          name="tododate"
          value={todostate.tododate.value}
          onChange={(e) => handalchange("tododate", e.target.value)}
        />
        <button
          type="submit"
          className="rounded-lg ml-0.5 px-3 py-1 bg-green-600 text-white shrink-0"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default Todoform;
