import { useState } from "react";
import { questions } from "../../data/questions";
import { ALERT_TYPE } from "../../contansts/alertConstant";
import { alert } from "../../utils/alert";

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );
  const { CHECK } = ALERT_TYPE;
  const alertConsole = alert();

  const handleChange = (index, optionIndex) => {
    const newAnswers = [...answers];
    const typeParts = questions[index].type.split("/");

    newAnswers[index] = {
      type: questions[index].type,
      answer: typeParts[optionIndex], // 선택한 옵션 인덱스에 따라 MBTI 값 저장
    };
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const incompleteAnswerIndex = answers.findIndex(
      (answer) => answer.answer === ""
    );

    if (incompleteAnswerIndex !== -1) {
      const questionElement = document.getElementById(
        `question-${incompleteAnswerIndex}`
      );

      // 스크롤 후 포커스 강제 설정
      questionElement.scrollIntoView({ behavior: "smooth", block: "center" });
      questionElement.tabIndex = -1;
      questionElement.focus({ preventScroll: true }); // 스크롤 위치 유지

      // (2) 경고창 설정 변경
      alertConsole({
        type: CHECK,
        content: "항목을 체크해주세요.",
      });
      return;
    }

    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg">
      {questions.map((q, index) => (
        <div key={q.id} id={`question-${index}`} className="mb-6" tabIndex={-1}>
          <p className="font-semibold text-lg mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, optionIndex) => {
              const mbtiValue = q.type.split("/")[optionIndex];
              return (
                <label
                  key={optionIndex}
                  className={`block p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                    answers[index]?.answer === mbtiValue ? "bg-gray-100" : ""
                  } hover:bg-gray-100`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={answers[index]?.answer === mbtiValue}
                    onChange={() => handleChange(index, optionIndex)}
                    className="mr-2 text-primary-color"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#71fda9]"
      >
        제출하기
      </button>
    </form>
  );
};

export default TestForm;
