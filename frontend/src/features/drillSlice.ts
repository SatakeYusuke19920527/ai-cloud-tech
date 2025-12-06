import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    recordDrillAnswer: (state, action: PayloadAction<DrillType>) => {
      // remove existing entry for same chapter/question
      state.drill = state.drill.filter(
        (entry) =>
          !(
            entry.chapterSlug === action.payload.chapterSlug &&
            entry.questionIndex === action.payload.questionIndex
          )
      );
      state.drill.push(action.payload);
    },
    resetDrillByChapter: (state, action: PayloadAction<{ chapterSlug: string }>) => {
      state.drill = state.drill.filter(
        (entry) => entry.chapterSlug !== action.payload.chapterSlug
      );
    },
    resetAllDrill: (state) => {
      state.drill = [];
    },
  },
});

export const { recordDrillAnswer, resetDrillByChapter, resetAllDrill } = drillSlice.actions;

export const selectDrill = (state: RootState) => state.drill.drill;
export const selectDrillByChapter = (chapterSlug: string) => (state: RootState) =>
  state.drill.drill.filter((entry) => entry.chapterSlug === chapterSlug);

export default drillSlice.reducer;
