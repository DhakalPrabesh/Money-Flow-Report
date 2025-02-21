import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Transaction } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarGraphProps = {
  transactions: Transaction[];
};

export default function BarGraph({ transactions }: BarGraphProps) {
  // Group transactions by date and type
  const groupedData = transactions.reduce((acc, transaction) => {
    const date = transaction.date.slice(8, 10); // Get day of month
    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }
    if (transaction.type === 'income') {
      acc[date].income += transaction.amount;
    } else {
      acc[date].expense += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const sortedDates = Object.keys(groupedData).sort((a, b) => Number(a) - Number(b));

  const data = {
    labels: sortedDates.map(date => `Day ${date}`),
    datasets: [
      {
        label: 'Income',
        data: sortedDates.map(date => groupedData[date].income),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: sortedDates.map(date => groupedData[date].expense),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Income vs Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `¥${value.toLocaleString('ja-JP')}`,
        },
      },
    },
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
      <Bar data={data} options={options} />
    </div>
  );
}