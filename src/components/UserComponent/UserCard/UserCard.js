import React from 'react';
import './UserCard.css';

const UserCard = ({ user, selected, onSelect }) => (
  <div className="user-card">
    <input
      type="checkbox"
      checked={selected}
      onChange={() => onSelect(user)}
    />
    <img src={user.picture.thumbnail} alt={user.name.first} />
    <p>{user.name.first} {user.name.last}</p>
    <p>{user.gender}</p>
    <p>{user.location.city}, {user.location.state}</p>
    <p>{user.phone}</p>
    <p>{user.email}</p>
    <p>{user.location.country}</p>
  </div>
);

export default UserCard;
