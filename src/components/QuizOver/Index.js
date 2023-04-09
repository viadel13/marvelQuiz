import { forwardRef, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader/Index";
import Modal from "../Modal/Index";
import { useCallback } from "react";
import axios from "axios";

const QuizOver = forwardRef((props, ref) => {
  const {
    levelsName,
    score,
    maxQuestion,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [charactersInfos, setCharactersInfos] = useState([]);
  const [loadind, setLoading] = useState(true);
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "51ca3f5931ce4f31bfcd366766887d69";

  useEffect(() => {
    setAsked(ref.current);
    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      chekDataAge(date);
    }
  }, [ref]);

  const chekDataAge = (date) => {
    const today = Date.now(); // termps ecoule depuis le 1er janvier 1970 jusqu'a maintenant
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };



  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharactersInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          console.log(response);
          setCharactersInfos(response.data);
          setLoading(false);
          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const hideModal = useCallback(() => {
    setOpenModal(false);
    setLoading(true);
  }, []);

  const averageGrade = maxQuestion / 2;

  if (score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 3000);
  }

  const desicion =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelsName.length ? (
            <>
              <p className="successMsg">Passez au niveau suivant</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau Suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <GiTrophyCup size="50px" />
                Bravo vous etes un expert !
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Reuissite : {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestion}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez echoue ! </p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Reuissite : {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestion}
          </div>
        </div>
      </>
    );

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"Pas de reponses"}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  const resultInModal = !loadind ? (
    <>
      <div className="modalHeader">
        <h2>{charactersInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              charactersInfos.data.results[0].thumbnail.path +
              "." +
              charactersInfos.data.results[0].thumbnail.extension
            }
            alt={charactersInfos.data.results[0].name}
          />
          <p>{charactersInfos.attributionText}</p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {charactersInfos.data.results[0].description ? (
            <p>{charactersInfos.data.results[0].description}</p>
          ) : (
            <p>Description indisponible ....</p>
          )}
          <h3>Plus d'infos</h3>
          {charactersInfos.data.results[0].urls &&
            charactersInfos.data.results[0].urls.map((url, index) => {
              return (
                <a
                  key={index}
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                {url.type}
                
                </a>
              );
            })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>
          Fermer
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>Reponse de Marvel ...</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </>
  );

  return (
    <>
      {desicion}
      <p>Les reponses aux questions posees</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Reponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
      <Modal openModal={openModal}>{resultInModal}</Modal>
    </>
  );
});

export default QuizOver;
