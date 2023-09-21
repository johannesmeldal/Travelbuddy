import React, { useState } from 'react';
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";



const UpdateCountryForm = ({ docId }) => {
  const { currentBruker } = useAuth();
  const [newCountry, setNewCountry] = useState('');

  const handleCountryChange = (e) => {
    setNewCountry(e.target.value);
  };

  const handleCountrySubmit = async (e) => {
    e.preventDefault();

    // Get a Firestore reference to the document we want to update
    const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if (document.data().id === currentBruker.uid)
        {updateDoc(doc(db, "users", document.id), {
            country: newCountry,
          }
          );}});

    // Call the `update` method on the document reference with the new data
    

    // Clear the input field
    setNewCountry('');
  };

  return (
    <form onSubmit={handleCountrySubmit}>
      <label htmlFor="Country">Favourite Country:</label>
      <input type="text" id="Country" value={newCountry} onChange={handleCountryChange} />
      
      <button type="submit">Update Country</button>
    </form>
  );
};

export default UpdateCountryForm;