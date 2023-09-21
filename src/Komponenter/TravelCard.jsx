import {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import randomColor from "randomcolor";
import uuidv4 from 'uuid/v4'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent} from '@mui/lab';
import { FaFlagCheckered, FaHeart } from 'react-icons/fa'
import Button from '@mui/material/Button';
import EditCard from './EditCard';
import { doc, deleteDoc, collection, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import "../css/TravelCard.css";
import { useAuth } from "../contexts/AuthContext";
// import { AdminBruker } from "../contexts/AdminBruker";

export default function TravelCard({todo, updateTravelCards}) {

    const { currentBruker } = useAuth();
    const [color, setColor] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setColor(randomColor());
    }, []);

    AdminBruker();


    async function handleLikeClick() {
        const q = query(collection(db, "innlegg"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            if (document.id === todo.id) {
                let likedusers = document.data().userLikes
                likedusers.push(currentBruker.uid)
                const docRef = doc(db, "innlegg", todo.id);
                updateDoc(docRef, {
                    userLikes: likedusers
                });
            }
        });
    }

    async function handleUnlikeClick() {
        const q = query(collection(db, "innlegg"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            if (document.id === todo.id) {
                let likedusers = document.data().userLikes
                // Remove the user from the array
                likedusers = likedusers.filter(function(value, index, arr){
                    return value !== currentBruker.uid;
                });

                const docRef = doc(db, "innlegg", todo.id);
                updateDoc(docRef, {
                    userLikes: likedusers
                });
            }
        });
    }

    const [heartColor, setHeartColor] = useState('#000000');
    useEffect(() => {
        async function getUserLikes() {
            const q = query(collection(db, "innlegg"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((document) => {
                if (document.id === todo.id) {
                    document.data().userLikes.forEach(el => {
                        if (el === currentBruker.uid) {
                            setHeartColor('#ff0000');
                        } else {
                            setHeartColor('#000000');
                        }
                    });
                }
            });
        }

        let ignore = false;
        if (!ignore) {
            getUserLikes();
            } 
        return () => { ignore = true; }
    },[currentBruker.uid, todo.id]);




    function getUserName(u) {
        const cr = u.split('@')
        const creatorName = cr[0]
        return creatorName
      }

    const [editBool, setEditPage] = useState(false);

    function handleDelete(id) {
        const docRef = doc(db, 'innlegg', id);
        deleteDoc(docRef)
        .then(() => {
          console.log("Entire Document has been deleted successfully.")
          updateTravelCards();

          // window.location.reload();
        })
        .catch(error => {
        console.log('Something went wrong with added user to firestore:', error);
        })
      }

    async function AdminBruker() {
        const { currentBruker } = useAuth();
    
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            if (document.data().id === currentBruker.uid) {
                if (document.data().admin === true) {
                    setIsAdmin(true)
                    return true
                } else {
                    setIsAdmin(false)
                    return false
                }
            }
        });
    
        return false
    }

    const cardStyle = {
        travelCard: {
            top : '5%',
            Height: '800px',
            width: '18rem',
            margin: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            fontSize: '1.2rem',
            fontWeight: '300',
            lineHeight: '1.5',
        },
        heartButton: {
            border: 'none',
            color: heartColor,
            fontFamily : 'sans-serif',
            fontSize: '1.8rem',
            fontWeight: '300',
            lineHeight: '1.5',
            overflow: 'hidden'
        },
        description: {
            border: 'none',
            fontSize: '1.2rem',
            fontWeight: '500',
            lineHeight: '1.5',
            overflow: 'hidden',
            padding: '10px',
        },
        route: {
            backgroundColor: 'offwhite',
            border: 'solid 1px #333',
            fontSize: '1.2rem',
            fontWeight: '500',
            lineHeight: '1.5',
            padding: '10px',
            display: 'flex',
            maxHeight: '500px',
            flexDirection: 'column',
        },
        likeButton: {
            backgroundColor: '#FFFFFF', 
            borderRadius: '50%',
            bordersize: '1px',
        }
    };

    function countryString() {
        const countryString = todo.countries.join(",");
        const countryArray = countryString.split(",");
        return (
        countryArray.map((country) => {
            if (country === countryArray[0]) {
                return (
                    <>
                        <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ flex: 0 }}
                        >Start:</TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="success" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent key={uuidv4}>{country} </TimelineContent>
                        </TimelineItem>
                    </>
                )
            } else if (country === countryArray[countryArray.length - 1]) {
                return (
                    <>
                        <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ flex: 0.45 }}
                        > <FaFlagCheckered/> </TimelineOppositeContent>
                        <TimelineSeparator>   
                            <TimelineDot color="error" />
                        </TimelineSeparator>  
                        <TimelineContent key={uuidv4}>{country} </TimelineContent>
                        </TimelineItem>                    
                    </>
                    )
            }
            return (
                <>
                    <TimelineItem>
                    <TimelineOppositeContent
                        sx={{ flex: 0.45 }}
                        color="textSecondary"
                    ></TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent key={uuidv4}>{country} </TimelineContent>
                    </TimelineItem>
                </>
                )
        }))
    }
    if (!editBool) {

    return (
        <Card style={cardStyle.travelCard}>
            <Card.Header  style={{backgroundColor: color}} > 
                {todo.title}
            </Card.Header>
            <Card.Body>
                <Card style={cardStyle.route}>
                    <Timeline sx={{
                            overflowX: 'scroll',
                            overflowY: 'scroll',
                        }} align="left">
                        {countryString()}
                    </Timeline>
                </Card>
                <Card style={cardStyle.description}>
                    Description: <br />
                    {todo.description}
                </Card>
                <hr />
                Creator : {todo.creator}
                <hr />
                <button onClick={
                    () => {
                        if (heartColor === '#000000') {
                            setHeartColor('#FF0000')
                            handleLikeClick()
                        } else {
                            setHeartColor('#000000')
                            handleUnlikeClick()
                        }
                    }
                } style={cardStyle.likeButton}><FaHeart style={cardStyle.heartButton} /></button>

            </Card.Body>
            <Card.Footer>
                {((getUserName(currentBruker.email) === todo.creator) || (isAdmin === true)) &&<Button onClick={() => handleDelete(todo.id)}>Delete</Button>}
                {getUserName(currentBruker.email) === todo.creator &&<Button onClick={() => setEditPage(!editBool)}>Edit</Button>}
            </Card.Footer>
            {/* <Button variant="text" onClick={handleHeartClick} style={cardStyle.heartButton}>{todo.complete ? <BsHeart/> : <BsHeartFill/> }</Button> */}
        </Card>

  )
}
    return (
        <Card style={cardStyle.travelCard}>
            <Card.Body>
                <Card style={cardStyle.route}>
                    <EditCard travelInfo = {todo} setEditPage={setEditPage} updateTravelCards={updateTravelCards}/>
                </Card>
            </Card.Body>
            <Card.Footer>
                <Button onClick={() => setEditPage(!editBool)}>Close</Button>
            </Card.Footer>
            {/* <Button variant="text" onClick={handleHeartClick} style={cardStyle.heartButton}>{todo.complete ? <BsHeart/> : <BsHeartFill/> }</Button> */}
        </Card>
    )
}


        /* <EditCard style={{display: editBool ? 'block' : 'none'}} travelInfo = {todo}/> */
