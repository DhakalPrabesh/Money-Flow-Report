import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { categories } from '../data/categories';

type TransactionFormProps = {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction;
  onCancel?: () => void;
};

export default function TransactionForm({ onSubmit, initialData, onCancel }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initialData?.type || 'income');
  const [amount, setAmount] = useState(initialData?.amount.toString() || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      type,
      category,
      date,
      notes,
    });
    if (!initialData) {
      setAmount('');
      setCategory('');
      setNotes('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {initialData ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="space-y-5">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              type === 'income'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              type === 'expense'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Expense
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          >
            <option value="">Select a category</option>
            {categories
              .filter((cat) => cat.type === type)
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            rows={3}
            placeholder="Add any additional notes..."
          />
        </div>

        <div className="flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25"
          >
            <PlusCircle size={20} />
            {initialData ? 'Update' : 'Add'} Transaction
          </button>
        </div>
      </div>
    </form>
  );
}