// src/lib/slices/trainingSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Question {
  id: number;
  question: string;
}

interface UserAnswer {
  id?: number;
  question: Question;
  answer: string;
}

interface TrainingState {
  questions: Question[];
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  loading: boolean;
  error: string | null;
}

const initialState: TrainingState = {
  questions: [],
  userAnswers: [],
  currentQuestionIndex: 0,
  loading: false,
  error: null,
};

// Async thunk to fetch questions
export const fetchQuestions = createAsyncThunk<
  Question[],
  { token: string }
>('training/fetchQuestions', async ({token}, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:8000/api/questions/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Async thunk to fetch user answers
export const fetchUserAnswers = createAsyncThunk<
  UserAnswer[],
  { token: string }
>('training/fetchUserAnswers', async ({token}, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:8000/api/user_answers/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user answers');
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Async thunk to submit an answer
export const submitAnswer = createAsyncThunk<
  UserAnswer,
  { questionId: number; answer: string; token: string }
>(
  'training/submitAnswer',
  async ({ questionId, answer, token }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8000/api/user_answers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          [`question_${questionId}`]: answer,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }
      // Assuming the API returns the updated user answer
      return { question: { id: questionId, question: '' }, answer };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
    },
    updateUserAnswer(
      state,
      action: PayloadAction<{ questionId: number; answer: string }>
    ) {
      const { questionId, answer } = action.payload;
      const existingAnswer = state.userAnswers.find(
        (ua) => ua.question.id === questionId
      );
      if (existingAnswer) {
        existingAnswer.answer = answer;
      } else {
        const question = state.questions.find((q) => q.id === questionId);
        if (question) {
          state.userAnswers.push({ question, answer });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.userAnswers = action.payload;
      })
      .addCase(fetchUserAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        const { question, answer } = action.payload;
        const existingAnswer = state.userAnswers.find(
          (ua) => ua.question.id === question.id
        );
        if (existingAnswer) {
          existingAnswer.answer = answer;
        } else {
          state.userAnswers.push({ question, answer });
        }
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentQuestionIndex, updateUserAnswer } =
  trainingSlice.actions;

export default trainingSlice.reducer;
