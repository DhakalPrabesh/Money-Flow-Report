import React from 'react';
import { Wallet, ArrowRight, PieChart, TrendingUp, Shield } from 'lucide-react';

type LandingPageProps = {
  onEnter: () => void;
};

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30 mb-8">
            <Wallet className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Smart Financial Management
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your income and expenses with our intuitive dashboard. Make informed decisions about your financial future.
          </p>

          <button
            onClick={onEnter}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Enter Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="p-3 bg-green-500/10 rounded-xl w-fit mb-4">
                <PieChart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Analytics</h3>
              <p className="text-gray-600">Track your financial flow with intuitive charts and graphs</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Insights</h3>
              <p className="text-gray-600">Get personalized financial advice based on your spending patterns</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-gray-600">Your financial data is safely stored in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}