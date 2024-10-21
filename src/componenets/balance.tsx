import React, { useState } from 'react';

interface Transaction {
  amount: number;
  purpose: string;
  type: 'debit' | 'credit';
}

const BalanceSheet: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Store all transactions
  const [balance, setBalance] = useState<number>(0); // Store the current balance

  // Controlled component states
  const [amountInput, setAmountInput] = useState<string>(''); // For amount input
  const [purposeInput, setPurposeInput] = useState<string>(''); // For purpose input
  const [transactionType, setTransactionType] = useState<'debit' | 'credit'>('debit'); // For transaction type (debit/credit)

  // Handle submission of the transaction
  const handleAddFunds = (event: React.FormEvent) => {
    event.preventDefault();

    const amount = Number(amountInput);

    if (amount > 0 && purposeInput.trim()) {
      // Add the new transaction to the list
      const newTransaction: Transaction = {
        amount: amount,
        purpose: purposeInput,
        type: transactionType
      };

      setTransactions([...transactions, newTransaction]);

      // Update the balance based on the type of transaction
      if (transactionType === 'debit') {
        setBalance(prevBalance => prevBalance - amount); // Debit increases balance
      } else {
        setBalance(prevBalance => prevBalance + amount); // Credit decreases balance
      }

      // Clear the input fields after submission
      setAmountInput('');
      setPurposeInput('');
    } else {
      alert('Please enter a valid amount and purpose.');
    }
  };

  return (
    <div className="balance-sheet">
      <h1>Balance Sheet Ledger</h1>

      {/* Form for adding transactions */}
      <form onSubmit={handleAddFunds}>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              required
              min="1"
            />
          </label>
        </div>

        <div>
          <label>
            Purpose:
            <input
              type="text"
              value={purposeInput}
              onChange={(e) => setPurposeInput(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Transaction Type:
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as 'debit' | 'credit')}
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </label>
        </div>

        <button type="submit">Add Funds</button>
      </form>

      {/* Table to display the transactions */}
      <h2>Transaction Ledger</h2>
      <table border={1} cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Purpose</th>
            <th>Type (Debit/Credit)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={3}>No transactions yet</td>
            </tr>
          ) : (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.amount}</td>
                <td>{transaction.purpose}</td>
                <td>{transaction.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Display the final balance */}
      <h2>Balance Summary</h2>
      <p>Current Balance: {balance}</p>
    </div>
  );
};

export default BalanceSheet;
