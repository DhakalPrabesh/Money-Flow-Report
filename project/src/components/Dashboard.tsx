import React from 'react';
import { Transaction } from '../types';
import { DollarSign, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import BarGraph from './BarGraph';

type DashboardProps = {
  transactions: Transaction[];
};

export default function Dashboard({ transactions }: DashboardProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const getFinancialAdvice = () => {
    if (netBalance > 100000) {
      return "You're doing great! Consider investing your surplus in a high-yield savings account or index funds.";
    } else if (netBalance > 0) {
      return "You're on track! Try to increase your savings rate to build a stronger financial buffer.";
    } else {
      return "Consider reviewing your expenses and identifying areas where you can cut back to improve your financial health.";
    }
  };

  const formatYen = (amount: number) => {
    return `¥${amount.toLocaleString('ja-JP')}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                {formatYen(totalIncome)}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl shadow-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {formatYen(totalExpenses)}
              </p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-xl">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Net Balance</p>
              <p
                className={`text-2xl font-bold ${
                  netBalance >= 0 ? 'text-blue-600' : 'text-red-600'
                }`}
              >
                {formatYen(netBalance)}
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <BarGraph transactions={transactions} />

      <div className="md:col-span-3 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Financial Insights
            </h3>
            <p className="text-purple-800">{getFinancialAdvice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}