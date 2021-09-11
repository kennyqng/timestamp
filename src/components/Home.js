import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import moment from "moment";

function Home() {
  const [displayTime, setDisplayTime] = useState( () => {
    const saved = localStorage.getItem("recent");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  
  const recordTime = () => {
    setDisplayTime(arr => [...arr, moment().format("MMMM Do YYYY h:mm:ss a")]);
    localStorage.getItem("recent");
  };

  useEffect (() => {
    localStorage.setItem("recent", JSON.stringify(displayTime));
  });

  const clearLog = () => {
    setDisplayTime([]);
  };

  return (
    <div>
      <div className="clear" onClick={clearLog}>Clear Storage</div>
      <div className="welcome">
        <p>Kenny's Time Log</p>
        <div className="button-board">
          <Button onClick={recordTime}>Log Time Now</Button>
        </div>
       <div className="list">
          {displayTime
            .slice(0)
            .reverse()
            .map(e => (
              <p> {e}</p>
              ))
            }
        </div>
      </div>
  </div>
  );
}

export default Home;
