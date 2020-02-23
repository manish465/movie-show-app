import React from "react";
import "./header.css";

const Header = () => {
    return (
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <img src="./images/reactMovie_logo.png" className="rmdb-logo" />
                <img src="./images/tmdb_logo.png" className="rmdb-tmdb-logo" />
            </div>
        </div>
    );
};

export default Header;
