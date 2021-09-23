import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Toast,
  ToastBody,
  ToastHeader,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav
} from "reactstrap";

function Home() {
  const [displayTime, setDisplayTime] = useState(() => {
    const saved = localStorage.getItem("recent");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [elapse, setElapse] = useState("");
  const [colorChange, setColorChange] = useState("");
  const [buttonStatus, setButtonStatus] = useState('"warning" disabled');

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(displayTime));
    const interval = setInterval(() => {
      setElapse(convertMilliseconds());
      setColorChange(colorString());
    }, 1000);
    return () => clearInterval(interval);
  });

  var lastRecorded = new Date(displayTime[displayTime.length - 1]);
  var currentTime = new Date();
  var elapseTime = currentTime - lastRecorded;

  const recordTime = () => {
    const newStamp = new Date();
    setDisplayTime(arr => [...arr, newStamp.toLocaleString()]);
    updateCurrentTime();
    setElapse();
    localStorage.getItem("recent");
  };

  const updateCurrentTime = () => {
    currentTime = Date.now();
  };

  const colorString = () => {
    let counter = 255;
    if (elapseTime < 255000) {
      counter = Math.floor(elapseTime / 1000);
    }
    return "rgb(" + counter + ", 255, 255)";
  };

  const convertMilliseconds = () => {
    const days = 86400000,
      hours = 3600000,
      minutes = 60000,
      seconds = 1000;

    let numDays = 0,
      numHours = 0,
      numMinutes = 0,
      numSeconds = 0;

    if (elapseTime > 0) {
      let numLeft = elapseTime;
      if (numLeft > 86400000) {
        numDays = Math.floor(numLeft / days);
        numLeft = numLeft - numDays * days;
      }
      if (numLeft > 3600000) {
        numHours = Math.floor(numLeft / hours);
        numLeft = numLeft - numHours * hours;
      }
      if (numLeft > 60000) {
        numMinutes = Math.floor(numLeft / minutes);
        numLeft = numLeft - numMinutes * minutes;
      }
      if (numLeft > 1000) {
        numSeconds = Math.floor(numLeft / seconds);
      }
    }
    return (
      numDays +
      " days " +
      numHours +
      " hours " +
      numMinutes +
      " minutes " +
      numSeconds +
      " seconds "
    );
  };

  const deleteRecent = () => {
    localStorage.setItem("deleted", displayTime[displayTime.length - 1]);
    displayTime.splice(displayTime.length - 1);
    localStorage.setItem("recent", JSON.stringify(displayTime));
    setButtonStatus('"warning" active');
  };

  const recoverDeleted = () => {
    let recover = localStorage.getItem("deleted");
    setDisplayTime(arr => [...arr, recover]);
    setButtonStatus('"warning" disabled');
  };

  const clearLog = () => {
    setDisplayTime([]);
    elapseTime = 0;
  };

  // console.log(
  //   "\nlast recorded: " + lastRecorded +
  //   "\ncurrent Time:  " + currentTime +
  //   "\nelapsed time:  " + elapseTime +
  //   "\nDISPLAY        " + displayTime[displayTime.length -1] +
  //   "\nconversion " + convertMilliseconds() +
  //   "\nColor String: " + colorChange
  //   );

  // console.log("displayTime array: " + displayTime);
  // console.log("button status: " + buttonStatus);

  return (
    <div>
      <Navbar className="NavBar" color="dark" light expand="md">
        <NavbarBrand className="text-white" href="/">
          {" "}
          Time Keeping
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="mr-auto" navbar></Nav>
        </Collapse>
      </Navbar>
      <div className="welcome">
        <div className="button-board" style={{ color: colorChange }}>
          <Button className="log-button" color="light" onClick={recordTime}>
            Log Time Now
          </Button>

          <div></div>
          <div className="elapse">
            <p>Time since last log:</p>
            <p> {elapse}</p>
          </div>
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
        <Button className="warning" color="dark" onClick={clearLog}>
          {" "}
          Clear Storage
        </Button>
        <Button className="warning" color="dark" onClick={deleteRecent}>
          Delete Recent
        </Button>
        <Button className={buttonStatus} color="dark" onClick={recoverDeleted}>
          Recover Recent
        </Button>
      </div>
    </div>
  );
}

export default Home;
