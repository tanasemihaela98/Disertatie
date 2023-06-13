import React, { useState } from "react";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  let token = JSON.parse(window.localStorage.getItem("user-info"));

  //logout
  async function logout(e) {
    e.preventDefault();
    if (localStorage.getItem('user-info')) {
      localStorage.removeItem("user-info"); alert('Logged out'); window.location.reload();
    }
    else alert('Error at logout');
    //alert(password);
    let result = await fetch("http://127.0.0.1:8081/api/logout", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.data.token
      },

    })
  }
  //logout


  let nume = JSON.parse(window.localStorage.getItem("user-info"));
  console.log('localstore', JSON.parse(window.localStorage.getItem("user-info")));
  //console.log(nume);
  if (nume === null) nume = "";

  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
        PracticaRoweb2022
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="/" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="/gallery" className="nav__link">
            Gallery
          </a>
        </li>
        <li className="nav__item">
          <a href="contact" className="nav__link">
            Contact
          </a>
        </li>
        {
          nume != null && nume.data && nume.data.user && 
          <li className="nav__item">
            <a href="cart" className="nav__link">
              My cart
            </a>
          </li>
        }
        <li className="nav__item">
          <a href="update-profile" className="nav__link">
            {nume != null && nume.data && nume.data.user && <span>{nume.data.user.name}</span>}
          </a>
        </li>
        {
          nume.data == null &&
          <li className="nav__item">
            <a href="auth" className="nav__link">
              Login
            </a>
          </li>
        }
        {
          nume !== null && nume.data && nume.data.user &&
          <li className="nav__item">
            <a href="#" className="nav__link" onClick={logout}>
              Logout
            </a>
          </li>
        }

      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;