import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "../css/Profile.css";
import standardBilde from "../img/standard.png";
import Gutt_lyst_hår from "../img/Gutt_lyst_hår.png";
import Gutt_lyst_hår_og_briller from "../img/Gutt_lyst_hår_og_briller.png";
import Gutt_brunt_hår from "../img/Gutt_brunt_hår.png";
import Gutt_brunt_hår_og_bart from "../img/Gutt_brunt_hår_bart.png";
import Jente_lyst_hår from "../img/Jente_lyst_hår.png";
import Jente_brunt_hår from "../img/Jente_brunt_hår.png";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import MyPost from "./MyPost";

const profileStyle = {
  body: {
    backgroundImage: "url(Images/sunsetBackPack.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    textallign: "center",
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "1",
    // opacity: "0.5",
    // filter: "blur(1px)",
    transition: "all 0.5s ease-in-out",
    transform: "scale(1.1)",
  },
  profileCard: {
    left: "10%",
    position: "absolute",
    height: "90vh",
    top: "100px",
    width: "30%",
    allignItems: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#333",
    fontFamily: "sans-serif",
    fontSize: "1.2rem",
    fontWeight: "300",
    lineHeight: "1.5",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  bioPart: {
    height: "36rem",
  },
  myCards: {
    left: "40%",
    width: "90%",
    position: "absolute",
    height: "90vh",
    top: "100px",

    // allignItems: 'center',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: '#333',
    // fontFamily: 'sans-serif',
    // fontSize: '1.2rem',
    // fontWeight: '300',
    // lineHeight: '1.5',
    // overflow: 'hidden',
    // backgroundColor: 'rgba(0, 0, 0, 0)',

    // backgroundColor: 'rgba(0,0,0,.5)',
    // color: '#fff',
  },
};

export default function Profile() {
  const [setError] = useState("");
  const { currentBruker, loggUt } = useAuth();
  const history = useHistory();
  const [setBilde] = useState(standardBilde);
  const [bio, setBio] = useState(currentBruker.bio);
  const [userName, setUserName] = useState(currentBruker.userName);
  const [userTag, setUserTag] = useState(currentBruker.userTag);
  const [country, setCountry] = useState(currentBruker.country);

  let bilde1 = Gutt_lyst_hår;
  let bilde2 = Gutt_lyst_hår_og_briller;
  let bilde3 = Gutt_brunt_hår;
  let bilde4 = Gutt_brunt_hår_og_bart;
  let bilde5 = Jente_lyst_hår;
  let bilde6 = Jente_brunt_hår;

  useEffect(() => {
    async function getValues() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if (document.data().id === currentBruker.uid) {
          setBio(document.data().bio);
          setUserName(document.data().UserName);
          setUserTag(document.data().UserTag);
          setCountry(document.data().country);
        }
      });
    }
    getValues();
  });

  useEffect(() => {
    async function hentBilde() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if (document.data().id === currentBruker.uid) {
          if (document.data().profilePicture === "Gutt_lyst_hår") {
            setBilde(bilde1);
          } else if (
            document.data().profilePicture === "Gutt_lyst_hår_og_briller"
          ) {
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
  });

  async function handleLoggut() {
    setError("");

    try {
      await loggUt();
      history.push("/login");
    } catch {
      setError("Klarte ikke å logge ut");
    }
  }

  return (
    <div style={profileStyle.body}>
      <div class="row">
        <Card style={profileStyle.profileCard}>
          <Card.Body>
            <Card.Title> </Card.Title>
            <Card.Text>
              <p id="h1">
                {" "}
                {userTag} <br></br>
                {userName} <br></br>
              </p>

              <p id="h2">
                Favourite country: {country}
                <br></br>
                <br></br>{" "}
              </p>
              <p id="h3">{bio}</p>
            </Card.Text>
          </Card.Body>

          <div id="Update" style={profileStyle.bioPart}>
            <a href="/update-profile" className="btn btn-primary w-100 mt-3">
              UPDATE PROFILE
            </a>
          </div>
          <div id="LogOut" className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLoggut}>
              LOG OUT
            </Button>
          </div>
        </Card>
        <div style={profileStyle.myCards}>
          <MyPost />
          {/* <SearchRoute setSearchCountries={setSearchCountries} handleFilter={handleSearch} />
      <TravelCardList searchCountries={searchCountries} boolAdd={boolAdd} filter={filter} todos={todos} toggleTodo={toggleTodo}  updateTravelCards={getDocFromFirestore}/> */}
        </div>
      </div>
    </div>
  );
}
