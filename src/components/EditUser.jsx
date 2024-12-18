// src/components/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { updateUser } from '../axios';

const EditUser = ({ user, setUsers, setEditingUser }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, editedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? response.data : u))
        );
        setEditingUser(null);
      })
      .catch((error) => console.error('Error editing user:', error));
  };

  return (
    <div >
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          required
        />
        
        <div className="button-container">
      <button type="submit">Update</button>
      <button type="button" onClick={() => setEditingUser(null)}>
        Cancel
      </button>
    </div>
  </form>

    </div>
  );
};

export default EditUser;
