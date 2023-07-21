import React from 'react';

const MainMenu = () => {
  const handleMenuClick = (menuItem) => {
    console.log(`Clicked on ${menuItem}`);
  };

  return (
    <div>
      <h2>Main Menu</h2>
      <ul>
        <li onClick={() => handleMenuClick('Home')}>Home</li>
        <li onClick={() => handleMenuClick('About')}>About</li>
        <li onClick={() => handleMenuClick('Contact')}>Contact</li>
      </ul>
    </div>
  );
};

export default MainMenu;
