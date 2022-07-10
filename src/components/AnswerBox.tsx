import React, { useEffect, useId, useRef } from 'react'
interface Props{
    isAnswered: boolean;
    goToNext: any;
    country: {
        name: string[];
        threeLetterCode: string;
        twoLetterCode: string;

    };
    answer?: string;
}

const AnswerBox = (props : Props) => {

  const button = useId()
  
  useEffect(() => {
    if(props.isAnswered && props.answer == "this"){
      let btn = document.getElementById(button)?.classList
      btn?.remove("hover:text-black", "hover:bg-white", "cursor-pointer");
      if(props.answer == "this"){
        btn?.add("bg-green-500")
        props.goToNext()
      }
    }
  }, [props.isAnswered])

  const  checkAnswer = () => {
    if (props.isAnswered){
      return
    }
    let btn = document.getElementById(button)?.classList
    btn?.remove("hover:text-black", "hover:bg-white", "cursor-pointer");
    if(props.answer == "this"){
      btn?.add("bg-green-500")
      props.goToNext()
    }else{
      btn?.add("bg-red-500")
    }

  }
  return ( 
    <div id={button} onClick={checkAnswer} className={`border text-center rounded p-12 hover:bg-white cursor-pointer hover:text-black`}>{props.country.name[0] || ""}</div>
  )
}

export default AnswerBox