import * as React from 'react';
import { useState, useRef } from 'react';
import parse from 'html-react-parser';

export default function Modal(props) {
  let round = props.round;
  let Open = props.open;
  let res_arr = [];

  let attempt = 0;
  /*
  let user_attempt = info.user_attempt;
  let result = info.result;
  let actual_word = info.actual_word;
  let user_words = info.user_words;
  */


  
  //console.log(res_arr)
  const close = () =>{
      document.getElementById('modal').style.display='none';
      Open = false;
  }
  if(Open){
    let info = localStorage.getItem(round);
    info = JSON.parse(info);
    //console.log(info.result)
    let user_attempt = info.user_attempt;
    attempt = user_attempt;
    let result = info.result;
    let actual_word = info.actual_word;
    let user_words = info.user_words;


    for(let i=1; i<=user_attempt; i++){
      if(localStorage.getItem("item_"+i+"_"+round)){
        res_arr.push(localStorage.getItem("item_"+i+"_"+round));
      }
      else{
        break;
      }
    }

    const myTimeout = setTimeout(close, 20000000);
    let st = "Wordle "+round+" "+attempt+"/6";
    let wc = String(localStorage.getItem("word_color_"+round));
    const copyTxt = () =>{
      navigator.clipboard.writeText(st+"\n"+wc) //copy
    }

    return (
    <div  className='snackbar' id='modal'>
      <center>
          <div className='modalBox'>
            <div onClick={close} className='closeBtn'><i className="fa fa-close" style={{fontSize:"20px"}}></i></div>
            <b>STATISTIC</b><hr/>
            <h3>{result}</h3>
            <font style={{color:"green", fontWeight:"bold"}}>{actual_word.toUpperCase()}</font>
            <br/><br/>
            Wordle {round} {attempt}/6
            {res_arr.map(item => (
              <div>{item}</div>
            ))}
            <br/>
            <button className='btn btn-primary' onClick={copyTxt}>Copy & Share</button>
          </div>
      </center>
    </div>
    );
  }
  else{
    return (
    <></>
    );
  }
  
}