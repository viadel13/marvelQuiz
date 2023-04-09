import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Accueil = () => {

  const refMain = useRef(null) 
  
  const[btn, setBtn] = useState(false)

  useEffect(()=>{
    
    refMain.current.classList.add("startingImg")

    setTimeout(()=>{
        refMain.current.classList.remove("startingImg")  
        setBtn(true)
    }, 1000)

    }, [])

    const setLeftImg = () =>{
        refMain.current.classList.add("leftImg")
        refMain.current.classList.remove("rightImg")
    }
    const setRightImg = () =>{
        refMain.current.classList.add("rightImg")
        refMain.current.classList.add("leftImg")
    }

    const bouton = btn && (
        <>
            <div onMouseMove={setLeftImg} className='leftBox'>
                <Link to='/SignUp' className='btn-welcome'>Inscription</Link>
            </div>
            <div onMouseMove={setRightImg}  className='rightBox'>
                <Link to='/Login' className='btn-welcome'>Connexion</Link>
            </div>
        </>
    )

  return (
   <main ref={refMain} className='welcomePage'>
    {bouton}
   </main>
  )
}

export default Accueil
