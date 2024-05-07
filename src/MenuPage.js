import React from 'react';
import menuImage from './image/sample_menu.jpg'; // Ensure the path is correct

const MenuPage = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // This makes the container take full height of the viewport
        padding: '60px 10px 10px', // Adjust top padding if the navbar overlaps the image
      }}>
        <img src={menuImage} alt="Menu" style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain' // Ensures the image is resized to fit while maintaining aspect ratio
        }} />
      </div>
    );
  };
  
  export default MenuPage;

