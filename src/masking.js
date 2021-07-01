import logo from "./logo.svg";
import "./App.css";
import IMask from "imask";
import React, { useState, useEffect, createRef } from "react";

function App() {
  const [final, setFinal] = useState("");
  const [mask, setMask] = useState(null);
  const [prefinal, setPrefinal] = useState(null);

  let reff = createRef();

  useEffect(() => {
    if (mask && prefinal) {
      var maskOptions = {
        mask: mask,
      };
      var el = document.getElementById("yes");
      console.log(el);
      var mask2 = IMask(el, maskOptions);
      console.log(mask2);
      console.log(mask2.masked.value);
      setFinal(mask2.masked.value);
    }

    var masked = IMask.createMask({
      mask: "+7 (000) 000-00-00",
      // ...and other options
    });
    var maskedValue = masked.resolve("71234567890");

    // mask keeps state after resolving
    console.log(masked.value); // same as maskedValue
    // get unmasked value
    console.log(masked.unmaskedValue);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input onChange={(e) => setMask(e.target.value)} />
        <input id="yes" ref={reff} value={prefinal} />
        <input onChange={(e) => setPrefinal(e.target.value)} />
        <div>{prefinal}</div>
        <div>{mask ? mask : "...."}</div>
        <div>{final}</div>
      </header>
    </div>
  );
}

export default App;
