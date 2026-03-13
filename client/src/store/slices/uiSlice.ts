import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../../types';

const initialState: UIState = {
  cursorPosition: { x: 0, y: 0 },
  cursorVariant: 'default',
  activeModal: null,
  isNavVisible: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCursorPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.cursorPosition = action.payload;
    },
    setCursorVariant(state, action: PayloadAction<UIState['cursorVariant']>) {
      state.cursorVariant = action.payload;
    },
    setActiveModal(state, action: PayloadAction<string | null>) {
      state.activeModal = action.payload;
    },
    setNavVisible(state, action: PayloadAction<boolean>) {
      state.isNavVisible = action.payload;
    },
  },
});

export const { setCursorPosition, setCursorVariant, setActiveModal, setNavVisible } = uiSlice.actions;
export default uiSlice.reducer;
