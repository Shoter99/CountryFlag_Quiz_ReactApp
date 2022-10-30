import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { country_data } from "./utils/country_list";
import AnswerBox from "./components/AnswerBox";
import { parseJsonText } from "typescript";

function App() {
  function shuffle(array: number[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  interface Country {
    name: string[];
    threeLetterCode: string;
    twoLetterCode: string;
  }
  const [countriesUsed, setCountriesUsed] = useState(
    sessionStorage.getItem("countriesUsed")! || ""
  );
  const getRandomCountry = (canRepeat = 0) => {
    let randomCountry;
    if (countriesUsed.length / 2 === country_data.length) canRepeat = 0;

    if (canRepeat === 1) {
      while (true) {
        randomCountry =
          country_data[Math.floor(Math.random() * country_data.length)];
        if (!countriesUsed.includes(randomCountry.twoLetterCode)) break;
      }
    } else {
      randomCountry =
        country_data[Math.floor(Math.random() * country_data.length)];
    }
    return randomCountry;
  };
  const [numbers, setNumbers] = useState([0, 1, 2, 3]);
  const [countries, setCountries] = useState<Country[]>([getRandomCountry(1)]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredCorrectly, setAnswerdCorrectly] = useState<number>(
    parseInt(sessionStorage.getItem("answeredCorrectly")!) || 0
  );

  const [answered, setAnswerd] = useState<number>(
    parseInt(sessionStorage.getItem("answered")!) || 0
  );
  const countriesCount = country_data.length;
  useEffect(() => {
    if (countriesUsed.length / 2 === country_data.length) return;
    let countryList = [...countries];
    for (let _ = 0; _ < 3; _++) {
      while (true) {
        let newCountry = getRandomCountry();
        let isInList = countryList.filter(
          (item) => item.twoLetterCode == newCountry.twoLetterCode
        );
        if (!(isInList.length > 0)) {
          countryList.push(newCountry);
          break;
        }
      }
    }

    setCountries(countryList);

    setNumbers(shuffle(numbers));
  }, []);

  const changeScoreValues = (val: number, code: string) => {
    setAnswerdCorrectly(answeredCorrectly + val);
    setAnswerd(answered + 1);
    setCountriesUsed(`${code}${countriesUsed}`);
    sessionStorage.setItem(
      "answeredCorrectly",
      (answeredCorrectly + val).toString()
    );
    sessionStorage.setItem("answered", (answered + 1).toString());
    if (val != 0) {
      sessionStorage.setItem("countriesUsed", `${code}${countriesUsed}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-2"></div>
      <div className="flex w-full md:w-[400px] place-content-between border rounded p-2">
        <div>Score</div>
        <div>{`${answeredCorrectly}/${answered}`}</div>
        <div>{Math.floor((answeredCorrectly / answered) * 100) || 0}%</div>
        <div>Left: {countriesCount - answeredCorrectly}</div>
      </div>
      <div className="p-2"></div>
      {countriesUsed.length / 2 === country_data.length && (
        <>
          <div>You have successfully guessed all flags</div>
          <button
            onClick={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Reset
          </button>
        </>
      )}
      {countriesUsed.length / 2 !== country_data.length && (
        <>
          <div>
            <header className="text-3xl">What country is it?</header>
            <div className="p-4"></div>
          </div>
          <div className="border rounded text-center">
            <img
              src={
                "https://countryflagsapi.com/png/" +
                (countries[0].twoLetterCode || "").toLowerCase()
              }
              alt="Country Flag"
            />
          </div>
          <div className="p-4"></div>
          <div className="grid grid-cols-2 gap-6">
            {countries.length == 4
              ? numbers.map((num) => (
                  <AnswerBox
                    changeScore={changeScoreValues}
                    isAnswered={isAnswered}
                    goToNext={() => setIsAnswered(!isAnswered)}
                    key={countries[num].twoLetterCode}
                    country={countries[num]}
                    answer={num == 0 ? "this" : ""}
                  />
                ))
              : ""}
          </div>
          <div className="p-4"></div>
          <div>
            <button
              className={`border rounded p-2 hover:bg-white hover:text-black cursor-pointer ${
                !isAnswered && "hidden"
              }`}
              onClick={() => {
                window.location.reload();
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
