import React, { useContext, useState } from "react";
import { Todocontext } from "../Context/Todocontext";

function Todoitems({ tododata }) {
  const { updatetodo, Removetodo, Completed } = useContext(Todocontext);
  const [todomsg, settodomsg] = useState(tododata.task);
  const [tododate, settododate] = useState(tododata.tododate);
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const CompleteToggle = () => {
    Completed(tododata.id);
  };
  const edittodo = (id) => {
    updatetodo(id, { ...tododata, task: todomsg, tododate: tododate });
    setIsTodoEditable(false);
  };
  return (
    <>
      <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
          tododata.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={tododata.completed}
          onChange={CompleteToggle}
        />
        <input
          type="text"
          className={`border outline-none w-1/2 bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
          } ${tododata.completed ? "line-through" : ""}`}
          value={todomsg}
          onChange={(e) => settodomsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <input
          type="date"
          className={`border outline-none w-1/2 bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
          } ${tododata.completed ? "line-through" : ""}`}
          value={tododate}
          onChange={(e) => settododate(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (tododata.completed) return;

            if (isTodoEditable) {
              edittodo(tododata.id);
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={tododata.completed}
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={() => Removetodo(tododata.id)}
        >
          ❌
        </button>
      </div>
    </>
  );
}

export default Todoitems;
