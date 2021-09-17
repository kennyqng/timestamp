import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { Collapse, Navbar, NavbarBrand, Nav, NavbarText } from "reactstrap";

function Home() {
  const [displayTime, setDisplayTime] = useState(() => {
    const saved = localStorage.getItem("recent");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  
  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(displayTime));
  });
  
  var lastRecorded = new Date(displayTime[displayTime.length-1]);
  var currentTime = new Date();
  var elapseTime =  currentTime - lastRecorded;

  const recordTime = () => {
    const startDate = new Date();
    setDisplayTime(arr => [...arr, startDate.toString()]);
    updateTime();
    localStorage.getItem("recent");
  };
  
  const updateTime = () => {
    currentTime = Date.now();
  };
  
  
  const convertMili = (t) => {
    const days = 86400000,
    hours = 3600000,
    minutes = 60000,
    seconds = 1000;
    
    let numDays = 0;
    let numHours = 0;
    let numMinutes = 0;
    let numSeconds = 0;
    
    if (t > 0) {
      let numLeft = t;
      if (numLeft > 86400000)
      {
        numDays = Math.floor(t/days);
        numLeft = numLeft - (numDays * days);
      };
      if (numLeft > 3600000) {
        numHours = Math.floor (numLeft/hours);
        numLeft = numLeft - (numHours * hours);
      };
      if (numLeft > 60000) {
        numMinutes = Math.floor (numLeft/minutes);
        numLeft = numLeft - (numMinutes * minutes);
      };
      if (numLeft > 1000) {
        numSeconds = Math.floor (numLeft/seconds);
      };
    };
    return numDays + " days " + numHours + " hours " + numMinutes + " minutes " + numSeconds + " seconds ";
  };
  
  
  const clearLog = () => {
    setDisplayTime([]);
    elapseTime = 0;
  };

  console.log(
    "\nlast recorded: " + lastRecorded + 
    "\ncurrent Time:  " + currentTime + 
    "\nelapsed time:  " + elapseTime + 
    "\nDISPLAY        " + displayTime[displayTime.length -1] +
    "\nconversion " + convertMili(elapseTime)
    );
  
  
  return (
    <div>
      <Navbar className="NavBar" color="light" light expand="md">
        <NavbarBrand className="Brand" href="/"> Keeping Time</NavbarBrand>
        <Collapse navbar>
          <Nav className="mr-auto" navbar></Nav>
        </Collapse>
      </Navbar>
      <div className="welcome">
        <div className="button-board">
          <Button className="warning" color="warning" onClick={recordTime}>
            Log Time Now
          </Button>
          <p>Time since last log:</p><p> {convertMili(elapseTime)}</p>
          {/* <p>current time:</p><p> {currentTime.toString()}</p>
          <p>last recorded: </p><p> {lastRecorded.toString()}</p> */}
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
        <Button color="danger" className="clear" onClick={clearLog}>
          {" "}
          Clear Storage
        </Button>
      </div>
    </div>
  );
}

export default Home;
