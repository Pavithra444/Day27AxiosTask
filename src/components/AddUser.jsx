// src/components/AddUser.jsx
import React, { useState } from 'react';
import { addUser } from '../axios';

const AddUser = ({ setUsers }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUser)
      .then((response) => {
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setNewUser({ name: '', email: '' });
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  return (
    <div>
      <h2>ADD USER</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
