
const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  playerSides: {
    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  actions: {
    buttons: document.getElementById("next-duel"),
  },
};


const pathImages = "./src/assets/icons/";

//cartas disponiveis
const cardData = [
  {
    id: 0,
    name: "Episkey",
    type: "Paper",
    img: `${pathImages}episkey.jpg`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 1,
    name: "Geminio",
    type: "Rock",
    img: `${pathImages}geminio.jpg`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 2,
    name: "Evanesco",
    type: "Scissors",
    img: `${pathImages}evanesco.jpg`,
    WinOf: [0],
    LoseOf: [1],
  },
  {
    id: 3,
    name: "Locomotor",
    type: "Paper",
    img: `${pathImages}locomotor.jpg`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 4,
    name: "Aguamenti",
    type: "Rock",
    img: `${pathImages}aguamenti.jpg`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 5,
    name: "Appare-Vestigium",
    type: "Scissors",
    img: `${pathImages}appare-vestigium.jpg`,
    WinOf: [0],
    LoseOf: [1],
  },
  {
    id: 6,
    name: "Avenseguim",
    type: "Paper",
    img: `${pathImages}avenseguim.jpg`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 7,
    name: "Levicourpis",
    type: "Rock",
    img: `${pathImages}levicourpis.jpg`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 8,
    name: "Aberto",
    type: "Scissors",
    img: `${pathImages}aberto.jpg`,
    WinOf: [0],
    LoseOf: [1],
  },
  {
    id: 9,
    name: "Impervious",
    type: "Paper",
    img: `${pathImages}impervious.jpg`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 10,
    name: "Legilimency",
    type: "Rock",
    img: `${pathImages}legilimency.jpg`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 11,
    name: "Sonorus",
    type: "Scissors",
    img: `${pathImages}sonorus.jpg`,
    WinOf: [0],
    LoseOf: [1],
  },
  {
    id: 12,
    name: "Salvio-hexia",
    type: "Scissors",
    img: `${pathImages}salvio-hexia.jpg`,
    WinOf: [0],
    LoseOf: [1],
  },
  {
    id: 13,
    name: "Confringo",
    type: "Paper",
    img: `${pathImages}confringo.jpg`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 14,
    name: "Finestra",
    type: "Rock",
    img: `${pathImages}finestra.jpg`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 15,
    name: "Rictusempra",
    type: "Scissors",
    img: `${pathImages}rictusempra.jpg`,
    WinOf: [0],
    LoseOf: [1],
  },
  {
    id: 16,
    name: "Riddikulus",
    type: "Paper",
    img: `${pathImages}riddikulus.jpg`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 17,
    name: "Enervate",
    type: "Rock",
    img: `${pathImages}enervate.jpg`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 18,
    name: "Impedimenta",
    type: "Scissors",
    img: `${pathImages}impedimenta.jpg`,
    WinOf: [0],
    LoseOf: [1],
  },
  {
    id: 19,
    name: "Nebulus",
    type: "Paper",
    img: `${pathImages}nebulus.jpg`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 20,
    name: "Colloportus",
    type: "Rock",
    img: `${pathImages}colloportus.jpg`,
    WinOf: [2],
    LoseOf: [0],
  },
];



async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", IdCard);
  cardImage.classList.add("card");

  if (fieldSide === state.playerSides.player1) {
    cardImage.addEventListener("mouseover", () => {
      drawSelectedCard(IdCard);
    });
    cardImage.addEventListener("click", () => {
      setCardField(cardImage.getAttribute("data-id"));
    });
  }

  return cardImage;
}

async function setCardField(cardId) {
  await removeAllCardsImages();

  let computerCardId = await getRandomCardId();

  state.fieldCards.player.style.display = "block";
  state.fieldCards.computer.style.display = "block";

  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;

  let duelResults = await checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButton(duelResults);
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "DRAW";
  

  let playerCard = cardData[playerCardId];

  if (playerCard.WinOf.includes(computerCardId)) {
    state.score.playerScore += 1;
    duelResults = "WIN";
  } else if (playerCard.LoseOf.includes(computerCardId)) {
    state.score.computerScore += 1;
    duelResults = "LOSE";
  }
    await playAudio(duelResults);

  return duelResults;
}

async function drawButton(text) {
    state.actions.buttons.innerText = text.toUpperCase();
    state.actions.buttons.style.display = "block";
}

async function removeAllCardsImages() {
  let { computerBOX, player1BOX } = state.playerSides;
  let imgElements = computerBOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  imgElements = player1BOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function drawSelectedCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Atribute:" + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.buttons.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    state.cardSprites.name.innerText = "Selecione";
    state.cardSprites.type.innerText = " uma carta";

    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
    audio.volume = 0.05;
}

function init() {
  drawCards(5, state.playerSides.player1);
  drawCards(5, state.playerSides.computer);

  const bgm = document.getElementById("bgm");
  // bgm.volume = 0.03;
  // bgm.play();
}

init();
