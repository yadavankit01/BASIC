import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { UserContext } from "../Context/Context";
import { useState } from "react";

function AddBugetForm() {
  const initialState = {
    Budget: { value: "" },
    Amount: { value: "" },
  };
  const { AddBuget } = useContext(UserContext);
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (identifier, enteredValue) => {
    setInputs((currentInput) => ({
      ...currentInput,
      [identifier]: { value: enteredValue },
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputs.Budget.value || !inputs.Amount.value) return;

    AddBuget({
      Budget: inputs.Budget.value,
      Amount: inputs.Amount.value,
      SpentAmount: 0,
      BalanceAmount: inputs.Amount.value,
    });
    setInputs(initialState);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <form onSubmit={handleAdd} className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            value={inputs.Budget.value}
            onChange={(e) => handleChange("Budget", e.target.value)}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="text"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $300"
            required
            inputMode="decimal"
            value={inputs.Amount.value}
            onChange={(e) => handleChange("Amount", e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--dark">
          <span>Create budget</span>
          <CurrencyDollarIcon width={20} />
        </button>
      </form>
    </div>
  );
}

export default AddBugetForm;
