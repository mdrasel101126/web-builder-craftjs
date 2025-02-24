"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function CreateQuiz() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState<{
    question: string;
    options: string;
    correctAnswer: string;
  }>({
    question: "",
    options: "",
    correctAnswer: "",
  });

  const addQuizQuestion = () => {
    if (
      !newQuestion.question ||
      !newQuestion.options ||
      !newQuestion.correctAnswer
    )
      return;
    setQuizQuestions([
      ...quizQuestions,
      {
        id: quizQuestions.length + 1,
        question: newQuestion.question,
        options: newQuestion.options.split(","),
        correctAnswer: newQuestion.correctAnswer,
      },
    ]);
    setNewQuestion({ question: "", options: "", correctAnswer: "" });
  };

  const removeQuizQuestion = (id: number) => {
    setQuizQuestions(quizQuestions.filter((q) => q.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Quiz</h1>
      <Input
        placeholder="Question"
        value={newQuestion.question}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, question: e.target.value })
        }
      />
      <Input
        placeholder="Options (comma separated)"
        value={newQuestion.options}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, options: e.target.value })
        }
      />
      <Input
        placeholder="Correct Answer"
        value={newQuestion.correctAnswer}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
        }
      />
      <Button
        onClick={addQuizQuestion}
        className="w-full flex items-center gap-2"
      >
        <Plus size={16} /> Add Question
      </Button>

      <div className="space-y-4">
        {quizQuestions.map((q) => (
          <Card key={q.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{q.question}</h2>
                  <ul className="text-sm text-gray-500 list-disc list-inside">
                    {q.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  <p className="text-green-600">
                    Correct Answer: {q.correctAnswer}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeQuizQuestion(q.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
