import React, { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  CardText,
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
  const [buttonStatus, setButtonStatus] = useState('warning disabled');

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
    let counter = 0;
    let x = 0;
    if (elapseTime < 255000) {
      counter = 255 - Math.floor(elapseTime / 1000);
    }
    return "rgb(" + x + ", " + counter + ", " + counter + " )";
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
    setButtonStatus("warning");
  };

  const recoverDeleted = () => {
    let recover = localStorage.getItem("deleted");
    setDisplayTime(arr => [...arr, recover]);
    setButtonStatus('warning disabled');
  };

  const clearLog = () => {
    localStorage.setItem("backup", JSON.stringify(displayTime));
    setDisplayTime([]);
    elapseTime = 0;
  };
  const recoverAll = () => {
    let backup = localStorage.getItem("backup");
    setDisplayTime(JSON.parse(backup));
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
        <div className="card-wrap" style={{ color: colorChange }}>
          <Card body>
            <CardTitle tag="h5">Time since last log:</CardTitle>
            <CardText>{elapse}</CardText>
            <Button className="log-button" color = "info" onClick={recordTime}>
              Log Time Now
            </Button>
          </Card>
        </div>
        <div className="buttons-recent">
          <Button className="warning" color="dark" onClick={deleteRecent}>
            Delete Recent
          </Button>
          <Button className={buttonStatus} color="dark" onClick={recoverDeleted}>
            Undo Delete
          </Button>
        </div>
        <div className="stamped-area">
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
        <div className="bottom-buttons">
          <Button className="warning" color="dark" onClick={clearLog}>
            {" "}
            Clear All
          </Button>
          <Button className="warning" color="dark" onClick={recoverAll}>
            Recover All
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
