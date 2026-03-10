import React, { useState } from 'react';
import { Zap, Menu, X, ArrowDownToLine, ArrowUpFromLine, Activity } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [balance, setBalance] = useState(24500);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    
    if (activeTab === 'deposit') {
      setBalance(prev => prev + val);
    } else {
      if (balance >= val) {
        setBalance(prev => prev - val);
      } else {
        alert("Insufficient funds");
        return;
      }
    }
    setAmount('');
  };

  const formatBalance = (num: number) => {
    const parts = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.');
    return { integer: parts[0], fraction: parts[1] };
  };

  const balanceParts = formatBalance(balance);

  return (
    <div className="min-h-screen bg-[#1e1e24] text-[#edf2f4] font-sans selection:bg-[#d90429] selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#1e1e24]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-full neu-box flex items-center justify-center text-[#d90429]">
              <Zap size={18} fill="currentColor" />
            </div>
            KAME<span className="text-[#d90429]">KA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-[#8d99ae]">
            <a href="#home" className="hover:text-[#edf2f4] transition-colors">Dashboard</a>
            <button className="neu-btn-red px-6 py-2 rounded-full font-semibold tracking-wide">
              Connect Wallet
            </button>
          </div>

          <button 
            className="md:hidden neu-btn p-2 rounded-xl text-[#8d99ae]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Section with Central Window */}
      <main id="home" className="flex-1 flex items-center justify-center p-6 pt-32 min-h-screen">
        {/* Central Window (Dashboard Card) */}
        <div className="neu-box p-8 md:p-12 rounded-[3rem] w-full max-w-lg mx-auto flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 right-6 text-[#d90429] opacity-50">
            <Activity size={24} />
          </div>
          
          <div className="text-[#8d99ae] font-medium mb-2 uppercase tracking-widest text-sm">Total Balance</div>
          <div className="text-5xl md:text-6xl font-extrabold text-[#edf2f4] mb-10 tracking-tight">
            ${balanceParts.integer}<span className="text-[#d90429]">.{balanceParts.fraction}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-6 w-full mb-8">
            {/* Deposit Button */}
            <button 
              onClick={() => setActiveTab('deposit')}
              className={`py-4 rounded-2xl font-bold text-lg flex flex-col items-center justify-center gap-2 transition-all ${
                activeTab === 'deposit' 
                  ? 'neu-btn-pressed text-[#d90429]' 
                  : 'neu-btn text-[#8d99ae] hover:text-[#edf2f4]'
              }`}
            >
              <ArrowDownToLine size={24} /> 
              <span>Deposit</span>
            </button>
            
            {/* Withdraw Button */}
            <button 
              onClick={() => setActiveTab('withdraw')}
              className={`py-4 rounded-2xl font-bold text-lg flex flex-col items-center justify-center gap-2 transition-all ${
                activeTab === 'withdraw' 
                  ? 'neu-btn-pressed text-[#d90429]' 
                  : 'neu-btn text-[#8d99ae] hover:text-[#edf2f4]'
              }`}
            >
              <ArrowUpFromLine size={24} /> 
              <span>Withdraw</span>
            </button>
          </div>

          {/* Action Form */}
          <form onSubmit={handleTransaction} className="w-full space-y-4">
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8d99ae] font-bold">$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full neu-input pl-12 pr-6 py-4 rounded-2xl text-[#edf2f4] placeholder-[#8d99ae]/50 text-lg font-medium"
                placeholder="Enter amount..."
                min="0"
                step="0.01"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full neu-btn-red py-4 rounded-2xl font-bold text-lg"
            >
              Confirm {activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
