import React, { useState } from 'react';
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";



const UpdateUserTagForm = ({ docId }) => {
  const { currentBruker } = useAuth();

  const [newUserTag, setNewUserTag] = useState('');

  const handleUserTagChange = (e) => {
    setNewUserTag(e.target.value);
  };

  const handleUserTagSubmit = async (e) => {
    e.preventDefault();

    // Get a Firestore reference to the document we want to update
    const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if (document.data().id === currentBruker.uid)
        {updateDoc(doc(db, "users", document.id), {
            UserTag: newUserTag,
          }
          );}});

    // Call the `update` method on the document reference with the new data
    

    // Clear the input field
    setNewUserTag('');
  };

  return (
    <form onSubmit={handleUserTagSubmit}>
      <label htmlFor="UserTag">UserTag:</label>
      <input type="text" id="UserTag" value={newUserTag} onChange={handleUserTagChange} placeholder="The Backpacker" />
      <button type="submit">Update UserTag</button>
    </form>
  );
};

export default UpdateUserTagForm;