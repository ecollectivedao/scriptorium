import React, { useEffect, useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchQuestions,
  fetchUserAnswers,
  submitAnswer,
  setCurrentQuestionIndex,
  updateUserAnswer,
} from "@/lib/slices/trainingSlice";

const Train: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    questions,
    userAnswers,
    currentQuestionIndex,
    loading,
    error,
  } = useAppSelector((state) => state.training);

  const [currentAnswer, setCurrentAnswer] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only runs on the client side
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchQuestions({ token }));
      dispatch(fetchUserAnswers({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      const existingAnswer = userAnswers.find(
        (ua) => ua.question.id === currentQuestion.id
      );
      setCurrentAnswer(existingAnswer ? existingAnswer.answer : "");
    }
  }, [questions, userAnswers, currentQuestionIndex]);

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && token) {
      dispatch(
        submitAnswer({
          token,
          questionId: currentQuestion.id,
          answer: currentAnswer,
        })
      );
      dispatch(updateUserAnswer({ questionId: currentQuestion.id, answer: currentAnswer }));
      if (currentQuestionIndex + 1 < questions.length) {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      }
    }
  };

  const handleEditAnswer = (questionId: number, answer: string) => {
    if (token) {
      dispatch(submitAnswer({ token, questionId, answer }));
      dispatch(updateUserAnswer({ questionId, answer }));
    }
  };

  if (loading && questions.length === 0) {
    return <p>Loading...</p>;
  }

  if (error && questions.length === 0) {
    return <p>Error: {error}</p>;
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
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-4">Your Answers</h3>
        {userAnswers.map((ua) => (
          <div key={ua.question.id} className="mb-6">
            <p className="font-medium mb-2">{ua.question.question}</p>
            <Textarea
              value={ua.answer}
              onChange={(e) =>
                handleEditAnswer(ua.question.id, e.target.value)
              }
              minRows={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Train;
