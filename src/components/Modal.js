import * as React from 'react';
import { useState, useRef } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import WordMatch from './WordMatch';

export default function Modal(props) {
  let round = props.round;
  let Open = props.open;
  let res_arr = [];
  let attempt = 0;

  const [copiedMsg, setcopiedMsg] = useState("");
  
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

    //const myTimeout = setTimeout(close, 20000000);
    let st = "Wordle "+round+" "+attempt+"/6";
    let wc = String(localStorage.getItem("word_color_"+round));

    return (
    <div  className='snackbar' id='modal'>
      <center>
          <div className='modalBox'>
            <b style={{color:"", marginRight:"-35px"}}>STATISTIC</b><div onClick={close} className='closeBtn'><i className="fa fa-close" style={{fontSize:"20px"}}></i></div><hr/>
            <h3>{result}</h3>
            <WordMatch choosen={actual_word} gameWord={actual_word} round={round}/>
            <br/>
            
            Wordle {round} {attempt}/6
            {res_arr.map(item => (
              <div>{item}</div>
            ))}
            <br/>
            <CopyToClipboard text={st+"\n"+wc}
            onCopy={() => setcopiedMsg("Copied!!")}>
            <button className='btn btn-primary'><i className='fa fa-copy' style={{marginRight:"5px"}}></i> Copy Result</button>
            </CopyToClipboard>

            <div style={{paddingTop:"5px", fontWeight:"bold"}}>{copiedMsg}</div>
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

