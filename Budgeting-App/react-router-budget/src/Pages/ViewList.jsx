import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/Context";
import { TrashIcon } from "@heroicons/react/24/solid";
function ViewList() {
  const { userData, RemoveExpense } = useContext(UserContext);
  const Remove = (ID, id) => {
    RemoveExpense(ID, id);
  };

  const { id } = useParams();
  const numericId = Number(id);
  const budgetItem = userData.find((item) => item.id === numericId);
  const spent = budgetItem.spent || 0;
  const progressValue =
    (Number(budgetItem.SpentAmount) / budgetItem.Amount) * 100;
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
    <>
      {budgetItem && Object.keys(budgetItem).length > 0 ? (
        <div style={{ width: "100%" }}>
          <div
            className="Table-wrapper  Table-wrapper-2"
            style={tableWrapperStyle}
          >
            <div
              className="budget"
              style={{ margin: "10px auto", maxWidth: "99%" }}
            >
              <div className="progress-text">
                <h3>{budgetItem.Budget}</h3>
                <div style={{ display: "flex" }}>
                  <p>${budgetItem.Amount} Budgeted</p>
                </div>
              </div>
              <progress
                max={100}
                value={progressValue}
                className="custom-progress"
              ></progress>
              <div className="progress-text">
                <small>${budgetItem.SpentAmount} spent</small>
                <small>${budgetItem.BalanceAmount - spent} remaining</small>
              </div>
            </div>
          </div>
          {Array.isArray(budgetItem.Expense) &&
          budgetItem.Expense.length > 0 ? (
            <div
              className="Table-wrapper  Table-wrapper-2"
              style={tableWrapperStyle}
            >
              <h4
                style={{
                  color: "#3498db",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                All Expense of Budget {budgetItem.Budget}
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
                    {budgetItem.Expense.map((item) => {
                      return (
                        <tr>
                          <td>{item.Name}</td>
                          <td>{item.Amount}</td>
                          <td>{item.Date}</td>
                          <td>{item.Budget}</td>
                          <td
                            style={{
                              padding: "12px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={() => Remove(budgetItem.id, item.id)}
                              type="button"
                              className="btn custom-btn delete-btn"
                              style={{ padding: "5px", margin: "5px" }}
                            >
                              Delete
                              <TrashIcon width={15} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h3 className="h3">No Expense</h3>
          )}
        </div>
      ) : null}
    </>
  );
}

export default ViewList;
