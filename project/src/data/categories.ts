import { Category } from '../types';

export const categories: Category[] = [
  { id: 'salary', name: 'Salary', type: 'income' },
  { id: 'investment', name: 'Investment', type: 'income' },
  { id: 'freelance', name: 'Freelance', type: 'income' },
  { id: 'other-income', name: 'Other Income', type: 'income' },
  { id: 'rent', name: 'Rent', type: 'expense' },
  { id: 'groceries', name: 'Groceries', type: 'expense' },
  { id: 'bills', name: 'Bills', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', type: 'expense' },
  { id: 'transport', name: 'Transport', type: 'expense' },
  { id: 'other-expense', name: 'Other Expense', type: 'expense' },
];