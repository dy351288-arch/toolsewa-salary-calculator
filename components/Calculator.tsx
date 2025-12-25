import React, { useState, useCallback } from 'react';
import { Delete, Divide, Minus, Plus, X, Equal, Percent } from 'lucide-react';
import { CalculatorState } from '../types';
import { useTheme } from './ThemeContext';

const CalculatorView = () => {
  const { isDarkMode } = useTheme();
  const [state, setState] = useState<CalculatorState>({
    currentOperand: '0',
    previousOperand: null,
    operation: null,
    overwrite: false,
  });

  const [lastCalculation, setLastCalculation] = useState<string>('');

  const formatOperand = (operand: string) => {
    if (operand === null || operand === undefined) return;
    const [integer, decimal] = operand.split('.');
    if (decimal === undefined) {
      return new Intl.NumberFormat('en-US').format(parseInt(integer));
    }
    return `${new Intl.NumberFormat('en-US').format(parseInt(integer))}.${decimal}`;
  };

  const evaluate = ({ currentOperand, previousOperand, operation }: CalculatorState) => {
    const prev = parseFloat(previousOperand || '0');
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return '';
    
    let computation = 0;
    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
    }
    return computation.toString();
  };

  const clear = () => {
    setState({
      currentOperand: '0',
      previousOperand: null,
      operation: null,
      overwrite: false,
    });
    setLastCalculation('');
  };

  const deleteDigit = () => {
    if (state.overwrite) {
      setState({
        ...state,
        currentOperand: '0',
        overwrite: false,
      });
      return;
    }
    if (state.currentOperand === '0') return;
    if (state.currentOperand.length === 1) {
      setState({ ...state, currentOperand: '0' });
      return;
    }
    setState({
      ...state,
      currentOperand: state.currentOperand.slice(0, -1),
    });
  };

  const appendDigit = (digit: string) => {
    if (state.overwrite) {
      setState({
        ...state,
        currentOperand: digit,
        overwrite: false,
      });
      return;
    }
    if (digit === '0' && state.currentOperand === '0') return;
    if (digit === '.' && state.currentOperand.includes('.')) return;
    if (state.currentOperand === '0' && digit !== '.') {
      setState({ ...state, currentOperand: digit });
      return;
    }
    setState({
      ...state,
      currentOperand: `${state.currentOperand}${digit}`,
    });
  };

  const chooseOperation = (operation: string) => {
    if (state.currentOperand === null) return;
    if (state.previousOperand !== null) {
      const result = evaluate(state);
      setState({
        previousOperand: result || null,
        operation,
        currentOperand: '0',
        overwrite: true,
      });
      return;
    }
    setState({
      operation,
      previousOperand: state.currentOperand,
      currentOperand: '0',
      overwrite: true,
    });
  };

  const calculate = () => {
    if (state.operation === null || state.previousOperand === null) return;
    const result = evaluate(state);
    setLastCalculation(`${formatOperand(state.previousOperand)} ${state.operation} ${formatOperand(state.currentOperand)} =`);
    setState({
      overwrite: true,
      previousOperand: null,
      operation: null,
      currentOperand: result || '0',
    });
  };

  const percent = () => {
      const current = parseFloat(state.currentOperand);
      if (isNaN(current)) return;
      setState({
          ...state,
          currentOperand: (current / 100).toString(),
          overwrite: true
      });
  };

  const toggleSign = () => {
      const current = parseFloat(state.currentOperand);
      if (isNaN(current)) return;
      setState({
          ...state,
          currentOperand: (current * -1).toString()
      });
  };

  // Button Component
  const CalcButton = ({ 
    label, 
    onClick, 
    variant = 'default',
    icon: Icon 
  }: { 
    label?: string; 
    onClick: () => void; 
    variant?: 'default' | 'primary' | 'secondary' | 'accent';
    icon?: React.ElementType;
  }) => {
    let baseStyles = "relative overflow-hidden rounded-[24px] h-[72px] w-full flex items-center justify-center text-2xl font-medium transition-all duration-200 active:scale-95 select-none";
    let themeStyles = "";

    if (isDarkMode) {
      switch (variant) {
        case 'primary': // Numbers
          themeStyles = "bg-white/5 hover:bg-white/10 text-white shadow-inner shadow-white/5 border border-white/5";
          break;
        case 'secondary': // Top Row
          themeStyles = "bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/10";
          break;
        case 'accent': // Operators side
          themeStyles = "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-400/30";
          break;
        default:
          themeStyles = "bg-white/5 text-white";
      }
    } else {
      switch (variant) {
        case 'primary':
          themeStyles = "bg-white text-slate-700 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)] hover:bg-slate-50";
          break;
        case 'secondary':
          themeStyles = "bg-slate-100 text-slate-500 hover:bg-slate-200";
          break;
        case 'accent':
          themeStyles = "bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600";
          break;
        default:
           themeStyles = "bg-slate-100 text-slate-900";
      }
    }

    return (
      <button onClick={onClick} className={`${baseStyles} ${themeStyles}`}>
        {Icon ? <Icon size={24} strokeWidth={2.5} /> : label}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full justify-end">
        {/* Display Area */}
        <div className={`flex flex-col items-end justify-end mb-8 px-4 py-8 rounded-3xl transition-all duration-500 border ${
            isDarkMode 
            ? 'bg-gradient-to-br from-white/5 to-transparent border-white/5' 
            : 'bg-gradient-to-br from-white to-slate-50 border-white shadow-sm'
        }`}>
            <div className={`h-6 text-sm font-medium mb-1 tracking-wider ${
                isDarkMode ? 'text-purple-300/60' : 'text-slate-400'
            }`}>
                {lastCalculation || (state.operation ? `${formatOperand(state.previousOperand || '')} ${state.operation}` : '')}
            </div>
            <div className={`text-6xl font-light tracking-tight w-full text-right overflow-hidden text-ellipsis whitespace-nowrap ${
                 isDarkMode ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-800'
            }`}>
                {formatOperand(state.currentOperand)}
            </div>
        </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-4">
        <CalcButton label="AC" onClick={clear} variant="secondary" />
        <CalcButton label="+/-" onClick={toggleSign} variant="secondary" />
        <CalcButton icon={Percent} onClick={percent} variant="secondary" />
        <CalcButton icon={Divide} onClick={() => chooseOperation('/')} variant="accent" />

        <CalcButton label="7" onClick={() => appendDigit('7')} variant="primary" />
        <CalcButton label="8" onClick={() => appendDigit('8')} variant="primary" />
        <CalcButton label="9" onClick={() => appendDigit('9')} variant="primary" />
        <CalcButton icon={X} onClick={() => chooseOperation('*')} variant="accent" />

        <CalcButton label="4" onClick={() => appendDigit('4')} variant="primary" />
        <CalcButton label="5" onClick={() => appendDigit('5')} variant="primary" />
        <CalcButton label="6" onClick={() => appendDigit('6')} variant="primary" />
        <CalcButton icon={Minus} onClick={() => chooseOperation('-')} variant="accent" />

        <CalcButton label="1" onClick={() => appendDigit('1')} variant="primary" />
        <CalcButton label="2" onClick={() => appendDigit('2')} variant="primary" />
        <CalcButton label="3" onClick={() => appendDigit('3')} variant="primary" />
        <CalcButton icon={Plus} onClick={() => chooseOperation('+')} variant="accent" />

        <CalcButton icon={Delete} onClick={deleteDigit} variant="secondary" />
        <CalcButton label="0" onClick={() => appendDigit('0')} variant="primary" />
        <CalcButton label="." onClick={() => appendDigit('.')} variant="primary" />
        <CalcButton icon={Equal} onClick={calculate} variant="accent" />
      </div>
    </div>
  );
};

export default CalculatorView;