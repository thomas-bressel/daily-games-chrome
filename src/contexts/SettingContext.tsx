"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface SettingContextType {
  isSettingOpen: boolean;
  toggleSetting: () => void;
  openSetting: () => void;
  closeSetting: () => void;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const toggleSetting = () => setIsSettingOpen(prev => !prev);
  const openSetting = () => setIsSettingOpen(true);
  const closeSetting = () => setIsSettingOpen(false);

  return (
    <SettingContext.Provider value={{ isSettingOpen, toggleSetting, openSetting, closeSetting }}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error('useSetting must be used within a SettingProvider');
  }
  return context;
};