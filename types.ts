export interface CalculatorState {
  currentOperand: string;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
}

export type ThemeMode = 'dark' | 'light';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
