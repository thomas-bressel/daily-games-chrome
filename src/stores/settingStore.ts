import { create } from 'zustand';

import { SettingState } from '../types/storeSetting';

export const useSettingStore = create<SettingState>((set) => ({
  // Initial State datas
  isSettingOpen: false,

  // State modifier functions
  toggleSetting: () => set((state) => ({
    isSettingOpen: !state.isSettingOpen
  })),
  openSetting: () => set({
    isSettingOpen: true
  }),
  closeSetting: () => set({
    isSettingOpen: false
  }),
}));    