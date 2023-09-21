import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentBruker, setCurrentBruker] = useState();
  let [loading, setLoading] = useState(true);

  function lagEnBruker(epost, passord) {
    createUserWithEmailAndPassword(auth, epost, passord)
      .then((userCredential) => {
        setDoc(doc(db, "users", userCredential.user.uid), {
          id: userCredential.user.uid,
          email: epost,
          password: passord,
          bio: "",
          country: "",
          userName: "",
          userTag: "",
          profilePicture: "Standard",
        }).catch((error) => {
          console.log(
            "Something went wrong with added user to firestore: ",
            error
          );
        });
        alert("Brukeren ble opprettet:)");
      })
      //ensure we catch any errors at this stage to advise us if something does go wrong
      .catch((error) => {
        console.log("Something went wrong with signup: ", error);
        return 0;
      });
    return 1;
  }

  function logginn(epost, passord) {
    return signInWithEmailAndPassword(auth, epost, passord);
  }

  function loggUt() {
    return signOut(auth);
  }

  function nullstillPassord(epost) {
    return auth.sendPasswordResetEmail(epost);
  }

  function oppdaterEpost(epost) {
    signInWithEmailAndPassword(auth, epost, "123456").then((userCredential) => {
      return userCredential.user.updateEmail(epost);
    });

    //return currentBruker.updateEmail(auth, epost);
  }

  function oppdaterPassord(passord) {
    return currentBruker.updatePassword(auth, passord);
  }

  //kjører bare 1 gang []
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((bruker) => {
      setCurrentBruker(bruker);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentBruker,
    logginn,
    lagEnBruker,
    loggUt,
    nullstillPassord,
    oppdaterEpost,
    oppdaterPassord,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
