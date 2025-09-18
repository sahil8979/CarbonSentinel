import React, { useState } from "react";
import "./navbar.css";

import brandLogo from "../../assets/carbonsentinellogo.png";
import settingsIcon from "../../assets/settings.png";
import bellIcon from "../../assets/notification.png";
import profileImg from "../../assets/logoimg.jpeg";

interface NavbarProps {
  onLogout: () => void; // ✅ get logout handler from App
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-left">
          <img src={brandLogo} alt="brand" className="brand-logo" />
          <div className="brand-text">CarbonSentinals</div>
        </div>
        <div className="top-right-icons">
          <img src={settingsIcon} alt="settings" className="top-icon" />
          <img src={bellIcon} alt="notifications" className="top-icon" />

          {/* Profile with dropdown */}
          <div
            className="profile-dropdown"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img src={profileImg} alt="profile" className="top-profile" />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={onLogout}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
