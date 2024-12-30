let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


let result = '';
let computerMove;  


updateScoreElement();





/*
if (!score) {
  score = {
    wins: 0,
    losses:0 ,
    ties: 0
  }
}*/

let isAutoPlaying = false;
let intervalID;


//const autoPlay = () => {
//};



/*document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});*/






document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});


let divHTML = `
      <p class="warningText">Are you shure you want to reset the score?</p>
      <button class="yesButton">Yes</button>
      <button class="noButton">No</button>
    `;

let br=0;

document.querySelector('.js-reset-button').addEventListener('click', () => {
  if (br>0) {
    br = 0;
    return;
  }

  br++;
  document.querySelector('.warningContainer').innerHTML += divHTML;

  document.querySelector('.yesButton').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.warningContainer').innerHTML = '';
  });
  
  document.querySelector('.noButton').addEventListener('click', () => {
    document.querySelector('.warningContainer').innerHTML = '';
  });

});








function autoPlay() {
  if (!isAutoPlaying) {
    intervalID =  setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop playing';
  }
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto play';
  }
}



document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
})



document.body.addEventListener('keydown', (event) =>  {
  if (event.key === 'r')  {
    playGame('rock');
  } else if (event.key === 'p')  {
    playGame('paper');
  } else if (event.key === 's')  {
    playGame('scissors');
  }
  if (event.key === 'a') {
    autoPlay();
  }
  if (event.key === 'Backspace') {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
});









function playGame (playerMove) {
  
computerMove = pickComputerMove(); 


result ='';

  if(playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result ='You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
      result ='You win.';
      } else if (computerMove === 'paper') {
      result = 'Tie.';
      } else if (computerMove === 'scissors') {
      result = 'You lose.';
      }
  } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
      result ='Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses +=1;
  } else if (result === 'Tie.') {
    score.ties +=1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  
 
  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="${playerMove}-emoji.png" class="move-icon" >
<img src="${computerMove}-emoji.png" class="move-icon">
Computer`;

  
  //alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins: ${score.wins}, Losses ${score.losses}, Ties: ${score.ties}`);
}





function updateScoreElement () {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses ${score.losses}, Ties: ${score.ties}`;
}








function pickComputerMove () {
  let computerMove = '';

  const randomNumber = Math.random();

   if ( randomNumber >= 0 && randomNumber < 1/3) {
  computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
  computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
  computerMove = 'scissors';
   }

   return computerMove;

}

