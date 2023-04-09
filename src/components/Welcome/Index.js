import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Index";
import Quiz from "../Quiz/Index";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase/fireBase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FireBase/fireBase";
import Loader from "../Loader/Index";

const Welcome = () => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const listenner = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);

        // getDoc(user)
        // .then((doc)=>{
        //   console.log(doc)
        // })
        // .catch((error)=>{

        // })
      } else {
        navigate("/");
      }
    });

    if (user !== null) {
      const uid = user.uid;
      const refUser = doc(db, "user", uid);

      getDoc(refUser)
        .then((doc) => {
          if (doc.exists()) {
            const datas = doc.data();
            setUserData(datas);
          }
        })
        .catch((error) => {
          console.log("Utilisateur avec aucun datas");
        });
    }

    return () => {
      listenner();
    };
  }, [user, navigate]);

  const display =
    userSession === null ? (
      <Loader
        loadingMsg={"Authentification..."}
        styling={{ textAlign: "center", color: "#FFFFFF" }}
      />
    ) : (
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          <Quiz userData={userData} />
        </div>
      </div>
    );

  return <>{display}</>;
};

export default Welcome;
