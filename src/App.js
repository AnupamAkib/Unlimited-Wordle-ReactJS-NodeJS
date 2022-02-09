import { useState, useEffect } from 'react';
import './App.css';
import WordlePlay from './components/WordlePlay.js';
import How from './components/How.js';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [R, setR] = useState();
  const [tmp, settmp] = useState();
  if (localStorage.getItem("currentRound") == null) {
    localStorage.setItem("currentRound", 1);
  }
  const changeit = (e) => {
    settmp(e.target.value)
    console.log(R)
  }
  const submitit = (e) => {
    if (tmp >= 1 && tmp <= 2200) {
      localStorage.setItem("currentRound", tmp);
    }
    else {
      alert("Please select a round between 1 and 2200");
      e.preventDefault();
    }
    //e.preventDefault();
  }
  let prev_round = R - 1;
  const inc = () => {
    let p = localStorage.getItem("currentRound");
    if (p < 2200) localStorage.setItem("currentRound", parseInt(p) + 1);
  }
  const dec = () => {
    let p = localStorage.getItem("currentRound");
    if (p > 1) localStorage.setItem("currentRound", parseInt(p) - 1);
  }

  return (
    <center>
      <BrowserRouter>
        <Routes>
          <Route path="/how" element={<How />} />
        </Routes>
        <Link to="/how" className='btn btn-secondary' style={{ float: "right", margin: "12px" }}>HOW TO PLAY</Link>
      </BrowserRouter>

      <div style={{ padding: "8px", borderBottom: "1px solid gray", textAlign: "center", color: "white", fontSize: "30px" }}>
        <font style={{ marginRight: "" }}>WORDLE</font>
      </div><br />
      <BrowserRouter>
        <div align='center'>
          <form onSubmit={submitit} style={{ opacity: "0.9" }}>
            <input type='number' onChange={changeit} placeholder='Round' style={{ width: "100px", outline: "none" }} required />
            <input type='submit' value='JUMP' />
          </form>
        </div>
        <Routes>
          <Route path="/" element={<WordlePlay round={localStorage.getItem("currentRound")} />} />
        </Routes>
      </BrowserRouter>
      <br />
      <div style={{ width: "180px" }}>
        <a style={{ float: "left" }} href={"/"} onClick={dec} className='btn btn-primary'><i className='fa fa-angle-left' style={{ marginRight: "8px" }}></i> Prev</a>
        <a style={{ float: "right" }} href={"/"} onClick={inc} className='btn btn-primary'>Next <i className='fa fa-angle-right' style={{ marginLeft: "8px" }}></i></a>
      </div>
      <br /><br /><br />
    </center>

  );
}

export default App;

