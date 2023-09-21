import React, { useState, useEffect } from "react";
import standardBilde from "../img/standard.png";
import Gutt_lyst_hår from "../img/Gutt_lyst_hår.png";
import Gutt_lyst_hår_og_briller from "../img/Gutt_lyst_hår_og_briller.png";
import Gutt_brunt_hår from "../img/Gutt_brunt_hår.png";
import Gutt_brunt_hår_og_bart from "../img/Gutt_brunt_hår_bart.png";
import Jente_lyst_hår from "../img/Jente_lyst_hår.png";
import Jente_brunt_hår from "../img/Jente_brunt_hår.png";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";

function DropdownMenu() {
  const [selectedOption, setSelectedOption] = useState("Gutt-lyst-hår");
  const [bilde, setBilde] = useState(standardBilde);
  const { currentBruker } = useAuth();
  let bilde1 = Gutt_lyst_hår;
  let bilde2 = Gutt_lyst_hår_og_briller;
  let bilde3 = Gutt_brunt_hår;
  let bilde4 = Gutt_brunt_hår_og_bart;
  let bilde5 = Jente_lyst_hår;
  let bilde6 = Jente_brunt_hår;

  useEffect(() => {
    async function hentBilde() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if (document.data().id === currentBruker.uid) {
          if (document.data().profilePicture === "Gutt_lyst_hår") {
            setBilde(bilde1);
          } else if (document.data().profilePicture === "Gutt_lyst_hår_og_briller") {
            setBilde(bilde2);
          } else if (document.data().profilePicture === "Gutt_brunt_hår") {
            setBilde(bilde3);
          } else if (document.data().profilePicture === "Gutt_brunt_hår_bart") {
            setBilde(bilde4);
          } else if (document.data().profilePicture === "Jente_lyst_hår") {
            setBilde(bilde5);
          } else if (document.data().profilePicture === "Jente_brunt_hår") {
            setBilde(bilde6);
          }
        }
      });
    }
    hentBilde();
  }, [bilde1, bilde2, bilde3, bilde4, bilde5, bilde6, currentBruker.uid]) 

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Gutt_lyst_hår") {
      setBilde(bilde1);
    } else if (event.target.value === "Gutt_lyst_hår_og_briller") {
      setBilde(bilde2); 
    } else if (event.target.value === "Gutt_brunt_hår") {
      setBilde(bilde3); 
    } else if (event.target.value === "Gutt_brunt_hår_bart") {
      setBilde(bilde4); 
    } else if (event.target.value === "Jente_lyst_hår") {
      setBilde(bilde5); 
    } else if (event.target.value === "Jente_brunt_hår") {
      setBilde(bilde6); 
    }
    handleSubmit(event.target.value)
  };

  async function handleSubmit(bildeNr) {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {   
      if (document.data().id === currentBruker.uid) {
        updateDoc(doc(db, "users", document.id), {
          profilePicture: bildeNr,
        });
      }
    });
  }

  return (
    <div>
      <label htmlFor="image-select">Velg en avatar:</label>
      <select
        id="image-select"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="Gutt_lyst_hår">Gutt lyst hår</option>
        <option value="Gutt_lyst_hår_og_briller">Gutt lyst hår og briller</option>
        <option value="Gutt_brunt_hår">Gutt brunt hår</option>
        <option value="Gutt_brunt_hår_bart">Gutt brunt hår og bart</option>
        <option value="Jente_lyst_hår">Jente lyst hår</option>
        <option value="Jente_brunt_hår">Jente brunt hår</option>
      </select>
      {/* <img src={`${selectedOption}.png`} alt="Selected Option" /> */}
      <img src={bilde} alt="Selected Option" width="100rem"/>
    </div>
  );
}

export default DropdownMenu;
