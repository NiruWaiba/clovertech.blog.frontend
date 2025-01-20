 
import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitlesSm">Clover Tech Nepal</span>
        <span className="headerTitlesLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://media.istockphoto.com/id/1368569944/photo/posed-hands-of-adams-creation-full-of-flowers.webp?a=1&b=1&s=612x612&w=0&k=20&c=qSVjNZo8-fPn7B5xji4mFnkYK8xdjaVhmvHGqOdBAXE="
        alt=""
      />
    </div>
  );
};

export default Header;
