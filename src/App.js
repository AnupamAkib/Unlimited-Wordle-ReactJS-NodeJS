import { useState, useEffect } from 'react';
import './App.css';
import WordlePlay from  './components/WordlePlay.js';
import Test from  './components/Test.js';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [R, setR] = useState();
  const [tmp, settmp] = useState();
  const changeit = (e) =>{
    settmp(e.target.value)
    console.log(R)
  }
  const submitit = (e) =>{
    localStorage.setItem("currentRound", tmp);
    //e.preventDefault();
  }
  let next_round = 1;
  for(let i=1; i<2200; i++){
    if(!localStorage.getItem(i)){
      next_round = i+1; break;
    }
  }
  let prev_round = R-1;
  const inc = () =>{
    let p = localStorage.getItem("currentRound");
    localStorage.setItem("currentRound", parseInt(p)+1);
  }
  const dec = () =>{
    let p = localStorage.getItem("currentRound");
    localStorage.setItem("currentRound", parseInt(p)-1);
  }
  
   
  return (
    <>
    <h1 style={{textAlign:"center", color:"white"}}>WORDLE</h1><hr style={{borderTop:"2px solid white"}}/>
      <BrowserRouter>
        <div align='center'>
          <a href={"/"} onClick={dec} className='btn btn-primary'>Prev</a>
          <a href={"/"} onClick={inc} className='btn btn-primary'>Next</a>
          <br/>
          <center>
          <form onSubmit={submitit}>
            <input type='number' onChange={changeit} placeholder='Enter round' style={{width:"100px"}}/>
            <input type='submit' value='JUMP'/>
          </form>
          </center>
        </div>
        <Routes>
          <Route path="/" element={<WordlePlay round={localStorage.getItem("currentRound")} />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

