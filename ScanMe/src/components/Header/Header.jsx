import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons/icons";
import "./Header.css";
import Hambermenuoptions from "../Hambermenuoptions/Hambermenuoptions";

function Header({ onSearchChange, isMenu }) {
  const navigate = useNavigate();
  const [option, setOption] = useState(false);
  const handleMenuoption = () => {
    setOption(true);
  };

  return (
    <>
      {isMenu ? <></> : <h2 className="heading">France Restaurant</h2>}

      <div className="header">
        {option ? (
          <></>
        ) : (
          <img
            src={icons.menuicon}
            alt="Menu"
            onClick={handleMenuoption}
            className="menu-icon"
          />
        )}

        {option && <Hambermenuoptions setopt={setOption} />}
        {isMenu ? (
          <div className="items-details-navbar-name">France Restaurant</div>
        ) : (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              onChange={onSearchChange}
            />
            <img src={icons.searchicon} alt="Search" className="search-icon" />
          </div>
        )}

        <img
          src={icons.pallet_icon}
          onClick={() => navigate("/added-items")}
          alt="Filter"
          className="pallet-icon"
        />
      </div>
    </>
  );
}

export default Header;
