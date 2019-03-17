const cards = document.querySelectorAll(".memory-card");
const player = document.querySelector(".player-name");
const list = document.querySelector(".players-list ul");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard(){
if(lockBoard) return;
if(this === firstCard) return;
this.classList.add("flip");

 if(!hasFlippedCard){
    //fist click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
    //second click
    secondCard = this;
    checkForMatch();
}

//check if cards match
function checkForMatch(){
  let itsMatch = firstCard.dataset.name === secondCard.dataset.name;
  itsMatch ? disableCards() : unflipCards();
}

//if it is a match
function disableCards(){
  let name = secondCard.dataset.name;
  player.innerHTML = name;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  player.classList.add("active");
  resetBoard();
  setTimeout(gameFinished,1000);
  setTimeout(()=>{
  player.classList.remove("active");
  },2000)
}

//if there is no match
function unflipCards(){
  lockBoard = true;
  setTimeout(()=>{
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");
  resetBoard();
},500)
}

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard ] = [null, null];
}

//function which checks if the game is completed
function gameFinished(){

let Flipped =[];
const cards = document.querySelectorAll(".memory-card");

     cards.forEach((card)=>{
       if(card.classList.contains('flip')){
       Flipped.push(card);

const names = document.querySelectorAll(".players-list ul li");

       names.forEach((li)=>{
         if(li.textContent === card.dataset.name){
           li.style.color = "#fcc600";
         }

       });
       }
     })

    if(Flipped.length === cards.length){
        document.querySelector('.overlay').classList.add("active");
       }

};

//function which creates the list with players names
function playersList(){

  cards.forEach((card,index)=>{
//takes only the first one of both cards
    if (index % 2 == 0 ){
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${card.dataset.name}`));
        list.appendChild(li);
    }

  });
}

playersList();


(function shuffle(){
cards.forEach(card => {
let randomPos = Math.floor(Math.random()*32) ;
card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click",flipCard))
