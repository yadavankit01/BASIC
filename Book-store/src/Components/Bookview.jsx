import React, { useContext, useState } from "react";
import { BookContext } from "../context/Bookcontext";

function Bookview({ Bookdata, index }) {
  const [title, settitle] = useState(Bookdata.title);
  const [Author, setAuthor] = useState(Bookdata.Author);
  const [isbn, setisbn] = useState(Bookdata.ISBN);
  const [isEditable, setIsEditable] = useState(false);
  const { update, remove } = useContext(BookContext);
  const Update = () => {
    update(Bookdata.id, {
      ...Bookdata,
      title: title.value,
      Author: Author.value,
      ISBN: isbn.value,
    });
  };
  const deleteBook = () => {
    remove(Bookdata.id);
  };
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <input
            style={{
              background: "transparent",
              border: !isEditable ? "none" : "1px solid black",
              borderRadius: "5px",
              color: "white",
            }}
            type="text"
            value={isbn}
            onChange={(e) => setisbn(e.target.value)}
            readOnly={!isEditable}
          />
        </td>
        <td>
          <input
            style={{
              background: "transparent",
              border: !isEditable ? "none" : "1px solid black",
              borderRadius: "5px",
              color: "white",
            }}
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            readOnly={!isEditable}
          />
        </td>
        <td>
          <input
            style={{
              background: "transparent",
              border: !isEditable ? "none" : "1px solid black",
              borderRadius: "5px",
              color: "white",
            }}
            type="text"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
            readOnly={!isEditable}
          />
        </td>
        <td>
          <td className="d-flex">
            <button
              style={{ margin: " 0 5px" }}
              className="btn btn-primary"
              onClick={() => {
                if (isEditable) {
                  Update();
                }
                setIsEditable((prev) => !prev);
              }}
            >
              {isEditable ? "📁" : "✏️"}
            </button>
            <button
              className="btn btn-danger "
              style={{ margin: " 0 5px" }}
              onClick={deleteBook}
            >
              ❌
            </button>
          </td>
        </td>
      </tr>
    </>
  );
}

export default Bookview;
