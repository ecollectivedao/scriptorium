// src/app/components/train/Train.tsx
'use client';
import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { useAppSelector } from "@/lib/hooks";
import {
  useFetchQuestionsQuery,
  useFetchUserAnswersQuery,
  useSubmitAnswerMutation,
} from "@/lib/slices/apiSlice";
import UserAnswerCard from "./UserAnswerCard";

const Train: React.FC = () => {
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

  // Compute the list of unanswered questions
  const unansweredQuestions = questions.filter(
    (question) => !userAnswers.some((ua) => ua.question.id === question.id)
  );

  // Determine the current question
  const currentQuestion = unansweredQuestions[0] || null;

  // Update currentAnswer when the current question changes
  useEffect(() => {
    if (currentQuestion) {
      setCurrentAnswer("");
    }
  }, [currentQuestion]);

  // Handle submitting an answer
  const handleSubmit = async () => {
    if (!currentQuestion) return;

    try {
      await submitAnswer({
        questionId: currentQuestion.id,
        response: currentAnswer,
      }).unwrap();

      // No need to manually manage currentQuestionIndex
      // The component will re-render with updated userAnswers
    } catch (err) {
      console.error("Failed to submit answer: ", err);
      // Optionally, handle error (e.g., display a message)
    }
  };

  // Loading and error handling
  if (isLoadingQuestions || isLoadingUserAnswers) {
    return <p>Loading...</p>;
  }

  if (questionsError || userAnswersError) {
    return (
      <p>
        Error: {questionsError?.toString() || userAnswersError?.toString()}
      </p>
    );
  }

  return (
    <div className="p-4 bg-black flex flex-col items-center justify-center">
      {currentQuestion ? (
        <div className="flex flex-col items-center justify-center mb-8 mt-4 w-2/3">
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
      ) : (
        <div className="flex flex-col items-center justify-center mb-8 mt-4 w-2/3">
          <h2 className="text-2xl font-semibold mb-4">All questions answered!</h2>
          <p>Thank you for completing all the questions.</p>
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
