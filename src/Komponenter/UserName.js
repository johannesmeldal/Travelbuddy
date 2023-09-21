import React, { useState } from 'react';
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";



const UpdateUserNameForm = ({ docId }) => {
  const { currentBruker } = useAuth();

  const [newUserName, setNewUserName] = useState('');

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleUserNameSubmit = async (e) => {
    e.preventDefault();

    // Get a Firestore reference to the document we want to update
    const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if (document.data().id === currentBruker.uid)
        {updateDoc(doc(db, "users", document.id), {
            UserName: newUserName,
          }
          );}});

    // Call the `update` method on the document reference with the new data
    

    // Clear the input field
    setNewUserName('');
  };

  return (
    <form onSubmit={handleUserNameSubmit}>
      <label htmlFor="UserName">UserName:</label>
      <input type="text" id="UserName" value={newUserName} onChange={handleUserNameChange} placeholder="Ola Normann" />
      <button type="submit">Update UserName</button>
    </form>
  );
};

export default UpdateUserNameForm;