import React, { useContext } from "react";
import { TrashIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
function BudgetItem({ budget, color }) {
  const progressValue =
    (Number(budget.SpentAmount) / Number(budget.Amount)) * 100;
  const { RemoveBudget } = useContext(UserContext);
  const navigate = useNavigate();
  const View = () => {
    navigate(`viewlist/${budget.id}`);
  };

  return (
    <div className="budget" style={{ borderColor: color }}>
      <div className="progress-text" style={{ color: color }}>
        <h3>{budget.Budget}</h3>
        <div style={{ display: "flex" }}>
          <p>${budget.Amount} Budgeted</p>
          <button
            onClick={() => RemoveBudget(budget.id)}
            className="btn custom-btn"
            style={{ padding: "5px", margin: "5px", backgroundColor: color }}
          >
            <TrashIcon width={15} />
          </button>
          <button
            onClick={View}
            className="btn custom-btn"
            style={{ padding: "5px", margin: "5px", backgroundColor: color }}
          >
            <ListBulletIcon width={15} />
          </button>
        </div>
      </div>
      <progress max={100} value={progressValue}></progress>
      <div className="progress-text" style={{ color: color }}>
        <small style={{ color: color }}>${budget.SpentAmount} spent</small>
        <small style={{ color: color }}>
          ${budget.BalanceAmount} remaining
        </small>
      </div>
    </div>
  );
}

export default BudgetItem;
