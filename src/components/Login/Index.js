import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase/fireBase";

const Login  = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState();
  const[error, setError] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{
    if(email === '' || password === ''){
      
      setBtn(false)
    
    }else{
      setBtn(true)
    }

  }, [email, password])
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((user)=>{
      setEmail('');
      setPassword('')
      navigate('/Welcome', {replace: true})
    })
    .catch((error)=>{
      setError(error.message);
      setEmail('');
      setPassword('')
    })
  }

  const bouton = btn ?  <button>Connexion</button> :  <button disabled>Connexion</button> 

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeft'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>
            <h2>Connexion</h2>
            {error && <span>{error.message}</span>}
            <form onSubmit={handleSubmit}>

              <div className='inputBox'>
                <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} required />
                <label htmlFor='email'>Email</label>  
              </div> 

              <div className='inputBox'>
                <input type='password' autoComplete="off"  onChange={(e)=>setPassword(e.target.value)} value={password} id='password' required />
                <label htmlFor='password'>Mot de passe</label>  
              </div> 
              {bouton}
            </form>
            <div className='linkContainer'>
              <Link className='simpleLink' to='/signup'>Nouveau sur Marvel Quiz ? inscrivez-vous maintenant </Link>
              <br />
              <Link className='simpleLink' to='/forgetpassword'>Mot de passe oublie? recupere-le ici </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 
