import React from 'react';
import { Transaction } from '../types';
import { categories } from '../data/categories';

type PrintViewProps = {
  transactions: Transaction[];
  month: string;
};

export default function PrintView({ transactions, month }: PrintViewProps) {
  const getCategoryName = (id: string) => {
    return categories.find((cat) => cat.id === id)?.name || id;
  };

  const formatYen = (amount: number) => {
    return `¥${amount.toLocaleString('ja-JP')}`;
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  // Format the month for display (YYYY-MM to Month YYYY)
  const displayMonth = new Date(month + '-01').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="print-view p-8 max-w-4xl mx-auto bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Monthly Financial Report</h1>
        <p className="text-gray-600">{displayMonth}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600">Total Income</h3>
          <p className="text-lg font-bold text-green-600">{formatYen(totalIncome)}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600">Total Expenses</h3>
          <p className="text-lg font-bold text-red-600">{formatYen(totalExpenses)}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600">Net Balance</h3>
          <p className={`text-lg font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatYen(netBalance)}
          </p>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 mb-8">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 text-sm text-gray-900">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {getCategoryName(transaction.category)}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <span
                  className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                >
                  {formatYen(transaction.amount)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{transaction.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center text-sm text-gray-500">
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}