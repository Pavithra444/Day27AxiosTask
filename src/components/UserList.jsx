// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../axios';
import AddUser from './AddUser';
import EditUser from './EditUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  // Fetch users when the component mounts
  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Handle user deletion
  const handleDelete = (id) => {
    // Confirm before deletion
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

    deleteUser(id)
      .then(() => {
        // Use function form of setUsers to avoid potential async issues
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div>
    
      <AddUser setUsers={setUsers} />
      {editingUser && (
        <EditUser user={editingUser} setUsers={setUsers} setEditingUser={setEditingUser} />
      )}
  <h2>USER LIST</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="user-cards-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <div className="card-actions">
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
