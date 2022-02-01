import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WordMatch from './WordMatch';
import SimpleSnackbar from './SimpleSnackbar'
import { Link, Route } from 'react-router-dom';


export default function WordlePlay() {
  const [gameW, setGameWord] = useState("");
  const [choosenW, setChoosenWord] = useState("");
  const [cw, setcw] = useState("");
  const [AllWords, setAllWords] = useState([]);
  //console.log("sdfg")
  const [snack_flag, setSnackflag] = useState(false);
  const [Msg, setMsg] = useState("");
  const [round, setround] = useState(Math.floor(Math.random() * 2200));
 
  useEffect(() => {
    let id = Math.floor(Math.random() * 2200);
    setround(id);
    axios.post('https://akib-server.herokuapp.com/wordle/solution', {
      idx: id
    })
    .then((response) => {
      let x = response.data.replace(/'/g, '"');
      x = JSON.parse(x);
      setGameWord(x.result);
    }, (error) => {
      console.log(error);
    });

    axios.get('https://akib-server.herokuapp.com/wordle/all', {})
    .then((response) => {
      let x = response.data;
      //x = JSON.parse(x);
      //console.log(x[0].wordle_solutions)
      setAllWords(x[0].wordle_solutions);
    }, (error) => {
      console.log(error);
    });
  }, []);
  
  //console.log(AllWords)

  const [Words, setWords] = useState([]);
  const [flag, setflag] = useState(true);
  const wordOnChange = (e)=>{
      let userWord = e.target.value.toUpperCase();
      setChoosenWord(userWord);
      setcw(userWord.toUpperCase());
      if(userWord.length == 5){
        setflag(false);
      }
      else{
        setflag(true);
      }
      setSnackflag(false);
  }

  const [WordCnt, setWordCnt] = useState(0);
  const [restField, setrestField] = useState([]);
  const [isSolved, setisSolved] = useState(false);

  

  const wordSubmit = (e)=>{
    //setMsg("test message");
    //setSnackflag(true);
    let found = false;
    for(let i=0; i<AllWords.length; i++){
      if(AllWords[i].toUpperCase() == choosenW){
        found = true;
        break;
      }
    }
    if(!found){
      setMsg("Not in word list");
      setSnackflag(true);
    }
    else{
      setWords(oldArray => [...oldArray, {
        choosenW: choosenW, 
        gameW : gameW
      }]);
      setChoosenWord("");
      setflag(true);
      setWordCnt(WordCnt+1);
    }
    e.preventDefault();
  }

  useEffect(() => {
    setrestField([]);
    for(let i=0; i<6-WordCnt-1; i++){
      setrestField(oldArray => [...oldArray, <input style={{margin:"2px"}} type="text" placeholder="" maxLength={5} className='inp' readOnly/>]);
    }
    if(gameW.toUpperCase() == cw.toUpperCase()){
      if(WordCnt==1){
        setMsg("Genius");
        setSnackflag(true);
        setisSolved(true);
      }
      else if(WordCnt==2){
        setMsg("Magnificent");
        setSnackflag(true);
        setisSolved(true);
      }
      else if(WordCnt==3){
        setMsg("Impressive");
        setSnackflag(true);
        setisSolved(true);
      }
      else if(WordCnt==4){
        setMsg("Splendid");
        setSnackflag(true);
        setisSolved(true);
      }
      else if(WordCnt==5){
        setMsg("Great");
        setSnackflag(true);
        setisSolved(true);
      }
      else if(WordCnt==6){
        setMsg("Phew");
        setSnackflag(true);
        setisSolved(true);
      }
    }
    else{
      if(WordCnt==6){
        setMsg(gameW.toUpperCase());
        setSnackflag(true);
      }
    }
  }, [WordCnt]);
  
  

  return <div align="center" className="container" style={{backgroundColor:""}}>
      
      <h1 style={{color:"white"}}>Round #{round}</h1>
      
      <div style={{width:"305px", backgroundColor:""}}>
        {Words.map(item => (
            <WordMatch choosen={item.choosenW} gameWord={item.gameW}/>
        ))}
        {WordCnt<6? <form onSubmit={wordSubmit}>
          <input style={{
            width:"340px",
            backgroundSize:"300px",
            backgroundPosition:"left"
            }} type="text" placeholder="" onChange={wordOnChange} maxLength={5} value={choosenW} className='inp' readOnly={isSolved}/>
          <br/>
          {restField}
          {!isSolved? <input className="btn btn-primary" type="submit" value="CHECK" disabled={flag}/> : ''}
        </form> : ''}
      </div>
      <a href="/">Next</a> 
      <SimpleSnackbar open={snack_flag} msg={Msg}/>
  </div>;
}
