import { React, useEffect, useState } from "react";
import { Content } from "../../components/Content";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { api } from "../../lib/axios";
import IconSearch from "../../assets/images/lupa.png";
import backgroundIcon from "../../assets/images/11070.jpg";

export const Home = () => {
  const handleWord = (event) => setWord(event.target.value.toLocaleLowerCase());

  const [word, setWord] = useState("");
  const [wordCapture, setWordCapture] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState([]);

  const debounce = (func, timeout = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const searchInput = ()=> {
    setWordCapture(word)
  }

  const processChange = debounce(() => searchInput());

  useEffect(() => {
    api
      .get(`${wordCapture}`)
      .then((response) => {setSearch(response.data)
        setError('')
      }
      )
      .catch(() =>{
        setError('Palavra não encontrada')
        setSearch([])}
      );
  }, [wordCapture]);

  return (
    <div>
      <Header />
      <div id="seach-container">
        <input
          placeholder="Qual palavra você quer encontrar?"
          value={word}
          onChange={handleWord}
          onKeyUp={processChange}
        />
        <button 
          onClick={processChange}
          type='button'
          >
          <img src={IconSearch} alt="Lupa" />
        </button>
      </div>
      {wordCapture && error ? <p id="error-msg">{error}</p> : ''}
      {wordCapture ? (
        <Content keyWord={search} word={wordCapture} />
      ) : (
        <div id="container-img">
          <img
            id="background-img"
            src={backgroundIcon}
            alt="Pesquisa background"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};
