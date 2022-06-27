import { useEffect, useState } from 'react';
import Singlecard from './components/card/singlecard'
import FormDetails from './components/card/form'
import './App.css';
import axios from 'axios';




function App() {

  const [cardImages, setCardImages] = useState([])
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceSecond, setChoiceSecond] = useState(null)
  const [disable, setDisable] = useState(false)
  const [type, setType] = useState("Type of Image...")
  const [noOfBox, setNoOfBox] = useState(12);

  const choice = (card) => {
    // console.log(card)

    if (!choiceOne)
      setChoiceOne(card)
    else if (!choiceSecond)
      setChoiceSecond(card)
    else
      console.log("Both choices have made")
  }

  const updateCards = () => {
    const newCards = cards.map(card => {
      if (card.src === choiceOne.src)
        return { ...card, match: true }
      else
        return card
    })

    setCards(newCards)
  }

  const resetChoice = () => {
    setChoiceOne(null)
    setChoiceSecond(null)

    setDisable(false)
  }

  useEffect(() => {
    if (choiceOne != null && choiceSecond != null) {
      setDisable(true)
      if (choiceOne.src === choiceSecond.src) {
        console.log("Yaa... Correst one")
        updateCards()
      }

      else
        console.log("Wrong match")

      setTurns(turns + 1)
    }

    setTimeout(() => {
      resetChoice()
    }, 500);

  }, [choiceSecond])

  useEffect(() => {
    shufflingOfCards()
  }, [])

  const shufflingOfCards = () => {

    fetchImages()
    const cards = [...cardImages, ...cardImages]
    cards.sort(() => Math.random() - 0.5)
    const updatedCards = cards.map(card => ({
      ...card, id: Math.random()
    }))

    setChoiceOne(null)
    setChoiceSecond(null)
    setCards(updatedCards)
    setTurns(0)
  }

  // console.log(cards)
  // shufflingOfCards()
  // console.log(cards)

  const toFlip = (card) => {

    if (card.match)
      return true
    else if (choiceOne != null && card.src === choiceOne.src && card.id === choiceOne.id)
      return true
    else if (choiceSecond != null && card.src === choiceSecond.src && card.id === choiceSecond.id)
      return true
    else
      return false

  }

  const page = Math.round(Math.random() * (10 - 1) + 1)
  const client_id = "5pl49YCrmwK67iAtAH1zziL7BmRpBvL1zs6Kk9Xt7Xk";
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${type}&page=${page}&per_page=${noOfBox / 2}&orientation=squarish`;

  const fetchImages = () => {
    axios
      .get(fetchUrl, {
        headers: {},
      })
      .then((response) => {
        const data = response.data.results
        const getImage = photo => {
          return { "src": photo.urls.raw, match: false }
        }
        const images = data.map(getImage)
        setCardImages(images)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <FormDetails setType={setType} setNoOfBox={setNoOfBox} />
      <button onClick={shufflingOfCards}>New Game</button>

      <div className='card-grid'>
        {
          cards.map(card => (
            <Singlecard key={card.id} card={card} choice={choice} toFlip={toFlip} todisable={disable} />
          ))
        }
      </div>
      <h2>Turns: {turns}</h2>
    </div>
  );
}

export default App;
