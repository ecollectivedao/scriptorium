'use client';
import React, { useEffect, useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentQuestionIndex } from "@/lib/slices/trainingSlice";
import {
  useFetchQuestionsQuery,
  useFetchUserAnswersQuery,
  useSubmitAnswerMutation,
} from "@/lib/slices/apiSlice";
import UserAnswerCard from "./UserAnswerCard";

const Train: React.FC = () => {
  const dispatch = useAppDispatch();

  // Get the current question index from the Redux store
  const currentQuestionIndex = useAppSelector(
    (state) => state.training.currentQuestionIndex
  );

  // Local state for the current answer input
  const [currentAnswer, setCurrentAnswer] = useState("");

  // Fetch questions using RTK Query
  const {
    data: questions = [],
    isLoading: isLoadingQuestions,
    error: questionsError,
  } = useFetchQuestionsQuery();

  // Fetch user answers using RTK Query
  const {
    data: userAnswers = [],
    isLoading: isLoadingUserAnswers,
    error: userAnswersError,
  } = useFetchUserAnswersQuery();

  // Mutation hook for submitting an answer
  const [submitAnswer, { isLoading: isSubmitting }] = useSubmitAnswerMutation();

  // Update currentAnswer when the current question or userAnswers change
  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      const existingAnswer = userAnswers.find(
        (ua) => ua.question.id === currentQuestion.id
      );
      setCurrentAnswer(existingAnswer ? existingAnswer.response : "");
    }
  }, [questions, userAnswers, currentQuestionIndex]);

  // Handle submitting an answer
  const handleSubmit = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      try {
        await submitAnswer({
          questionId: currentQuestion.id,
          response: currentAnswer,
        }).unwrap();

        // Move to the next question
        if (currentQuestionIndex + 1 < questions.length) {
          dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        } else {
          // Optionally handle completion of all questions
          console.log("All questions answered");
        }
      } catch (err) {
        console.error("Failed to submit answer: ", err);
      }
    }
  };
  
  // Loading and error handling
  if (isLoadingQuestions || isLoadingUserAnswers) {
    return <p>Loading...</p>;
  }

  if (questionsError || userAnswersError) {
    return (
      <p>
        Error:{" "}
        {questionsError?.toString() || userAnswersError?.toString()}
      </p>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 bg-black">
      {currentQuestion && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {currentQuestion.question}
          </h2>
          <Textarea
            placeholder="Type your answer here..."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            minRows={4}
            className="mb-4"
          />
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4">Your Answers</h3>
        {userAnswers.map((ua) => (
          <div className="w-2/3" key={ua.id}>
            <UserAnswerCard key={ua.id} userAnswer={ua} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Train;
