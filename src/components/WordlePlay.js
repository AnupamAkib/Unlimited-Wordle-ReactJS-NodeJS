import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WordMatch from './WordMatch';
import SimpleSnackbar from './SimpleSnackbar'
import Modal from './Modal';

export default function WordlePlay(props) {
  //localStorage.clear();
  //const { round_id } = useParams();
  //console.log(round_id)
  const [gameW, setGameWord] = useState("");
  const [choosenW, setChoosenWord] = useState("");
  const [cw, setcw] = useState("");
  const [AllWords, setAllWords] = useState([]);
  //console.log("sdfg")
  const [snack_flag, setSnackflag] = useState(false);
  const [modal_flag, setmodal_flag] = useState(false);
  const [Msg, setMsg] = useState("");
  //const [round, setround] = useState(props.round);
  //setround(props.round);
  let round = props.round;
  const [WordCnt, setWordCnt] = useState(0);
  const [restField, setrestField] = useState([]);
  const [isSolved, setisSolved] = useState(false);
  const [Loading, setLoading] = useState(true);

  const [user_selected_words, set_user_selected_words] = useState([]);

  useEffect(() => {
    //let id = Math.floor(Math.random() * 2200);
    let id = round;
    //setround(id);
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
    if(localStorage.getItem(round)){
      //setmodal_flag(true);
      let info = localStorage.getItem(round);
      info = JSON.parse(info);
      let user_attempt = info.user_attempt;
      let result = info.result;
      let actual_word = info.actual_word;
      let user_words = info.user_words;
      //console.log(localStorage.getItem(round))
      for(let i=0; i<user_words.length; i++){
        setWords(oldArray => [...oldArray, {
          choosenW: user_words[i], 
          gameW : actual_word
        }]);
      }
      //console.log(info);
      setisSolved(true);
      setmodal_flag(true);
      setGameWord(actual_word);
      set_user_selected_words(user_words);
      setWordCnt(user_attempt);
      setcw(user_words[user_words.length-1]);
      //localStorage.setItem("w_color", null);
    } 
    setLoading(false)
  }, [round]);
  

  


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



  const wordSubmit = (e)=>{
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
      set_user_selected_words(oldArray => [...oldArray, choosenW]);
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
        setmodal_flag(true);
        let json_res = {
          "result" : "YOU WON",
          "actual_word" : gameW,
          "user_words" : user_selected_words,
          "user_attempt" : 1
        }
        localStorage.setItem(round, JSON.stringify(json_res));
      }
      else if(WordCnt==2){
        setMsg("Magnificent");
        setSnackflag(true);
        setisSolved(true);
        setmodal_flag(true);
        let json_res = {
          "result" : "YOU WON",
          "actual_word" : gameW,
          "user_words" : user_selected_words,
          "user_attempt" : 2
        }
        localStorage.setItem(round, JSON.stringify(json_res));
      }
      else if(WordCnt==3){
        setMsg("Impressive");
        setSnackflag(true);
        setisSolved(true);
        setmodal_flag(true);
        let json_res = {
          "result" : "YOU WON",
          "actual_word" : gameW,
          "user_words" : user_selected_words,
          "user_attempt" : 3
        }
        localStorage.setItem(round, JSON.stringify(json_res));
      }
      else if(WordCnt==4){
        setMsg("Splendid");
        setSnackflag(true);
        setisSolved(true);
        setmodal_flag(true);
        let json_res = {
          "result" : "YOU WON",
          "actual_word" : gameW,
          "user_words" : user_selected_words,
          "user_attempt" : 4
        }
        localStorage.setItem(round, JSON.stringify(json_res));
      }
      else if(WordCnt==5){
        setMsg("Great");
        setSnackflag(true);
        setisSolved(true);
        setmodal_flag(true);
        let json_res = {
          "result" : "YOU WON",
          "actual_word" : gameW,
          "user_words" : user_selected_words,
          "user_attempt" : 5
        }
        localStorage.setItem(round, JSON.stringify(json_res));
      }
      else if(WordCnt==6){
        setMsg("Phew");
        setSnackflag(true);
        setisSolved(true);
        setmodal_flag(true);
        let json_res = {
          "result" : "YOU WON",
          "actual_word" : gameW,
          "user_words" : user_selected_words,
          "user_attempt" : 6
        }
        localStorage.setItem(round, JSON.stringify(json_res));
      }
    }
    else{
      if(WordCnt==6){
        setMsg(gameW.toUpperCase());
        setisSolved(true);
        setSnackflag(true);
        setmodal_flag(true);
        let json_res = {
          "result" : "YOU LOSE",
          "actual_word" : gameW,
          "user_words" : user_selected_words,
          "user_attempt" : 6
        }
        localStorage.setItem(round, JSON.stringify(json_res));
      }
    }
    if(localStorage.getItem("w_color")){
      let color = localStorage.getItem("w_color");
      color = color.split(",");
      //console.log(color)
      let prev = "", tmp="";
      for(let i=0; i<5; i++){
        if(localStorage.getItem("word_color_"+round)){
          prev = localStorage.getItem("word_color_"+round);
        }
        if(color[i]=="#3a3a3c"){
            localStorage.setItem("word_color_"+round, prev+"⬛");
            tmp += "⬛";
        }
        else if(color[i]=="#b59f3b"){
            localStorage.setItem("word_color_"+round, prev+"🟨");
            tmp += "🟨";
        }
        else if(color[i]=="#538d4e"){
            localStorage.setItem("word_color_"+round, prev+"🟩");
            tmp += "🟩";
        }
      }
      //console.log(tmp)
      localStorage.setItem("item_"+WordCnt+"_"+round, tmp);
      prev = localStorage.getItem("word_color_"+round);
      localStorage.setItem("word_color_"+round, prev+'\n');
    }
  }, [WordCnt]);

  if(Loading){
    return (
      <center>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      </center>
    )
  }


  return <div align="center" className="container" style={{backgroundColor:""}}>
      
      <h1 style={{color:"#dadada"}}>Round #{round}</h1>
      
      <div style={{width:"305px", backgroundColor:""}}>
        {Words.map(item => (
            <WordMatch choosen={item.choosenW} gameWord={item.gameW} round={round}/>
        ))}
        {WordCnt<6? <form onSubmit={wordSubmit} autoComplete="off">
          <input style={{
            textDecoration: "none",
            width:"340px",
            backgroundSize:"300px",
            backgroundPosition:"left" 
            }} spellCheck="false" type="text" placeholder="" onChange={wordOnChange} maxlength="5" value={choosenW} className='inp' readOnly={isSolved}/>
          <br/>
          {restField}
          {!isSolved? <input style={{width:"0px", height:"0px", padding:"0px", border:"0px"}} className="" type="submit" value="CHECK" disabled={flag}/> : ''}
        </form> : ''}
      </div>
      <SimpleSnackbar open={snack_flag} msg={Msg}/>
      <Modal round={round} open={modal_flag}/>
  </div>;
}

