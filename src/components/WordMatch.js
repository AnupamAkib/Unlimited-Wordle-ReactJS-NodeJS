import React, { useState } from 'react';

export default function WordMatch(props) {
    let choosenWord = props.choosen.toUpperCase();
    let gameWord = props.gameWord.toUpperCase();
    let round = props.round;

    let color = ["", "", "", "", ""];
    let taken = [false, false, false, false, false];

    for(let i=0; i<choosenWord.length; i++){
        if(choosenWord[i] == gameWord[i]){
            color[i] = "#538d4e";
            taken[i] = true;
        }
    }
    for(let i=0; i<choosenWord.length; i++){
        if(choosenWord[i] == gameWord[i]) continue;
        let found = false;
        for(let j=0; j<gameWord.length; j++){
            if(choosenWord[i] == gameWord[j] && !taken[j]){
                found = true;
                color[i] = "#b59f3b";
                taken[j] = true;
                break;
            }
        }
        if(!found){
            color[i] = "#3a3a3c";
        }
    }

    let res = [];
    //const [res, set_res] = useState([]);

    if(localStorage.getItem(round)==null){
        localStorage.setItem("w_color", color);
    }
    else{
        localStorage.setItem("w_color", "");
    }

    for(let i=0; i<5; i++){
        res.push(<input type='text' value={choosenWord[i]} style={{
            backgroundColor:color[i], 
            padding:"5px", 
            width:"55px", 
            textAlign:"center", 
            fontSize:"30px", 
            fontWeight:"bold", 
            border:"0px", 
            margin:"3px", 
            color:"#dadada",
            outline:"none",
        }} readonly/>)
    }
    //console.log(res)

    return (
    <div>
        <center>
        {res}
        </center>
    </div>
    );
}
