// src/app/components/chat/Chat.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Textarea,
  Card,
  Spinner,
  CardBody,
  Avatar,
} from "@nextui-org/react";
import { useChatMutation } from "@/lib/slices/apiSlice";
import { FaPaperPlane } from "react-icons/fa6";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");

  const [chat, { isLoading, isError, error }] = useChatMutation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await chat({ user_input: userInput }).unwrap();

      const assistantMessage: Message = {
        role: "assistant",
        content: response, // Changed from response.response to response
      };
      setMessages((prev) => [...prev, assistantMessage]);

      setUserInput("");
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex w-3/4 flex-col mx-auto">
      <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-white p-4 text-sm leading-6 shadow-sm">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            } items-start`}
          >
            <Avatar
              className="mr-2 h-8 w-8 rounded-full"
              src={
                message.role === "user"
                  ? "https://dummyimage.com/128x128/363536/ffffff&text=J"
                  : "https://dummyimage.com/128x128/363536/ffffff&text=S"
              }
            />
            <Card
              className={`flex ${
                message.role === "user"
                  ? "rounded-b-xl rounded-tl-xl"
                  : "rounded-b-xl rounded-tr-xl"
              } bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl`}
            >
              <CardBody>
                <p>{message.content}</p>
              </CardBody>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isError && (
        <div className="text-red-500 text-center">
          {error
            ? (error as any).data?.error || "An error occurred."
            : "An error occurred."}
        </div>
      )}

      <form className="mt-2 bg-black" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="chat-input" className="sr-only">
          Enter your prompt
        </label>
        <Textarea
          id="chat-input"
          className=""
          placeholder="Enter your prompt"
          required
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) =>
            handleKeyPress(e as React.KeyboardEvent<HTMLTextAreaElement>)
          }
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              Send <FaPaperPlane className="ml-1" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Chat;
