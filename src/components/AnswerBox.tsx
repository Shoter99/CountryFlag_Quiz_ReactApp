import React from 'react'
interface Props{
    country: {
        name: string[];
        threeLetterCode: string;
        twoLetterCode: string;

    };
    answer?: string;
}
const AnswerBox = (props : Props) => {
  console.log(props.country)
  return ( 
    <div className={`border text-center rounded p-12 hover:bg-white cursor-pointer hover:text-black`}>{props.country.name[0] || ""}</div>
  )
}

export default AnswerBox