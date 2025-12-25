import React, { useState } from 'react';
import { 
  ArrowLeft, 
  DollarSign, 
  Percent, 
  Calendar, 
  Briefcase, 
  CreditCard, 
  TrendingUp, 
  RefreshCcw,
  ChevronRight,
  PieChart
} from 'lucide-react';
import { useTheme } from './ThemeContext';

// --- Types ---
type ToolType = 'salary' | 'emi' | 'loan' | 'gst' | 'sip' | 'age' | null;

// --- Shared UI Components ---

const InputGroup = ({ 
  label, 
  value, 
  onChange, 
  type = "number", 
  prefix,
  placeholder 
}: { 
  label: string; 
  value: string | number; 
  onChange: (val: string) => void; 
  type?: string; 
  prefix?: string;
  placeholder?: string;
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="space-y-2">
      <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium ${
            isDarkMode ? 'text-purple-400' : 'text-blue-500'
          }`}>
            {prefix}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-4 rounded-2xl outline-none transition-all font-medium ${
            isDarkMode 
              ? 'bg-white/5 border border-white/10 focus:border-purple-500/50 text-white placeholder-gray-600' 
              : 'bg-white border border-gray-200 focus:border-blue-500 text-slate-800 placeholder-gray-400 shadow-sm'
          } ${prefix ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};

const ResultCard = ({ 
  title, 
  amount, 
  subtitle 
}: { 
  title: string; 
  amount: string; 
  subtitle?: string 
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`p-6 rounded-3xl text-center relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10' 
        : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
    }`}>
      {/* Decorative Glow */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-30 ${
         isDarkMode ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.4),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_70%)]'
      }`} />
      
      <p className={`text-sm font-medium uppercase tracking-wider mb-2 relative z-10 ${
        isDarkMode ? 'text-gray-300' : 'text-blue-100'
      }`}>
        {title}
      </p>
      <h3 className={`text-4xl font-bold mb-1 relative z-10 ${
        isDarkMode ? 'text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'text-white'
      }`}>
        {amount}
      </h3>
      {subtitle && (
        <p className={`text-xs mt-2 relative z-10 ${
          isDarkMode ? 'text-gray-400' : 'text-blue-100'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

const ActionButton = ({ onClick, label, variant = 'primary' }: { onClick: () => void; label: string; variant?: 'primary' | 'secondary' }) => {
  const { isDarkMode } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all active:scale-95 shadow-lg ${
        variant === 'primary' 
          ? isDarkMode 
            ? 'bg-white text-purple-900 hover:bg-gray-100 shadow-purple-900/20' 
            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
          : isDarkMode
            ? 'bg-white/5 text-gray-300 hover:bg-white/10'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

// --- Specific Calculator Components ---

const SalaryCalculator = () => {
  const [basic, setBasic] = useState('');
  const [allowances, setAllowances] = useState('');
  const [deductions, setDeductions] = useState('');
  const [result, setResult] = useState<{net: number, yearly: number} | null>(null);

  const calculate = () => {
    const b = parseFloat(basic) || 0;
    const a = parseFloat(allowances) || 0;
    const d = parseFloat(deductions) || 0;
    const net = b + a - d;
    setResult({ net, yearly: net * 12 });
  };

  const reset = () => {
    setBasic(''); setAllowances(''); setDeductions(''); setResult(null);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 gap-4">
        <InputGroup label="Basic Pay" value={basic} onChange={setBasic} prefix="$" placeholder="5000" />
        <InputGroup label="Allowances (HRA, DA)" value={allowances} onChange={setAllowances} prefix="$" placeholder="2000" />
        <InputGroup label="Deductions (Tax, PF)" value={deductions} onChange={setDeductions} prefix="$" placeholder="500" />
      </div>

      <div className="flex gap-3">
        <div className="flex-1"><ActionButton label="Calculate" onClick={calculate} /></div>
        <div className="w-1/3"><ActionButton label="Reset" onClick={reset} variant="secondary" /></div>
      </div>

      {result && (
        <div className="space-y-4">
          <ResultCard title="Net Monthly Salary" amount={`$${result.net.toLocaleString()}`} />
          <div className="grid grid-cols-2 gap-4 text-center">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs opacity-60 uppercase">Yearly</div>
                <div className="text-lg font-bold">${result.yearly.toLocaleString()}</div>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs opacity-60 uppercase">Deductions</div>
                <div className="text-lg font-bold text-red-400">-${Number(deductions).toLocaleString()}</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EMICalculator = ({ mode = 'emi' }: { mode?: 'emi' | 'loan' }) => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState(''); // in years
  const [result, setResult] = useState<{emi: number, total: number, interest: number} | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12; // tenure in months

    if (!p || !r || !n) return;

    const emiVal = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalVal = emiVal * n;
    
    setResult({
      emi: Math.round(emiVal),
      total: Math.round(totalVal),
      interest: Math.round(totalVal - p)
    });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 gap-4">
        <InputGroup label="Loan Amount" value={amount} onChange={setAmount} prefix="$" placeholder="100000" />
        <InputGroup label="Interest Rate (%)" value={rate} onChange={setRate} placeholder="8.5" />
        <InputGroup label="Tenure (Years)" value={tenure} onChange={setTenure} placeholder="5" />
      </div>

      <ActionButton label={mode === 'emi' ? "Calculate EMI" : "Calculate Loan"} onClick={calculate} />

      {result && (
        <div className="space-y-4">
          <ResultCard 
            title={mode === 'emi' ? "Monthly EMI" : "Monthly Payment"} 
            amount={`$${result.emi.toLocaleString()}`} 
            subtitle={`Total Amount: $${result.total.toLocaleString()}`}
          />
          <div className="grid grid-cols-2 gap-4 text-center">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs opacity-60 uppercase">Principal</div>
                <div className="text-lg font-bold">${Number(amount).toLocaleString()}</div>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs opacity-60 uppercase">Total Interest</div>
                <div className="text-lg font-bold text-orange-400">${result.interest.toLocaleString()}</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GSTCalculator = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [result, setResult] = useState<{net: number, gst: number, total: number} | null>(null);
  const { isDarkMode } = useTheme();

  const calculate = (type: 'add' | 'remove') => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);
    if (!amt) return;

    if (type === 'add') {
        const gst = (amt * rate) / 100;
        setResult({ net: amt, gst: gst, total: amt + gst });
    } else {
        const net = (amt * 100) / (100 + rate);
        const gst = amt - net;
        setResult({ net: net, gst: gst, total: amt });
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <InputGroup label="Amount" value={amount} onChange={setAmount} prefix="$" placeholder="1000" />
      
      <div className="space-y-2">
        <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>GST Rate (%)</label>
        <div className="flex gap-2">
            {['5', '12', '18', '28'].map((r) => (
                <button
                    key={r}
                    onClick={() => setGstRate(r)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                        gstRate === r 
                        ? isDarkMode ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white shadow-md'
                        : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                    }`}
                >
                    {r}%
                </button>
            ))}
        </div>
      </div>

      <div className="flex gap-3">
        <ActionButton label="Add GST" onClick={() => calculate('add')} />
        <ActionButton label="Remove GST" onClick={() => calculate('remove')} variant="secondary" />
      </div>

      {result && (
        <div className="space-y-4">
           <ResultCard 
            title="Total Amount" 
            amount={`$${result.total.toLocaleString(undefined, {maximumFractionDigits: 2})}`} 
          />
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-sm opacity-70">GST Amount ({gstRate}%)</span>
                <span className="text-xl font-bold text-green-400">${result.gst.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-sm opacity-70">Net Amount</span>
                <span className="text-xl font-bold">${result.net.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
           </div>
        </div>
      )}
    </div>
  );
};

const SIPCalculator = () => {
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{invested: number, returns: number, total: number} | null>(null);

  const calculate = () => {
    const P = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    
    if (!P || !r || !n) return;

    // FV = P × [({1 + r}^n) - 1] / r × (1 + r)
    const total = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = P * n;
    
    setResult({
        invested: Math.round(invested),
        total: Math.round(total),
        returns: Math.round(total - invested)
    });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <InputGroup label="Monthly Investment" value={monthly} onChange={setMonthly} prefix="$" placeholder="500" />
      <InputGroup label="Expected Return Rate (%)" value={rate} onChange={setRate} placeholder="12" />
      <InputGroup label="Time Period (Years)" value={years} onChange={setYears} placeholder="10" />

      <ActionButton label="Calculate Future Value" onClick={calculate} />

      {result && (
        <div className="space-y-4">
           <ResultCard 
            title="Maturity Value" 
            amount={`$${result.total.toLocaleString()}`} 
          />
          <div className="grid grid-cols-2 gap-4 text-center">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs opacity-60 uppercase">Invested</div>
                <div className="text-lg font-bold">${result.invested.toLocaleString()}</div>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs opacity-60 uppercase">Wealth Gained</div>
                <div className="text-lg font-bold text-green-400">+${result.returns.toLocaleString()}</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{years: number, months: number, days: number} | null>(null);
  const { isDarkMode } = useTheme();

  const calculate = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    setResult({ years, months, days });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
       <div className="space-y-2">
            <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
                Date of Birth
            </label>
            <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className={`w-full p-4 rounded-2xl outline-none transition-all font-medium ${
                    isDarkMode 
                    ? 'bg-white/5 border border-white/10 focus:border-purple-500/50 text-white' 
                    : 'bg-white border border-gray-200 focus:border-blue-500 text-slate-800 shadow-sm'
                }`}
            />
        </div>

      <ActionButton label="Calculate Age" onClick={calculate} />

      {result && (
        <div className="p-8 rounded-3xl text-center border bg-white/5 border-white/10">
           <div className="grid grid-cols-3 gap-2 divide-x divide-white/10">
                <div>
                    <div className="text-4xl font-bold mb-1">{result.years}</div>
                    <div className="text-xs uppercase opacity-60">Years</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-1">{result.months}</div>
                    <div className="text-xs uppercase opacity-60">Months</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-1">{result.days}</div>
                    <div className="text-xs uppercase opacity-60">Days</div>
                </div>
           </div>
        </div>
      )}
    </div>
  );
};


// --- Main Tools View Controller ---

const ToolsView = () => {
  const { isDarkMode } = useTheme();
  const [selectedTool, setSelectedTool] = useState<ToolType>(null);

  const tools = [
    { id: 'salary', name: 'Salary Calculator', icon: Briefcase, color: 'text-green-500', desc: 'Calculate Net Pay' },
    { id: 'emi', name: 'EMI Calculator', icon: CreditCard, color: 'text-blue-500', desc: 'Plan your loans' },
    { id: 'loan', name: 'Loan Calculator', icon: PieChart, color: 'text-purple-500', desc: 'Amortization & Interest' },
    { id: 'gst', name: 'GST Calculator', icon: Percent, color: 'text-orange-500', desc: 'Tax Inclusive/Exclusive' },
    { id: 'sip', name: 'SIP Calculator', icon: TrendingUp, color: 'text-emerald-500', desc: 'Investment Returns' },
    { id: 'age', name: 'Age Calculator', icon: Calendar, color: 'text-pink-500', desc: 'Exact Age Counter' },
  ];

  if (selectedTool) {
    const renderTool = () => {
      switch(selectedTool) {
        case 'salary': return <SalaryCalculator />;
        case 'emi': return <EMICalculator mode="emi" />;
        case 'loan': return <EMICalculator mode="loan" />;
        case 'gst': return <GSTCalculator />;
        case 'sip': return <SIPCalculator />;
        case 'age': return <AgeCalculator />;
        default: return null;
      }
    };

    const toolInfo = tools.find(t => t.id === selectedTool);

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6">
           <button 
             onClick={() => setSelectedTool(null)}
             className={`p-2 rounded-full transition-colors ${
               isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
             }`}
           >
             <ArrowLeft size={24} />
           </button>
           <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
             {toolInfo?.name}
           </h2>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-20">
            {renderTool()}
            <div className={`mt-12 p-4 rounded-xl text-center text-xs leading-relaxed opacity-60 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
               <p>Use this tool to estimate values quickly. Actual figures may vary based on bank policies, tax laws, and market conditions.</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className={`text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode ? 'from-white to-gray-400' : 'from-slate-900 to-slate-600'
          }`}>
          Calculators
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
           Choose a tool to get started
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pb-20">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id as ToolType)}
              className={`p-5 rounded-[2rem] text-left transition-all duration-300 group border relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20' 
                  : 'bg-white border-white/60 hover:border-blue-200 shadow-lg shadow-gray-100'
              }`}
            >
              {/* Icon Background */}
              <div className={`absolute -right-4 -bottom-4 opacity-5 transform scale-150 rotate-[-15deg] transition-transform group-hover:scale-175 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                  <Icon size={80} />
              </div>

              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg ${
                 isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-slate-50 to-white'
              }`}>
                 <Icon size={24} className={tool.color} />
              </div>
              
              <h3 className={`font-bold text-lg leading-tight mb-1 ${
                isDarkMode ? 'text-gray-100' : 'text-slate-800'
              }`}>
                {tool.name.split(' ')[0]} <br/>
                <span className="opacity-70">{tool.name.split(' ')[1]}</span>
              </h3>
              
              <div className="flex items-center mt-3 text-xs font-medium opacity-60">
                 <span>Use Tool</span>
                 <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsView;