import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { DrillType } from '../types/types';

type InitialStateType = {
  drill: DrillType[];
};

const initialState: InitialStateType = {
  drill: [],
};

export const drillSlice = createSlice({
  name: 'drill',
  initialState,
  reducers: {
    inputDrillToReduxStore: (state, action) => {
      state.drill.push(action.payload);
    },
  },
});

export const { inputDrillToReduxStore } = drillSlice.actions;

export const selectDrill = (state: RootState) => state.drill;

export default drillSlice.reducer;
