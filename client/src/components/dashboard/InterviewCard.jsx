import { useState } from "react";

import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
} from "../../services/interviewService";

import QuestionCard from "./QuestionCard";
import AnswerBox from "./AnswerBox";
import EvaluationCard from "./EvaluationCard";

const InterviewCard = ({ resumeId }) => {
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [evaluation, setEvaluation] = useState(null);

  const [interviewCompleted, setInterviewCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  /**
   * Generate Interview
   */
  const handleGenerateInterview = async () => {
    if (!resumeId) {
      alert("Please upload a resume first.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await generateInterviewQuestions(resumeId);

      setQuestions(response.data);

      setCurrentQuestionIndex(0);

      setEvaluation(null);

      setInterviewCompleted(false);
    } catch (error) {
      console.error(error);

      alert("Failed to generate interview.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submit Answer
   */
  const handleSubmitAnswer = async (answer) => {
    try {
      setLoading(true);

      const response =
        await evaluateInterviewAnswer({
          resumeId,
          question: currentQuestion,
          answer,
        });

      setEvaluation(response.data);
    } catch (error) {
      console.error(error);

      alert("Failed to evaluate answer.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Next Question
   */
  const handleNextQuestion = () => {
    if (
      currentQuestionIndex ===
      questions.length - 1
    ) {
      setInterviewCompleted(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);

    setEvaluation(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Interview Practice
      </h2>

      {/* Generate Interview */}

      {questions.length === 0 &&
        !interviewCompleted && (
          <button
            onClick={handleGenerateInterview}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate Interview"}
          </button>
        )}

      {/* Interview */}

      {questions.length > 0 &&
        !interviewCompleted && (
          <>
            <QuestionCard
              question={currentQuestion}
              current={currentQuestionIndex + 1}
              total={questions.length}
            />

            <AnswerBox
              key={currentQuestionIndex}
              onSubmit={handleSubmitAnswer}
              loading={loading}
              disabled={evaluation !== null}
            />

            <EvaluationCard
              evaluation={evaluation}
              onNextQuestion={
                handleNextQuestion
              }
              isLastQuestion={
                currentQuestionIndex ===
                questions.length - 1
              }
            />
          </>
        )}

      {/* Interview Completed */}

      {interviewCompleted && (
        <div className="text-center py-10">

          <h2 className="text-3xl font-bold text-green-600">
            🎉 Interview Completed
          </h2>

          <p className="text-gray-600 mt-3 mb-6">
            Great job! You have completed
            all interview questions.
          </p>

          <button
            onClick={handleGenerateInterview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Start New Interview
          </button>

        </div>
      )}
    </div>
  );
};

export default InterviewCard;