// src/lib/slices/trainingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrainingState {
  // Remove currentQuestionIndex if it exists
}

const initialState: TrainingState = {
  // Initialize other state properties if any
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    // Remove setCurrentQuestionIndex action
  },
});

export default trainingSlice.reducer;
