// src/app/components/train/UserAnswerCard.tsx
'use client';
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Textarea,
  Button,
} from '@nextui-org/react';
import { FaPenToSquare } from 'react-icons/fa6';
import { UserAnswer, useSubmitAnswerMutation } from '@/lib/slices/apiSlice';

interface UserAnswerCardProps {
  userAnswer: UserAnswer;
}

const UserAnswerCard: React.FC<UserAnswerCardProps> = ({ userAnswer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(userAnswer.response);

  const [submitAnswer, { isLoading }] = useSubmitAnswerMutation();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await submitAnswer({
        questionId: userAnswer.question.id,
        response: editedAnswer,
      }).unwrap();

      setIsEditing(false);
    } catch (err) {
      console.error('Failed to submit edited answer:', err);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedAnswer(userAnswer.response); // Reset edited answer to original
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{userAnswer.question.question}</h4>
        {!isEditing && (
          <Button
            onClick={handleEditClick}
            variant="light"
          >
            <FaPenToSquare />
          </Button>
        )}
      </CardHeader>

      <CardBody>
        {isEditing ? (
          <Textarea
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            minRows={3}
            className="mb-2"
          />
        ) : (
          <p>{userAnswer.response}</p>
        )}
      </CardBody>

      {isEditing && (
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSaveClick}
            disabled={isLoading}
            className="mr-2"
          >
            Save
          </Button>
          <Button onClick={handleCancelClick} color="danger" variant="flat">
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UserAnswerCard;
