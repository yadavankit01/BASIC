import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create a context
export const UserContext = createContext({
  AddBuget: (data) => {},
  UpdateBuget: (id, data) => {},
  RemoveExpense: (id) => {},
  ClearAll: () => {},
  getRandomColor: () => {},
  Addexpense: (id, data) => {},
  RemoveBudget: (id) => {},
  RemoveAllExpense: (id) => {},
  CalcluteExpenseAmount: () => {},
});

function UserProvider({ children }) {
  const navigate = useNavigate();

  // Initialize state with value from localStorage
  const [userName, setUserName] = useState(() => {
    const data = localStorage.getItem("userName");
    return data || "";
  });

  // Retrieve any existing user data or set an empty array if none exists
  const storedData = JSON.parse(localStorage.getItem(userName)) || [];
  const [userData, setUserData] = useState(storedData);

  // Update localStorage whenever userName or userData changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
      localStorage.setItem(userName, JSON.stringify(userData));
    }
  }, [userName, userData]);

  useEffect(() => {
    CalcluteExpenseAmount();
  }, [JSON.stringify(userData.map((item) => item.Expense))]);

  // Logout function to clear the key from localStorage and reset state
  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setUserName("");
      localStorage.removeItem("userName");
      toast.success(`Loing out from account! ${userName}`);
      navigate("/");
    } else {
      navigate(-1);
      toast.error("Error in Logout");
    }
  };

  const DeleteUser = () => {
    const DeleteAccount = window.confirm("Are you sure you want to log out?");
    if (DeleteAccount) {
      setUserData([]);
      setUserName("");
      localStorage.removeItem("userName");
      localStorage.removeItem(userName);
      toast.success(`Delet your account! ${userName}`);
      navigate("/");
    } else {
      navigate(-1);
      toast.error("Error in Delete");
    }
  };
  // Login function to set the username and navigate to a different page
  const userLogin = (name) => {
    setUserName(name);
    toast.success(`Welcome ${name}`);
    navigate("/"); // Change this to your desired route
  };

  // Function to add a new budget item
  const AddBuget = (data) => {
    const isBudgetExists = userData.some(
      (budget) => budget.Budget === data.Budget
    );

    if (isBudgetExists) {
      toast.error(`A budget with this name already exists. ${data.Budget}`);
    } else {
      setUserData((prev) => {
        return [...prev, { id: Date.now(), ...data }];
      });
      toast.success(` ${data.Budget} Budget added successfully! `);
    }
  };

  const Addexpense = (id, data) => {
    setUserData((prev) =>
      prev.map((budget) => {
        if (budget.id === id) {
          if (Number(budget.BalanceAmount) >= Number(data.Amount)) {
            const updatedBudget = {
              ...budget,
              Expense: budget.Expense
                ? [...budget.Expense, { id: Date.now(), ...data }]
                : [{ id: Date.now(), ...data }],
            };

            toast.success("Expense added successfully!");

            return updatedBudget;
          } else {
            toast.error(
              `Insufficient balance to add expense. your Balance is ${budget.BalanceAmount}`
            );
            return budget;
          }
        }
        return budget;
      })
    );
  };

  const CalcluteExpenseAmount = () => {
    setUserData((prev) =>
      prev.map((items) => {
        const UpdateSpentAmount = (items.Expense ? items.Expense : []).reduce(
          (acc, exp) => acc + Number(exp.Amount),
          0
        );
        const initialAmount = Number(items.Amount);
        const updatedBalanceAmount = initialAmount - UpdateSpentAmount;
        return {
          ...items,
          SpentAmount: UpdateSpentAmount,
          BalanceAmount: updatedBalanceAmount.toString(),
        };
      })
    );
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const UpdateBuget = (id, updatedData) => {
    const newUserData = userData.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setUserData(newUserData);
  };

  // Function to remove a budget item by id
  const RemoveExpense = (ID, id) => {
    setUserData((prevUserData) =>
      prevUserData.map((user) => {
        if (user.id === ID) {
          const expenseToRemove = user.Expense.find((exp) => exp.id === id);
          const updatedUser = {
            ...user,
            Expense: user.Expense.filter((exp) => exp.id !== id),
          };

          if (expenseToRemove) {
            toast.success(
              `Removed expense: ${expenseToRemove.Name} successfully!`
            );
          }

          return updatedUser;
        }
        return user;
      })
    );
  };

  const RemoveBudget = (id) => {
    const budgetToRemove = userData.find((item) => item.id === id);
    setUserData((prev) => prev.filter((item) => item.id !== id));
    if (budgetToRemove) {
      toast.success(`Remove ${budgetToRemove.Budget} Budget successfully!`);
    }
  };

  // Function to clear all budget data
  const ClearAll = () => {
    setUserData([]);
  };

  const RemoveAllExpense = (id) => {
    const RemoveAllExpense = userData.find((item) => item.id === id);
    setUserData((prev) => {
      return prev.map((item) => {
        if (item.id === id && item.Expense) {
          const { Expense, ...rest } = item;
          return rest;
        }
        return item;
      });
    });
    if (RemoveAllExpense) {
      toast.success(
        `Remove  All Expense of ${RemoveAllExpense.Budget} Budget successfully!`
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        logout,
        userLogin,
        userData,
        AddBuget,
        UpdateBuget,
        RemoveExpense,
        ClearAll,
        DeleteUser,
        getRandomColor,
        Addexpense,
        RemoveBudget,
        RemoveAllExpense,
        CalcluteExpenseAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
