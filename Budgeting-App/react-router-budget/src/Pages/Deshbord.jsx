import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Context";
import Intro from "./Intro";
import AddBugetForm from "./AddBugetForm";
import AddExpensForm from "./AddExpensForm";
import BudgetItem from "./BudgetItem";
import Table from "./Table";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
function Deshbord() {
  const { userName, userData, getRandomColor } = useContext(UserContext);
  const [itemColors, setItemColors] = useState({});

  // Assign colors to each budget item only once
  useEffect(() => {
    if (userData) {
      // Ensure userData has a value
      const newColors = {};

      userData.forEach((budget) => {
        if (!itemColors[budget.id]) {
          newColors[budget.id] = getRandomColor();
        }
      });

      setItemColors((prevColors) => ({ ...prevColors, ...newColors }));
    }
  }, [userData, getRandomColor]);
  const nevigate = useNavigate();
  const Directto = () => {
    nevigate("AllExpense");
  };
  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back , <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {userData && userData.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBugetForm />
                  <AddExpensForm />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {userData.map((budget) => {
                    const color = itemColors[budget.id];
                    return (
                      <BudgetItem
                        key={budget.id}
                        budget={budget}
                        color={color}
                      />
                    );
                  })}
                </div>
                <div className="budgets">
                  {userData.map((budget) => {
                    if (budget.Expense && budget.Expense.length > 0) {
                      const color = itemColors[budget.id];
                      return (
                        <Table key={budget.id} budget={budget} color={color} />
                      );
                    }
                    return null;
                  })}
                </div>

                {userData.Expense?.length > 0 ||
                  (userData.some((user) => user.Expense?.length >= 2) && (
                    <button
                      type="submit"
                      className="btn btn--dark"
                      onClick={Directto}
                    >
                      <span>View All Expense</span>
                      <ListBulletIcon width={15} />
                    </button>
                  ))}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal Budgeting is the secret to financial freedom.</p>
                <p>Create a Budget to get started!</p>
                <AddBugetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
}

export default Deshbord;
