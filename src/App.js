import { useEffect, useState } from "react";
import { transactions } from "./data";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getTotalSpent = () => {
      const totalSpent = transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((accumulator, currentValue) => {
          return { amount: accumulator.amount + currentValue.amount };
        });
      setTotalSpent(Math.floor(totalSpent.amount * -1));
    };
    getTotalSpent();
  }, []);

  useEffect(() => {
    const getExpenses = () => {
      const expenses = transactions
        .filter((transaction) => transaction.amount < 0)
        .map((transaction) => ({
          name: transaction.description,
          amount: transaction.amount,
        }))
      setExpenses(expenses);
    };
    getExpenses();
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        maxWidth: "300px",
        borderRadius: "29px",
        flexDirection: "column",
        justifyContent: "center",
        border: "2px dashed lightgray",
      }}
    >
      <p
        style={{
          fontSize: "15px",
          textAlign: "center",
          color: "darkslategray",
          fontFamily: "sans-serif",
        }}
      >
        Your favorite merchant
      </p>
      <img
        alt="amazon"
        src="amazon.png"
        style={{
          margin: "auto",
          width: "100px",
          height: "100px",
        }}
      />
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          color: "darkslategray",
          fontFamily: "sans-serif",
        }}
      >
        {`${totalSpent} kr`}
      </p>
      <p
        style={{
          fontSize: "10px",
          textAlign: "center",
          color: "darkslategray",
          fontFamily: "sans-serif",
        }}
      >
        {`During 2020 you have spent ${totalSpent} kr with Amazon`}
      </p>
      <p
        style={{
          fontSize: "15px",
          textAlign: "center",
          color: "darkslategray",
          fontFamily: "sans-serif",
        }}
      >
        Your other expenses
      </p>
      <ul
        style={{
          margin: "unset",
          padding: "unset",
          maxHeight: "300px",
          overflowY: "scroll",
          listStyleType: "none",
        }}
      >
        {expenses.map((expense) => (
          <li>
            <hr
              style={{
                width: "80%",
                borderTop: "1px dotted lightgray",
              }}
            />
            <p
              style={{
                fontSize: "10px",
                textAlign: "center",
                color: "darkslategray",
                fontFamily: "sans-serif",
              }}
            >
              {`${expense.name} ${expense.amount} kr`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
