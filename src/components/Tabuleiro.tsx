import { useEffect, useState } from "react";
import Square from "./Square";
import styles from "./Tabuleiro.module.css";

type square = string[];

export default function Tabuleiro() {
  const [square, setSquare] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState(true);

  function handleClickSquare(chave: number) {    
    const tempSquare = [...square];
    if(tempSquare[chave]===""){
    setTurn(!turn);
    (turn === false) ? tempSquare[chave] = "X" : tempSquare[chave] = "O"; 
}   
    setSquare(tempSquare);
  }

  useEffect( () => console.log(square))

  return (
    <div>
    <div>{turn === true ? <h1>player 1</h1> : <h1>player 2</h1>}</div>
    <div className={styles.tabuleiro}>
      {square.map((square, index) => (
        <Square
          handleClickSquare={() => handleClickSquare(index)}
          chave={index}
          state={square}
        />
      ))}

    </div>
    </div>
  );
}
