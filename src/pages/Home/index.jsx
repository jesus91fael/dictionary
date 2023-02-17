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
  const [error, setError] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    api
      .get(`${word}`)
      .then((response) => {setSearch(response.data)
        setError('')
      }
      )
      .catch(() =>{
        setError('Palavra não encontrada')
        setSearch([])}
      );
  }, [word]);

  console.log(error)

  return (
    <div>
      <Header />
      <div id="seach-container">
        <input
          placeholder="Qual palavra você quer encontrar?"
          value={word}
          onChange={handleWord}
        />
        <button>
          <img src={IconSearch} alt="Lupa" />
        </button>
      </div>
      {word && error ? <p id="error-msg">{error}</p> : ''}
      {word ? (
        <Content keyWord={search} word={word} />
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
