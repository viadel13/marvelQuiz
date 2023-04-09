// import { memo } from "react";

const ProgressBar = ({idQuestion, maxQuestion}) => {

  const idQuestionPers = idQuestion + 1
  return (
    <>
      <div className="percentage">
        <div className="progressPercent"> Question: {idQuestionPers}/{maxQuestion}</div>
        <div className="progressPercent">Progression: {idQuestionPers * 10} %</div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style={{width : `${idQuestionPers  * 10}%`}}></div>
      </div>
    </>
  );
};

export default ProgressBar;
