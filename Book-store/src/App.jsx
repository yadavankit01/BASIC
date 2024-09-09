import { useContext, useState } from "react";
import "./App.css";
import { BookContext } from "./context/Bookcontext";
import Bookview from "./Components/Bookview";
function App() {
  const initialstate = {
    title: {
      value: "",
    },
    Author: {
      value: "",
    },
    ISBN: {
      value: "",
    },
  };
  const [inputs, setinputs] = useState(initialstate);
  const { add, Books, clearALL } = useContext(BookContext);
  const handalchange = (identifier, entervalue) => {
    setinputs((currentinputs) => {
      return {
        // Curly Braces {}: Used when the arrow function has a block body (multiple lines or additional logic). Requires an explicit return.
        ...currentinputs,
        [identifier]: {
          value: entervalue,
        },
      };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    add({
      title: inputs.title.value,
      Author: inputs.Author.value,
      ISBN: inputs.ISBN.value,
    });
    setinputs(initialstate);
  };
  return (
    <div className="container wrapper">
      <h1>Booklist App</h1>
      <p>Add and view your books using local storage</p>

      <div className="row gap-5  justify-content-md-center">
        <div className="col-md-12 col-xl-8 col-12">
          <form action="" className="from-group" onSubmit={submit}>
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="title"
              id="Title"
              className="form-control"
              value={inputs.title.value}
              onChange={(e) => handalchange("title", e.target.value)}
              required
            />
            <br />
            <label htmlFor="Author">Author</label>
            <input
              type="text"
              id="Author"
              name="Author"
              className="form-control"
              value={inputs.Author.value}
              onChange={(e) => handalchange("Author", e.target.value)}
              required
            />
            <br />
            <label htmlFor="ISBN">ISBN</label>
            <input
              type="text"
              id="ISBN"
              value={inputs.ISBN.value}
              name="ISBN"
              className="form-control"
              onChange={(e) => handalchange("ISBN", e.target.value)}
              required
            />
            <br />
            <button
              style={{ padding: "5px" }}
              type="submit"
              className="btn btn-primary w-100"
            >
              Add
            </button>
          </form>
        </div>

        <div className="col-md-12 col-xl-8 col-12">
          {!Books.length ? (
            <div>
              <div>
                <h4>No Books are Added yet</h4>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>ISBN</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Books.map((item, index) => {
                      return (
                        <Bookview key={item.id} index={index} Bookdata={item} />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button
                style={{ padding: "5px" }}
                type="button"
                onClick={() => clearALL()}
                className="btn btn-primary w-100 button"
              >
                Clear-All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
