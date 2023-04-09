import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../Levels/Index";
import ProgressBar from "../ProgressBar/Index";
import { QuizMarvel } from "../quizMarvel";
import QuizOver from "../QuizOver/Index";
import { FaAngleRight } from 'react-icons/fa';

const Quiz = ({ userData }) => {
  const pseudo = userData.pseudo;
  const levelsName = ["debutant", "confirme", "expert"];
  const datas = {
    quizLevel: 0,
    maxQuestion: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    quizEnd: false,
    percent: 0,
  };

  const [quiz, setQuiz] = useState(datas);
  const storedDataRef = useRef();
  const quizLevel = quiz.quizLevel;
  const maxQuestion = quiz.maxQuestion;
  const storedQuestions = quiz.storedQuestions;
  const btnDisabled = quiz.btnDisabled;
  const userAnswer = quiz.userAnswer;
  const idQuestion = quiz.idQuestion;
  const quizEnd = quiz.quizEnd;

  const loadQuestions = useCallback(
    (quizz) => {
      const fecthArrayQuiz = QuizMarvel[0].quizz[quizz];
      storedDataRef.current = fecthArrayQuiz;

      if (fecthArrayQuiz.length >= maxQuestion) {
        const newArray = fecthArrayQuiz.map(
          ({ answer, ...keepRest }) => keepRest
        );
        setQuiz(prevState =>({ ...prevState, storedQuestions: newArray }));
      } 
    },
    [maxQuestion]
  );

  const showMessage = (message) => {
    toast.warn(`Bienvenue ${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    loadQuestions(levelsName[quizLevel]);
  }, []);

  const nexQuestion = () => {
    if (idQuestion === maxQuestion - 1) {
      // gameOver();
      setQuiz({ ...quiz, quizEnd: true });
    } else {
      setQuiz(prevState =>({ ...prevState, idQuestion: prevState.idQuestion + 1 }));
    }
    const goodAnswer = storedDataRef.current[idQuestion].answer;

    if (userAnswer === goodAnswer) {
      setQuiz((prevState) => {
        return {
          ...prevState,
          score: prevState.score + 1,
        };
      });
      toast.success(`bravo + 1`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error(`Rate 0`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    setQuiz((prevQuiz) => {
      return {
        ...prevQuiz,
        question: prevQuiz.storedQuestions[prevQuiz.idQuestion].question,
        options: prevQuiz.storedQuestions[prevQuiz.idQuestion].options,
      };
    });
  }, [storedQuestions]);

  useEffect(() => {
    setQuiz((prevQuiz) => {
      return {
        ...prevQuiz,
        question: prevQuiz.storedQuestions[prevQuiz.idQuestion].question,
        options: prevQuiz.storedQuestions[prevQuiz.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      };
    });
  }, [idQuestion]);

  useEffect(() => {
    if (!!userAnswer) {
      setQuiz((prevState) => {
        return { ...prevState, btnDisabled: false };
      });
    }
  }, [userAnswer]);

  useEffect(() => {
    if (pseudo) {
      showMessage(pseudo);
    }
  }, [pseudo]);

  useEffect(() => {
    const gradePercent = getPercentage(quiz.maxQuestion, quiz.score);
    gameOver(gradePercent);
  }, [quizEnd]);

  const submitAnswer = (selectAnswer) => {
    setQuiz({ ...quiz, userAnswer: selectAnswer });
  };

  const getPercentage = (maxQuest, ouScore) => (ouScore / maxQuest) * 100;

  const gameOver = useCallback((percent) => {
    if (percent >= 50) {
      setQuiz((prevState) => {
        return {
          ...prevState,
          quizLevel: prevState.quizLevel + 1,
          percent: percent,
        };
      });
    } else {
      setQuiz(prevState=>{
        return {...prevState, percent : percent}
      });
    }
  }, []);

  const loadLevelQuestions = (param) => {
    setQuiz({
      ...quiz,
      quizLevel: param,
      idQuestion: 0,
      score: 0,
      quizEnd: false,
      percent: 0,
    });
    loadQuestions(levelsName[param]);
  };

  return quizEnd ? (
    <QuizOver
      ref={storedDataRef}
      levelsName={levelsName}
      score={quiz.score}
      maxQuestion={maxQuestion}
      quizLevel={quiz.quizLevel}
      percent={quiz.percent}
      loadLevelQuestions={loadLevelQuestions}
    />
  ) : (
    <>
      <Levels
        levelsName={levelsName}
        quizLevel={quizLevel}
      />
      <ProgressBar idQuestion={idQuestion} maxQuestion={maxQuestion} />
      <h2>{quiz.question}</h2>
      {quiz.options.map((option, index) => (
        <p
          key={index}
          onClick={() => submitAnswer(option)}
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
        >
          <FaAngleRight />
          {option}
        </p>
      ))}
      <button
        disabled={btnDisabled}
        onClick={nexQuestion}
        className="btnSubmit"
      >
        {idQuestion < maxQuestion - 1 ? `Suivant` : "Terminer"}
      </button>
    </>
  );
};

export default Quiz;
