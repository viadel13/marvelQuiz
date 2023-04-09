import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../FireBase/fireBase';
import { user } from "../FireBase/fireBase";
import { setDoc } from "firebase/firestore";

const data = {

  pseudo : '',
  email : '',
  password : '',
  confirmPassword : ''

}

const SignUp = () => {
  
  const navigate = useNavigate()
  const[loginData, setLoginData] = useState(data)
  const[error, setError] = useState('')

  const handleChange = (e) =>{
    
    setLoginData({...loginData, [e.target.id] : e.target.value})
    
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((authUser)=>{
      return setDoc(user(authUser.user.uid),{
        pseudo,
        email
      })
    })
    .then(user=>{
      setLoginData({...data})
      navigate('/Welcome')
      setError('')
    })
    
    .catch(error=>{
      setError(error.message);
      setLoginData({...loginData})
    })
    
  }

  const{pseudo, email, password, confirmPassword} = loginData;

  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
  ?<button disabled>Inscription</button> : <button>Inscription</button> 

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftSignup'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>
            <h2>Inscription</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>

              <div className='inputBox'>
                <input type='text' onChange={handleChange} value={loginData.pseudo} id='pseudo' required/>
                <label htmlFor='pseudo'>Pseudo</label>  
              </div> 

              <div className='inputBox'>
                <input type='email' onChange={handleChange} value={loginData.email} id='email' required />
                <label htmlFor='email'>Email</label>  
              </div> 

              <div className='inputBox'>
                <input type='password' autoComplete="off"  onChange={handleChange} value={loginData.password} id='password' required />
                <label htmlFor='password'>Mot de passe</label>  
              </div> 

              <div className='inputBox'>
                <input type='password' autoComplete="off"  onChange={handleChange} value={loginData.confirmPassword} id='confirmPassword' required />
                <label htmlFor='confirmPassword'>confirmer le mot de passe</label>  
              </div> 
              
              {btn}

            </form>
            <div className='linkContainer'>
              <Link className='simpleLink' to='/login'>Deja inscript ? Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
