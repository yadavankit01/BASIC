import React, { useContext } from "react";
import { Todocontext } from "./Context/Todocontext";
import Todoform from "./Component/todoform";
import Todoitems from "./Component/todoitems";
import Theambtn from "./Component/Theambtn";
function App() {
  const { todos } = useContext(Todocontext);
  return (
    <>
      {/* <button className="w-8 h-8 leading-8 text-xl rounded-full m-1 text-sky-600">
        <ion-icon name="sunny"></ion-icon>
      </button> */}

      <div
        className="  min-h-screen py-8  dark:bg-gray-800 ,
      dark:text-white"
      >
        <Theambtn />
        {/* bg-[#172842]  */}
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 dark:text-white text-gray-800">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2 ">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <Todoform />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {!todos.length ? (
              <div>No Task to do...</div>
            ) : (
              <div className="w-full">
                {todos.map((item) => {
                  return (
                    <div key={item.id} className="w-full">
                      {/* <TodoItem TodoData={item} /> */}
                      <Todoitems tododata={item} />
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="mt-5 rounded-lg ml-0.5 px-3 py-1 bg-green-600 text-white shrink-0"
                >
                  Clear-All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
