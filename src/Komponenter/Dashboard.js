import AddButton from "./AddButton";
import uuidv4 from "uuid/v4";
import React, { useState, useEffect } from "react";
import { Form, Dropdown } from "react-bootstrap";
import TravelCardList from "./TravelCardList";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { TextField, Box, ClickAwayListener, Grid, Button } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { FaFlagCheckered } from "react-icons/fa";
import { GiFallDown } from "react-icons/gi";
import SearchRoute from "./SearchRoute";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function Dashboard() {
  const [boolAdd, isTrueAdd] = useState(false);

  const dashBoardStyle = {
    body: {
      textallign: "center",
      height: "100%",
      width: "100%",
      top: "0",
      left: "0",
      zIndex: "1",
      filter: boolAdd ? "blur(10px)" : "none",

      // transition: "all 0.5s ease-in-out"
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
  const { currentBruker } = useAuth();
  const [countries, addCountry] = useState([]);

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

  function handleAddTodo() {
    const tit = title;
    const countryArray = countries;
    const countryCount = countryArray.length;
    const countryA = [];
    for (let index = 0; index < countryCount; index++) {
      countryA.push(countries[index].currCountry);
    }
    const desc = description;
    const creatorName = getUserName(currentBruker.email);
    if (countryCount === 0) return; // hvis input er tom, returner
    if (desc === "") return; // hvis input er tom, returner
    if (title === "") return; // hvis input er tom, returner
    addDoc(collection(db, "innlegg"), {
      title: tit,
      countryArray: countryA,
      countryCount: countryCount,
      description: desc,
      creator: creatorName,
      creatorID: currentBruker.uid,
      userLikes: [],
    }).catch((error) => {
      console.log("Something went wrong with added user to firestore: ", error);
    });
    getDocFromFirestore();
    handleClickAdd();
    deleteRouteInput();
  }

  function deleteRouteInput() {
    setDescription(""); // null setter input tilbake til tom
    setTitle("");
    setNewCountry("");
    addCountry([]);
    setcCount(0);
  }

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

  const [cCount, setcCount] = useState(0);
  // const countryRef = useRef();
  const [boolForm, show] = useState(false);

  function handleForm() {
    if (cCount === 0) {
      show(!boolForm);
    }
    setcCount(cCount + 1);
    if (newCountry === "") return; // hvis input er tom, returner
    addCountry([...countries, { id: uuidv4(), currCountry: newCountry }]);
    setNewCountry("");
  }

  function handleClickAdd() {
    if (boolAdd === false) {
      deleteRouteInput();
    }
    isTrueAdd(!boolAdd);
  }

  function buttonChange() {
    if (boolForm === false) {
      return "Add A Country!";
    } else {
      return "Add Next Country!";
    }
  }

  function getUserName(u) {
    const cr = u.split("@");
    const creatorName = cr[0];
    return creatorName;
  }

  function handleSetTypeRecommended() {
    setFilter("recommended");
  }

  function handleSetTypeMine() {
    setFilter("mine");
  }

  function handleSetTypeAll() {
    setFilter("all");
  }

  function handleSearch() {
    setFilter("search");
  }

  const [searchCountries, setSearchCountries] = useState([]); // array for søk

  const [filter, setFilter] = useState("all");

  const handleClickAway = () => {
    isTrueAdd(false);
    deleteRouteInput();
  };

  // const handleClickAwaySok = () => {
  //   isTrueSok(false);
  //   // deleteSokInput()
  // };

  const [title, setTitle] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [description, setDescription] = useState("");

  function countryString() {
    return countries.map((c) => {
      if (countries.indexOf(c) === 0) {
        return (
          <>
            <TimelineItem>
              <TimelineOppositeContent sx={{ flex: 0, color: "black" }}>
                <GiFallDown />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={{ color: "black" }} key={uuidv4}>
                {c.currCountry}{" "}
              </TimelineContent>
            </TimelineItem>
          </>
        );
      } else if (countries.indexOf(c) === countries.length - 1) {
        return (
          <>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ flex: 0, color: "black", marginleft: "10px" }}
              >
                {" "}
                <FaFlagCheckered />{" "}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="error" />
              </TimelineSeparator>
              <TimelineContent style={{ color: "black" }} key={uuidv4}>
                {c.currCountry}{" "}
              </TimelineContent>
            </TimelineItem>
          </>
        );
      }
      return (
        <>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ flex: 0.1 }}
              color="textSecondary"
            ></TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ color: "black" }} key={uuidv4}>
              {c.currCountry}{" "}
            </TimelineContent>
          </TimelineItem>
        </>
      );
    });
  }

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
      <AddButton handleClick={handleClickAdd} />
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        {boolAdd ? (
          <Box
            style={dashBoardStyle.containerstyle}
            sx={{
              borderRadius: "16px",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "50px",
              background: "transparent",
              left: "20%",
            }}
          >
            <Box
              sx={{
                width: 300,
                height: 500,
                border: 5,
                borderColor: "lightgrey",
                backgroundColor: "beige",
                borderRadius: "16px",
                boxShadow: 3,
              }}
            >
              <Box>
                <h3 style={{ color: "black", margin: "7%" }}>
                  {boolAdd ? "Current Route" : "Route will Appear here"}
                </h3>
                <Timeline
                  sx={{
                    overflowX: "scroll",
                    overflowY: "scroll",
                  }}
                  align="left"
                >
                  {countryString()}
                </Timeline>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                width: 500,
                height: 500,
                backgroundColor: "white",
                borderRadius: "16px",
                display: "grid",
                gridTemplateColumns: "1fr",
                gridGap: "5px",
                boxShadow: 3,
                border: 5,
                borderColor: "orange",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  borderColor: "black",
                },
                "& > *": {
                  padding: "30px",
                },
              }}
            >
              <Grid container spacing={0.5} sx={{ left: "10px" }}>
                <Grid>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    multiline
                    maxRows={4}
                  />
                </Grid>
                <Grid>
                  <div></div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid>
                  <TextField
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    id="outlined-textarea"
                    label={boolForm ? "Next country" : "Tell Us Your Route!"}
                    placeholder={
                      boolForm ? "Country..." : "Route started in..."
                    }
                    multiline
                  />
                  {/* <CountrySelector /> */}
                </Grid>
                <Grid>
                  <Button
                    sx={{
                      top: "7px",
                      left: "20px",
                      color: "white",
                      backgroundColor: "grey",
                      "&:hover": { backgroundColor: "lightgrey" },
                    }}
                    onClick={handleForm}
                    variant="contained"
                    size="medium"
                  >
                    {buttonChange()}
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid>
                  <TextField
                    id="outlined-multiline-static"
                    label="Describe your route!"
                    multiline
                    rows={4}
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <Button
                    sx={{
                      backgroundColor: "gray",
                      top: "90px",
                      left: "80px",
                      "&:hover": { backgroundColor: "green" },
                    }}
                    variant="contained"
                    onClick={handleAddTodo}
                    size="large"
                  >
                    {" "}
                    Add route{" "}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </ClickAwayListener>
      <div style={dashBoardStyle.body}>
        <Dropdown className="dark" style={dashBoardStyle.filter}>
          <Dropdown.Toggle variant="success">
            Filter Travel Cards
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Type to filter..."
              onChange={(e) => setFilter(e.target.value)}
            />
            <Dropdown.Item onClick={handleSetTypeAll}>
              Show all Travel Cards
            </Dropdown.Item>
            <Dropdown.Item onClick={handleSetTypeMine}>
              Show my Travel Cards
            </Dropdown.Item>
            <Dropdown.Item onClick={handleSetTypeRecommended}>
              Show my recommended Travel Cards
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <SearchRoute
          setSearchCountries={setSearchCountries}
          handleFilter={handleSearch}
        />
        <TravelCardList
          searchCountries={searchCountries}
          boolAdd={boolAdd}
          filter={filter}
          todos={todos}
          toggleTodo={toggleTodo}
          updateTravelCards={getDocFromFirestore}
        />
      </div>
    </>
  );
}
