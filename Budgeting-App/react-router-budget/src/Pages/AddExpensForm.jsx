import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Context";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

function AddExpensForm() {
  const { userData, Addexpense } = useContext(UserContext);
  // const [selectedBudget, setSelectedBudget] = useState(""); // State to store selected budget

  useEffect(() => {
    Addexpense();
  }, [userData]);
  const initialstate = {
    newExpense: {
      value: "",
    },
    newExpenseAmount: {
      value: "",
    },
    newExpenseBudget: {
      value: "",
    },
  };

  const handalchange = (identifier, entervalue) => {
    setinputs((currentinput) => {
      return {
        ...currentinput,
        [identifier]: {
          value: entervalue,
        },
      };
    });
  };
  const [inputs, setinputs] = useState(initialstate);
  const Add = (e) => {
    e.preventDefault();

    const userId =
      userData.length > 1
        ? parseInt(inputs.newExpenseBudget.value.trim(), 10)
        : userData[0].id;

    const BName = userData
      .filter((item) => {
        return item.id === userId;
      })
      .map((item) => item.Budget);
    if (!inputs.newExpense.value || !inputs.newExpenseAmount.value) return;
    Addexpense(userId, {
      Name: inputs.newExpense.value,
      id: Date.now(),
      Amount: inputs.newExpenseAmount.value,
      Budget: BName.length ? BName[0] : null,
      Date: Date.now(),
    });
    setinputs(initialstate);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {" "}
          {userData.length === 1 && `${userData.map((bugs) => bugs.Budget)}`}
        </span>{" "}
        Expense
      </h2>
      <form className="grid-sm" onSubmit={Add}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              value={inputs.newExpense.value}
              onChange={(e) => handalchange("newExpense", e.target.value)}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="100"
              inputMode="decimal"
              id="newExpenseAmount"
              name="newExpenseAmount"
              placeholder="e.g.,1000"
              value={inputs.newExpenseAmount.value}
              onChange={(e) => handalchange("newExpenseAmount", e.target.value)}
            />
          </div>

          <div className="grid-xs" hidden={userData.length === 1}>
            <label htmlFor="newExpenseBudget">Budget Category</label>
            <select
              name="newExpenseBudget"
              id="newExpenseBudget"
              required={userData.length > 1}
              value={inputs.newExpenseBudget.value}
              onChange={(e) => handalchange("newExpenseBudget", e.target.value)} // Update state when a new option is selected
            >
              <option value="" disabled>
                Select a Budget
              </option>
              {userData
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.Budget}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn--dark">
          <span>Add Expense</span>
          <PlusCircleIcon width={20} />
        </button>
      </form>
    </div>
  );
}

export default AddExpensForm;
