import React, { useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../Context/Context";
function Talbeitems({ item, ID }) {
  const { RemoveExpense, RemoveAllExpense } = useContext(UserContext);
  const Remove = () => {
    RemoveExpense(ID, item.id);
  };
  return (
    <tr style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
      <td style={{ padding: "12px", color: "#333", fontWeight: "500" }}>
        {item.Name}
      </td>
      <td style={{ padding: "12px", color: "#666" }}>${item.Amount}</td>
      <td style={{ padding: "12px", color: "#666" }}>{item.Date}</td>
      <td style={{ padding: "12px", color: "#666" }}>{item.Budget}</td>
      <td
        style={{ padding: "12px", display: "flex", justifyContent: "center" }}
      >
        <button
          type="submit"
          onClick={Remove}
          className="btn custom-btn delete-btn"
          aria-label={item.Budget}
          style={{ padding: "5px", margin: "5px" }}
        >
          Delete
          <TrashIcon width={15} />
        </button>
      </td>
    </tr>
  );
}

export default Talbeitems;
