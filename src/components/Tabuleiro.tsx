import { useEffect, useState } from "react";
import Square from "./Square";
import styles from "./Tabuleiro.module.css";

type square = string[];
type Score = {
  player1: number;
  player2: number;
  draw: number;
}

const conditions =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function Tabuleiro() {
  const [square, setSquare] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState(true);
  const [turnHistoric, setTurnHistoric] = useState([]);
  const [score , setScore] = useState({player1: 0, player2: 0 , draw:0});

  function handleReset(){
    setSquare(["", "", "", "", "", "", "", "", ""]);
    setTurnHistoric([]);
    setTurn(true);
  }

  function handleButtonClick(chave: number){
    setSquare(turnHistoric[chave])
  }

  function handleClickSquare(chave: number) { 
      const tempSquare = [...square];
      const tempTurnHistoric = [...turnHistoric];
      if(tempSquare[chave]===""){
      setTurn(!turn);
      (turn === false) ? tempSquare[chave] = "X" : tempSquare[chave] = "O"; 
      tempTurnHistoric.push(tempSquare as never);
      setTurnHistoric(tempTurnHistoric);
      setSquare(tempSquare); 
  }   
  }

  useEffect( () =>{
    conditions.forEach((value , index)=>{
      if(square[value[0]]!=="" && square[value[0]] !== "" && square[value[0]]!==""){
        if(square[value[0]]===square[value[1]] && square[value[1]]===square[value[2]]){
          window.alert(turn === false ? "player 1 venceu!" : "player 2 venceu!");
          if(turn == false){
            const tempScore = {...score};
            tempScore.player1++;
            setScore({...tempScore});
          }else{
            const tempScore = {...score};
            tempScore.player2++;
            setScore({...tempScore});
          }
          setSquare(["", "", "", "", "", "", "", "", ""]);
          setTurnHistoric([]);
          setTurn(true);
        }
      }
      if(!square.includes("")){
        const tempScore = {...score};
        tempScore.draw++;
        setScore({...tempScore});
        setSquare(["", "", "", "", "", "", "", "", ""]);
        setTurnHistoric([]);
        setTurn(true);
      }
    });
},[square])

  return (
    <div>
      <h1>player 1: {score.player1}</h1>
      <h1>player 2: {score.player2}</h1>
      <h1>Empate: {score.draw}</h1>
      <button onClick={()=> handleReset()}>reset</button>
    <div>{turn === true ? <h1>Vez de player 1.</h1> : <h1>Vez de player 2</h1>}</div>
    <div className={styles.tabuleiro}>
      {square.map((square, index) => (
        <Square
          handleClickSquare={() => handleClickSquare(index)}
          chave={index}
          state={square}
        />
      ))}
    </div>
    <div>
      {turnHistoric.map((turn , index)=>(
        <button onClick={()=>handleButtonClick(index)} key={index}>Jogada: {index}</button>
      ))}
    </div>
    </div>
  );
}
