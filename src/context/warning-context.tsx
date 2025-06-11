'use client'

import ResponsiveWarning from '@/components/ui/responsive-warning';
import { createContext, useCallback, useContext, useState } from 'react';

interface Warning {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  duration?: number;
}

interface WarningContextType {
  showWarning: (message: string, severity?: Warning['severity'], duration?: number) => void;
}

const WarningContext = createContext<WarningContextType | undefined>(undefined);

export function WarningProvider({ children }: { children: React.ReactNode }) {
  const [warnings, setWarnings] = useState<Warning[]>([]);

  const showWarning = useCallback((message: string, severity: Warning['severity'] = 'warning', duration = 5000) => {
    const id = Math.random().toString(36).substring(7);
    setWarnings(prev => [...prev, { id, message, severity, duration }]);
  }, []);

  const removeWarning = useCallback((id: string) => {
    setWarnings(prev => prev.filter(warning => warning.id !== id));
  }, []);

  return (
    <WarningContext.Provider value={{ showWarning }}>
      {children}
      {warnings.map(warning => (
        <ResponsiveWarning
          key={warning.id}
          message={warning.message}
          severity={warning.severity}
          duration={warning.duration}
          onClose={() => removeWarning(warning.id)}
        />
      ))}
    </WarningContext.Provider>
  );
}

export function useWarning() {
  const context = useContext(WarningContext);
  if (context === undefined) {
    throw new Error('useWarning must be used within a WarningProvider');
  }
  return context;
} 