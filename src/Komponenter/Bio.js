import React, { useState } from 'react';
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";



const UpdateBioForm = ({ docId }) => {
  const { currentBruker } = useAuth();

  const [newBio, setNewBio] = useState('');

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();

    // Get a Firestore reference to the document we want to update
    const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if (document.data().id === currentBruker.uid)
        {updateDoc(doc(db, "users", document.id), {
            bio: newBio,
          }
          );}});

    // Call the `update` method on the document reference with the new data
    

    // Clear the input field
    setNewBio('');
  };

  return (
    <form onSubmit={handleBioSubmit}>
      <label htmlFor="bio">Bio:</label>
      <input type="text" id="bio" value={newBio} onChange={handleBioChange} />
      <button type="submit">Update Bio</button>
    </form>
  );
};

export default UpdateBioForm;