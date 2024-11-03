import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store'; // Adjust the path as necessary

export type Question = {
  id: number;
  question: string;
};

export type UserAnswer = {
  id?: number;
  question: Question;
  response: string;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.token;
      // Include the token in headers for all endpoints except 'login' and 'signup'
      if (token && endpoint !== 'login' && endpoint !== 'signup') {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['UserAnswers', 'Chat'],
  endpoints: (builder) => ({
    fetchQuestions: builder.query<Question[], void>({
      query: () => 'questions/',
    }),
    fetchUserAnswers: builder.query<UserAnswer[], void>({
      query: () => 'user_answers/',
      providesTags: ['UserAnswers'],
    }),
    submitAnswer: builder.mutation<
      UserAnswer,
      { questionId: number; response: string }
    >({
      query: ({ questionId, response }) => ({
        url: 'user_answers/',
        method: 'POST',
        body: {
          [`question_${questionId}`]: response,
        },
      }),
      invalidatesTags: ['UserAnswers'],
    }),
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: 'login/',
        method: 'POST',
        body: { email, password },
      }),
    }),
    // New Chat Mutation
    chat: builder.mutation<string, { user_input: string }>({
      query: (body) => ({
        url: 'chat/',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
});

export const {
  useFetchQuestionsQuery,
  useFetchUserAnswersQuery,
  useSubmitAnswerMutation,
  useLoginMutation,
  useChatMutation,
} = apiSlice;
