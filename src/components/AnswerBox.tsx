import React, { useEffect, useId, useRef } from "react";
interface Props {
  isAnswered: boolean;
  changeScore: (val: number, code: string) => void;
  goToNext: () => void;
  country: {
    name: string[];
    threeLetterCode: string;
    twoLetterCode: string;
  };
  answer?: string;
}

const AnswerBox = (props: Props) => {
  const button = useId();

  useEffect(() => {
    if (props.isAnswered) {
      let btn = document.getElementById(button)?.classList;
      btn?.remove("hover:text-black", "hover:bg-white", "cursor-pointer");
      if (props.answer == "this") {
        btn?.add("bg-green-500");
      }
    }
  }, [props.isAnswered]);

  const checkAnswer = () => {
    if (props.isAnswered) {
      return;
    }
    let btn = document.getElementById(button)?.classList;
    btn?.remove("hover:text-black", "hover:bg-white", "cursor-pointer");
    props.goToNext();
    if (props.answer == "this") {
      props.changeScore(1, props.country.twoLetterCode);
      btn?.add("bg-green-500");
    } else {
      props.changeScore(0, props.country.twoLetterCode);
      btn?.add("bg-red-500");
    }
  };
  return (
    <div
      id={button}
      onClick={checkAnswer}
      className={`border text-center rounded p-6 md:p-12 hover:bg-white cursor-pointer hover:text-black`}
    >
      {props.country.name[0] || ""}
    </div>
  );
};

export default AnswerBox;
