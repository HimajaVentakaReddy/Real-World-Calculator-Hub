export type CalculatorCategory = 
  | 'All'
  | 'Transport & Travel'
  | 'Utilities & Bills'
  | 'Finance & Shopping'
  | 'Safety & Weather'
  | 'College & Daily';

export interface CalculatorModule {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: CalculatorCategory;
  buttonText: 'Calculate' | 'Check';
  plannedInputs: string[];
  keyFormula: string;
}
