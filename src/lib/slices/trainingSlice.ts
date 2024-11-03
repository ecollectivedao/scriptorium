import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface TrainingState {
  currentQuestionIndex: number;
}

const initialState: TrainingState = {
  currentQuestionIndex: 0,
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
    },
  },
});

export const { setCurrentQuestionIndex } = trainingSlice.actions;
export default trainingSlice.reducer;

