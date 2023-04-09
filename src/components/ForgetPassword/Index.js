import { Link, useNavigate } from "react-router-dom";
import { auth } from "../FireBase/fireBase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(null);
        setSuccess(
          `Consulter votre email ${email} pour changer le mot de passe`
        );
        setEmail('');
        setTimeout(() => {
          navigate('/login')
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail('');
      });
  };

  const disaled = email === "";
  const msgSuccess = success && (
    <span
      style={{
        border: "1px solid",
        background: "green",
        color: "#ffffff",
      }}
    >
      {success}
    </span>
  );
  const msgError = error && <span>{error.message}</span>
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent" style={{ marginTop: "80px" }}>
            {msgSuccess}
            {msgError}
            <h2>Mot de passe oublie ?</h2>

            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <button disabled={disaled}>Recuperer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Deja inscrit ? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
