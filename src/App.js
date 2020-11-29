import { useState, useEffect, useRef } from "react";

import "./App.scss";
import { transactions } from "./data";

function App() {
  const isMount = useRef(true);
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [topMerchant, setTopMerchant] = useState("");


  useEffect(() => {
    if (isMount.current) isMount.current = false;
    
    const getExpenses = () => {
      console.log('getExpenses Fired!')
      const expenses = transactions
      .filter((transaction) => transaction.amount < 0)
      .map((transaction) => ({
        id: transaction.id,
        amount: Math.floor(transaction.amount),
        name: transaction.description,
      }))
      .sort(
        (firstExpense, secondExpense) =>
        firstExpense.amount - secondExpense.amount
        );
      setExpenses(expenses);
      setTopMerchant(expenses[0].name);
    };
    getExpenses();
  }, []);

  useEffect(() => {
    const getTotalSpent = () => {
      console.log('getTotalSpent Fired!')
      const totalSpent = expenses
        .filter((expense) => expense.name === topMerchant)
        .reduce((accumulator, currentValue) => ({
          amount: accumulator.amount + currentValue.amount,
        }));
      const formattedTotalSpent = Math.floor(
        totalSpent.amount * -1
      ).toLocaleString();
      setTotalSpent(formattedTotalSpent);
    };
    !isMount.current && expenses.length > 0 && getTotalSpent();
  }, [expenses, topMerchant]);
  
  console.log('Render Fired!')
  return (
    <div className="card">

      {topMerchant &&
        <>
          <p className="card-header">Your favorite merchant</p>
          <img className="card-img" alt="apple" src="apple.png" />
        </>
      }
      <p className="card-content">{`${totalSpent} kr`}</p>
      <p className="card-footer">
        {`During 2020 you have spent ${totalSpent} kr ${topMerchant && `with ${ topMerchant}`}`}
      </p>

      {expenses.length > 0 && 
      <>
        <hr className="card-divider" />
        <p className="card-header">Top ranking expenses</p>
        <hr className="card-divider" />
      </>}
      <ul className="card-list">
        {expenses.map((expense) => (
          <li className="card-list-item" key={expense.id}>
            <p className="card-list-item-text">{expense.name}</p>
            <p className="card-list-item-text">{`${expense.amount.toLocaleString()} kr`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
