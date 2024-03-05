import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/jerry2.jpeg", matched: false },
  { src: "/img/jerry1.jpeg", matched: false },
  { src: "/img/image-1.jpeg", matched: false },
  { src: "/img/image-2.jpeg", matched: false },
  { src: "/img/image-3.jpeg", matched: false },
  { src: "/img/image-4.jpeg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceOne(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //comparing two selected cards
  useEffect(() => {
    if ((choiceOne, choiceTwo)) {
      setDisabled(true);
      if (choiceOne.src == choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);

  //resetting choices and increase turns
  const resetTurn = () => {
    setChoiceOne("");
    setChoiceTwo("");
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //automatically start the game
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Match it</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Match all the cards by matching a pair of cards</p>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
