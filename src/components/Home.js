import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { Collapse, Navbar, NavbarBrand, Nav, NavbarText } from "reactstrap";
import moment from "moment";

function Home() {
  const [displayTime, setDisplayTime] = useState(() => {
    const saved = localStorage.getItem("recent");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const recordTime = () => {
    setDisplayTime(arr => [...arr, moment().format("MMMM Do YYYY h:mm:ss a")]);
    localStorage.getItem("recent");
  };

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(displayTime));
  });

  const clearLog = () => {
    setDisplayTime([]);
  };

  return (
    <div>
      <Navbar className="NavBar" color="light" light expand="md">
        <NavbarBrand className="Brand" href="/"> Keeping Time</NavbarBrand>
        <NavbarText className="clear" onClick={clearLog}>
          {" "}
          Clear Storage
        </NavbarText>
        <Collapse navbar>
          <Nav className="mr-auto" navbar></Nav>
        </Collapse>
      </Navbar>
      <div className="welcome">
        <div className="button-board">
          <Button className="warning" color="warning" onClick={recordTime}>
            Log Time Now
          </Button>
        </div>
        {displayTime
          .slice(0)
          .reverse()
          .map(e => (
            <p>
              <Toast className="">
                <ToastHeader>STAMPED</ToastHeader>
                <ToastBody>{e}</ToastBody>
              </Toast>
            </p>
          ))}
      </div>
    </div>
  );
}

export default Home;
