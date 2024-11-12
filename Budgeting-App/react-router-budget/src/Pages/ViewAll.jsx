import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../Context/Context";
import { useContext } from "react";

function ViewAll() {
  const { RemoveExpense, userData } = useContext(UserContext);
  console.log("Usse", userData);
  const Remove = (ID, id) => {
    RemoveExpense(ID, id);
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    margin: "20px 0",
    fontSize: "16px",
    textAlign: "left",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const thStyle = {
    background: `linear-gradient(45deg, #3498db, #3498dbcc)`, // Static color here
    color: "white",
    padding: "12px",
    border: "1px solid #ddd",
    fontWeight: "bold",
    textAlign: "center",
  };

  const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    transition: "background-color 0.3s",
    textAlign: "center",
  };

  const tableWrapperStyle = {
    margin: "20px 0",
    padding: "10px",
    borderRadius: "10px",
    width: "100%",
  };

  return (
    <div className="Table-wrapper  Table-wrapper-2" style={tableWrapperStyle}>
      <h4 style={{ color: "#3498db", textAlign: "center", marginTop: "8px" }}>
        All Expense
      </h4>
      <div className="table">
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Budget</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData && userData.length > 0 ? (
              userData.map((item) =>
                Array.isArray(item.Expense) && item.Expense.length > 0
                  ? item.Expense.map((item2) => {
                      return (
                        <tr
                          key={item2.id}
                          style={{
                            textAlign: "center",
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          <td
                            style={{
                              padding: "12px",
                              color: "#333",
                              fontWeight: "500",
                            }}
                          >
                            {item2.Name}
                          </td>
                          <td style={{ padding: "12px", color: "#666" }}>
                            ${item2.Amount}
                          </td>
                          <td style={{ padding: "12px", color: "#666" }}>
                            {item2.Date}
                          </td>
                          <td style={{ padding: "12px", color: "#666" }}>
                            {item2.Budget}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => Remove(item.id, item2.id)} // Pass the item id directly
                              className="btn custom-btn delete-btn"
                              aria-label={`Delete ${item2.Name}`}
                              style={{ padding: "5px", margin: "5px" }}
                            >
                              Delete
                              <TrashIcon width={15} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : null
              )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "12px" }}
                >
                  No expenses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAll;
