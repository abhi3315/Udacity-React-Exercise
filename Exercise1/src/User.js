import React from 'react';

/*
We can make this a Stateless Functional Component because this element doesn't
need to hold its own state.
*/
const User = props => {
  //return JSX
  return (
    <li className="user">
      <p>Username: {props.user.username}</p>
      <p>Number of Games Played: {props.showGamesPlayed ? props.user.numGamesPlayed : '*'}</p>
    </li>
  );
};

export default User;
