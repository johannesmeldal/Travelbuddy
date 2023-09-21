import React, { useState, useEffect } from "react";

// import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

import MyTravelCardList from "./MyTravelCardList";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function Dashboard() {
  const [boolAdd] = useState(false);
  // const [boolSok, isTrueSok] = useState(false);

  const dashBoardStyle = {
    body: {
      textallign: "center",
      height: "100%",
      width: "100%",
      top: "0",
      left: "0",
      zIndex: "1",
      filter: boolAdd ? "blur(10px)" : "none",
    },
    containerstyle: {
      position: "fixed",
      top: "250px",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      fontSize: "1.2rem",
      fontWeight: "300",
      lineHeight: "1.5",
      overflow: "hidden",
      alignContent: "center",
      zIndex: "2",
      display: boolAdd ? "flex" : "none",
      transition: "all 1s ease-in-out",
    },
    input: {
      width: "250px",
      height: "50px",
      border: "none",
      outline: "none",
      fontSize: "1.2rem",
      fontWeight: "300",
      lineHeight: "1.5",
      overflow: "hidden",
      backgroundColor: "white",
      color: "#333",
      fontFamily: "sans-serif",
      borderBottom: "1px solid #333",
      marginBottom: "10px",
      transition: "all 0.5s ease-in-out",
    },
    button: {
      color: "red",
    },
    filter: {
      top: "8%",
      position: "fixed",
      right: "50%",
      zIndex: "2",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
    soke: {
      top: "8%",
      position: "fixed",
      right: "35%",
      backgroundColor: "green",
      zIndex: "1",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
  };
  const [todos, setTodos] = useState([]);
  // const { currentBruker } = useAuth();
  // const [countries, addCountry] = useState([]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) getDocFromFirestore();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // function handleAddTodo() {
  //   const tit = title;
  //   const countryArray = countries;
  //   const countryCount = countryArray.length;
  //   const countryA = [];
  //   for (let index = 0; index < countryCount; index++) {
  //     countryA.push(countries[index].currCountry);
  //   }
  //   const desc = description;
  //   const creatorName = getUserName(currentBruker.email);
  //   if (countryCount === 0) return; // hvis input er tom, returner
  //   if (desc === "") return; // hvis input er tom, returner
  //   if (title === "") return; // hvis input er tom, returner
  //   addDoc(collection(db, "innlegg"), {
  //     title: tit,
  //     countryArray: countryA,
  //     countryCount: countryCount,
  //     description: desc,
  //     creator: creatorName,
  //     creatorID: currentBruker.uid,
  //     userLikes: [],
  //   }).catch((error) => {
  //     console.log("Something went wrong with added user to firestore: ", error);
  //   });
  //   getDocFromFirestore();
  //   handleClickAdd();
  //   deleteRouteInput();
  // }

  // function deleteRouteInput() {
  //   setDescription(""); // null setter input tilbake til tom
  //   setTitle("");
  //   setNewCountry("");
  //   addCountry([]);
  //   setcCount(0);
  // }

  // function deleteSokInput() {
  //  // null setter input i søket tilbake til tomt
  // }

  //Legger inn data fra firestore i travelcards
  async function getDocFromFirestore() {
    const q = query(collection(db, "innlegg"));
    const querySnapshot = await getDocs(q);

    setTodos([]);

    querySnapshot.forEach((doc) => {
      setTodos((tC) => {
        return [
          ...tC,
          {
            id: doc.id,
            title: doc.data().title,
            countryCount: doc.data().countryCount,
            countries: doc.data().countryArray,
            description: doc.data().description,
            creator: doc.data().creator,
            complete: false,
          },
        ];
      });
    });

    return querySnapshot;
  }

  // const [setcCount] = useState(0);
  // const countryRef = useRef();
  // const [boolForm, show] = useState(false);

  // function handleForm() {
  //   if (cCount === 0) {
  //     show(!boolForm);
  //   }
  //   setcCount(cCount + 1);
  //   if (newCountry === "") return; // hvis input er tom, returner
  //   addCountry([...countries, { id: uuidv4(), currCountry: newCountry }]);
  //   setNewCountry("");
  // }

  // function handleClickAdd() {
  //   if (boolAdd === false) {
  //     deleteRouteInput();
  //   }
  //   isTrueAdd(!boolAdd);
  // }

  // function handleClickSok() {
  //   isTrueSok(!boolSok);
  //   console.log(boolSok);
  // }

  // function buttonChange() {
  //   if (boolForm === false) {
  //     return "Add A Country!";
  //   } else {
  //     return "Add Next Country!";
  //   }
  // }

  // function getUserName(u) {
  //   const cr = u.split("@");
  //   const creatorName = cr[0];
  //   return creatorName;
  // }

  // function handleSetTypeRecommended() {
  //   setFilter("recommended");
  // }

  // function handleSetTypeMine() {
  //   setFilter("mine");
  // }

  // function handleSetTypeAll() {
  //   setFilter("all");
  // }

  // function handleSearch() {
  //   setFilter("search");
  // }

  const [searchCountries] = useState([]); // array for søk

  // const [setFilter] = useState("all");

  // const handleClickAway = () => {
  //   isTrueAdd(false);
  //   deleteRouteInput();
  // };

  // const handleClickAwaySok = () => {
  //   isTrueSok(false);
  //   // deleteSokInput()
  // };

  // const [setTitle] = useState("");
  // const [setNewCountry] = useState("");
  // const [setDescription] = useState("");

  // function countryString() {
  //   return countries.map((c) => {
  //     if (countries.indexOf(c) === 0) {
  //       return <></>;
  //     } else if (countries.indexOf(c) === countries.length - 1) {
  //       return <></>;
  //     }
  //     return <></>;
  //   });
  // }

  // function CountrySelector() {
  //   const [value, setValue] = useState("");
  //   const options = useMemo(() => countryList().getData(), []);

  //   const changeHandler = (value) => {
  //     setValue(value);
  //   };

  //   return <Select options={options} ref={countryRef} value={value} onChange={changeHandler} />;
  // }

  return (
    <>
      <div style={dashBoardStyle.body}>
        <MyTravelCardList
          searchCountries={searchCountries}
          boolAdd={boolAdd}
          filter={"mine"}
          todos={todos}
          toggleTodo={toggleTodo}
          updateTravelCards={getDocFromFirestore}
        />
      </div>
    </>
  );
}
