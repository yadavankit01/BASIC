import React from "react";
import Talbeitems from "./Talbeitems";

function Table({ budget, color }) {
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
    background: `linear-gradient(45deg, ${color}, ${color}cc)`,
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
  };

  return (
    <div className="Table-wrapper" style={tableWrapperStyle}>
      <h4 style={{ color: color, textAlign: "center", marginTop: "8px" }}>
        {budget.Budget}
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
            {(budget.Expense || []).map((item) => (
              <Talbeitems
                ID={budget.id}
                key={item.id}
                item={item}
                color={color}
                tdStyle={tdStyle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
