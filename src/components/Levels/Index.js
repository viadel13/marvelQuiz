import Stepper from "react-stepper-horizontal/lib/Stepper";
import { useEffect, useState, memo } from "react";

const Levels = ({levelsName, quizLevel}) => {
  const[levels, setLevels] = useState([])

  useEffect(()=>{
   const quizSetp =  levelsName.map((level)=>({title : level.toUpperCase()}))
   setLevels(quizSetp)
  }, [levelsName])


  return (
    <div className="levelsContainer" style={{background : 'transparent'}}>
        <Stepper
          steps={levels}
          activeStep={quizLevel}
          circleTop={0}
          activeTitleColor={'#d31017'}
          activeColor={'#d31017'}
          completeTitleColor={'#E0E0E0'}
          defaultTitleColor={'#E0E0E0'}
          completeColor={'#E0E0E0'}
          completeBarColor={'#E0E0E0'}
          barStyle={'dashed'}
          size={45}
          circleFontSize={20}
        />
    </div>
  );
};

export default memo(Levels);
