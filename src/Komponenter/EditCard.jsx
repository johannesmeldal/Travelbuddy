import { Box } from '@mui/material'
// import { Button } from 'react-bootstrap'
import Button from '@mui/material/Button';
import { Grid, TextField} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AdjustIcon from '@mui/icons-material/Adjust';
import React, {useState } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from "../firebase"
import { doc, updateDoc } from "firebase/firestore";

export default function EditCard({travelInfo, setEditPage, updateTravelCards}) {

    const [title, setTitle] = useState(travelInfo.title);
    const [description, setDescription] = useState(travelInfo.description);
    const [descriptionBool, setDescriptionBool] = useState(true);
    const [titleBool, setTitleBool] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "innlegg", travelInfo.id);
        if (title === '') {
            setTitleBool(false);
            return;
        }
        if (description === '') {
            setDescriptionBool(false);
            return;
        }
        await updateDoc(docRef, {
            title: title,
            description: description,
            // countryArray: countriez
          });
        // setNewCountry('');
        setTitle('');
        setDescription('');
        setEditPage(false);
        updateTravelCards();
        console.log("Updated");
        setDescriptionBool(true);
        setTitleBool(true);
    };

    // function checkDescription() {
    //     if (description === '') {
    //         setDescriptionBool(false);
    //     }
    // }

    // function checkTitle() {
    //     if (title === '') {
    //         setTitleBool(false);
    //     }
    // }

    // useEffect(() => {
    //     checkDescription();
    //     checkTitle();
    // }, [description, title])

    function getArray() {
        const countryString = travelInfo.countries.join(",");
        const countryArray = countryString.split(",");
        return countryArray.map((c, i) => {
            return (
                <p style={{textAlign: 'center', color: 'gray'}}><AdjustIcon/> {c}</p>
            )
        })
    }

 
  return (
    <Box
        sx={{
            width: '100%',
            display: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'scroll',
            height: '100%',
        }}
    >
        <Grid container>
            <Grid item xs={20}>
                <Grid  container spacing={10}>
                    <Grid item xs={6}>
                        <p>Edit <BorderColorIcon/> </p>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleSubmit} >Save</Button>
                    </Grid>
                </Grid>
                <hr />
            </Grid>
            <Grid item xs={20}>
                {titleBool ? <TextField id="outlined-basic" value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" /> : <TextField error id="outlined-error" value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" />}
                <hr />
            </Grid>
            <Grid item xs={20} >
                {getArray()}
            </Grid>
            <Grid item xs={20}>
                <hr />
                {descriptionBool ? <TextField id="outlined-basic" value={description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined"  multiline rows={3} /> : <TextField error id="outlined-error" value={description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" multiline rows={3}/>}    
            </Grid>
        </Grid>
    </Box>



  )
}

// const [newCountry, setNewCountry] = useState('');

// const [countriez, setCountry] = useState(getArray());

// function displayCountries() {
//     let i = 0;
//     return countriez.map(c =>  {
        
//         return (
//             <Button height="20px" width="500px" key={i++} onClick={removeCountry(c)}>
//                 {c}
//             </Button>
//             <>
//             <Grid  container spacing={2}>
//                 <Grid item xs={6}>
//                     <p>{c}</p>
//                 </Grid>
//                 <Grid item xs={2}>
//                 </Grid>
//             </Grid>
//             </>
//     )}
//     )
// }

// hei
//             { countriez.map( (c,i=0) =>  {
//                 console.log(typeof c);
//             return (
//                 <button height="20px" width="500px" key={i++} onClick={() => removeCountry(c)}>
//                     {c}
//                 </button>
//         )}
//         )}


// function addCountry() {
//     setCountry([...countriez, newCountry]);
//     setNewCountry('');
// }

// function removeCountry(k) {
//     const arrey = countriez;
//     const index = arrey.indexOf(k);
//     arrey.splice(index, 1);
//     // arrey.pop();
//     setCountry(arrey);
//     console.log(arrey);
//     console.log(countriez.length);
// }

// function handleAddCountry() {
//     if (newCountry === '') return // hvis input er tom, returner
//     console.log(newCountry + '$$$$$$');
//     addCountry([...countriez, {newCountry}])
//     console.log(countriez);
//     setNewCountry('')
//   }

//     const [addCIsVisible, setAddCIsVisible] = useState(false);

//     function toggleAddCountry() {
//         setAddCIsVisible(!addCIsVisible);
//     }

//     setCountry([...countries, {id: countries.length + 1, Country: ''}])

/* <IconButton onClick={toggleAddCountry} color="primary" aria-label="Add country">
<AddCircleIcon />
</IconButton> 
<IconButton onClick={removeCountry} color="primary" aria-label="subtractCountry">
<RemoveCircleIcon />
</IconButton>
<Grid  container spacing={2} style={{display: addCIsVisible ? 'flex' : 'none'}}>
    <Grid item xs={6}>
        <TextField  id="outlined-basic" value={newCountry} onChange={(e) => setNewCountry(e.target.value)} label="Add new country" variant="outlined" />
    </Grid>
    <Grid item xs={2}>
        <Button onClick={handleAddCountry}>Add</Button>
    </Grid>
</Grid> */