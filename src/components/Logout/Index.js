import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../FireBase/fireBase";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checked) {
      signOut(auth)
        .then(() => {
          setTimeout(() => {
            navigate("/");
            console.log("Vous etes deconnecte");
          }, 1000);
        })
        .catch(() => {
          console.log("Oups nous avons une erreur !");
        });
    }
  }, [checked, navigate]);

  const handleChecked = (e) => {
    setChecked((prevState) => !prevState);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChecked} />
        <span
          className="slider round my-anchor-element"
        ></span>
      </label>
    </div>
  );
};

export default Logout;
