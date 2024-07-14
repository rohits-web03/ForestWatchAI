import React from 'react';
import './HoverDropdown.css'; // Import the CSS file for styling

const HoverDropdown = () => {
  // State to track whether the dropdown should be shown or hidden
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Function to handle mouse enter (show the dropdown)
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  // Function to handle mouse leave (hide the dropdown)
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="hover-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="dropdown-btn">Hover Me</button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </div>
      )}
    </div>
  );
};

export default HoverDropdown;
