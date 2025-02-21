import React, { useState } from 'react';
import { Transaction } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import PrintView from './components/PrintView';
import { Wallet, Printer } from 'lucide-react';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  React.useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const updateTransaction = (id: string, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handlePrint = () => {
    setShowPrintView(true);
    // Use requestAnimationFrame to ensure the print view is rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
        // Wait for the print dialog to close before hiding the print view
        const checkPrintDialog = setInterval(() => {
          if (!document.hasFocus()) {
            // Print dialog is open, wait for it to close
            const onFocus = () => {
              clearInterval(checkPrintDialog);
              window.removeEventListener('focus', onFocus);
              setShowPrintView(false);
            };
            window.addEventListener('focus', onFocus);
          }
        }, 500);
        
        // Fallback: hide print view after 5 seconds if the print dialog check fails
        setTimeout(() => {
          clearInterval(checkPrintDialog);
          setShowPrintView(false);
        }, 5000);
      });
    });
  };

  const filteredTransactions = transactions.filter((t) =>
    t.date.startsWith(currentMonth)
  );

  if (showPrintView) {
    return <PrintView transactions={filteredTransactions} month={currentMonth} />;
  }

  if (!showDashboard) {
    return <LandingPage onEnter={() => setShowDashboard(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Financial Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Report
              </button>
              <button
                onClick={() => setShowDashboard(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              <TransactionForm onSubmit={addTransaction} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Month
              </label>
              <input
                type="month"
                value={currentMonth}
                onChange={(e) => setCurrentMonth(e.target.value)}
                className="block w-full rounded-lg border-gray-200 bg-white/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
            </div>

            <Dashboard transactions={filteredTransactions} />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Recent Transactions
              </h2>
              <TransactionList 
                transactions={filteredTransactions}
                onEdit={updateTransaction}
                onDelete={deleteTransaction}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;