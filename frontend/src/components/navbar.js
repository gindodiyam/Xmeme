import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-primary">
      <a className="navbar-brand text-light bold m-2" href="#">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqUbBCqntSjIS96_wttJyLbiDRZtv3IJDxjA&usqp=CAU"
          width="30"
          height="30"
          className="d-inline-block align-top mr-3"
          alt=""
        />
        Xmeme
      </a>
      <a
        className="navbar-brand bg-success text-light mb-3 p-2"
        href="https://mayan-gindodiya-portfolio.netlify.app/"
        target="blank"
      >
        Developer's portfolio
      </a>
    </nav>
  );
};

export default NavBar;
