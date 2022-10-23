import styles from './Square.module.css'

type props = {
    state: string,
    chave: number,
    handleClickSquare: Function
}

export default function Square(props: props){

    function handleOnClick(){
        props.handleClickSquare();
    }

    return <div className={styles.square} onClick={()=>props.handleClickSquare()}>{props.state}</div>
}