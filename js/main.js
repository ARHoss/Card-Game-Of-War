//Example fetch using card game war api
let deckId = localStorage.getItem('deckId');

let drawCards = 2, cardNum1 = 0, cardNum2 = 1;

let score = getScore();

if(score != null){
  document.querySelector('main').classList.remove('hidden');
  document.querySelector('#Start').classList.add('hidden');

  document.querySelector('#player1').src = score.player1CardUrl;
  document.querySelector('#player2').src = score.player2CardUrl;
  document.querySelector('#score').innerText = `Player 1: ${score.player1} Player 2: ${score.player2}`;
  document.querySelector('#remainingCards').innerText = `Remaining Cards: ${score.remainingCards}`;
}


document.querySelector('#Start').addEventListener('click', initializeDeck);


function initializeDeck(){

  document.querySelector('#Start').classList.add('hidden');

  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log('Initializing New Deck');
    console.log(data)

    deckId = data.deck_id;
    score = {
      ['player1'] : 0,
      ['player2'] : 0,
      ['remainingCards']: 52,
      ['player1CardUrl']: '',
      ['player2CardUrl']: ''

    }
    
    localStorage.setItem('deckId', deckId)
    localStorage.setItem('player1Score', 0);
    localStorage.setItem('player2Score', 0);
    localStorage.setItem('remainingCards', 52);
    localStorage.setItem('player1CardUrl', '');
    localStorage.setItem('player2CardUrl', '');

    document.querySelector('main').classList.remove('hidden');
    document.querySelector('#Start').classList.add('hidden');
 
    return true;
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}



document.querySelector('button').addEventListener('click', showCard)

function showCard(){
  
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${drawCards}`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    console.log('New Cards: '+drawCards);
    score['remainingCards'] = data.remaining;
    
    

    score['player1CardUrl'] = document.querySelector('#player1').src = data.cards[cardNum1].image
    score['player2CardUrl'] = document.querySelector('#player2').src = data.cards[cardNum2].image

    let player1CardVal = getCardNumValue(data.cards[cardNum1].value);
    let player2CardVal = getCardNumValue(data.cards[cardNum2].value);

    if(drawCards == 2){

      if(player1CardVal > player2CardVal){
        score['player1'] += 2;
        document.querySelector('#result').innerText = 'Player 1 Wins';
      }else if(player2CardVal > player1CardVal){
        score['player2'] += 2;
        document.querySelector('#result').innerText = 'Player 2 Wins';
      }else{
        console.log('War Time');
        if( score['remainingCards'] >= 8){
          drawCards = 8
          cardNum1 = 6;
          cardNum2 = 7;
        }else{
          drawCards = score['remainingCards'];
          cardNum1 = drawCards - 2;
          cardNum2 = drawCards - 1;
        }
        
        document.querySelector('#result').innerText = 'Time for War';
      }

    }else{

      if(player1CardVal > player2CardVal){
        score['player1'] += 8;
        document.querySelector('#result').innerText = 'Player 1 Wins';
      }else if(player2CardVal > player1CardVal){
        score['player2'] += 8;
        document.querySelector('#result').innerText = 'Player 2 Wins';
      }else{
        if( score['remainingCards'] >= 8){
          drawCards = 8
          cardNum1 = 6;
          cardNum2 = 7;
        }else{
          drawCards = score['remainingCards'];
          cardNum1 = drawCards - 2;
          cardNum2 = drawCards - 1;
        }
        document.querySelector('#result').innerText = 'Time for War';
      }

      drawCards = 2;
      cardNum1 = 0;
      cardNum2 = 1;
    }
    

    document.querySelector('#score').innerText = `Player 1: ${score.player1} Player 2: ${score.player2}`;
    document.querySelector('#remainingCards').innerText = `Remaining Cards: ${score.remainingCards}`;



    console.log('Remaining Cards: '+score.remainingCards)

    if(score.remainingCards <= 0){
      
      finalScore();

    }

  })
  .catch(err => {
    console.log(`error ${err}`)
  });



}

window.addEventListener("beforeunload", saveScore);

function saveScore(e){

  localStorage.setItem('player1Score', score['player1']);
  localStorage.setItem('player2Score', score['player2']);
  localStorage.setItem('remainingCards', score['remainingCards']);
  localStorage.setItem('player1CardUrl', score['player1CardUrl']);
  localStorage.setItem('player2CardUrl', score['player2CardUrl']);

  var confirmationMessage = "Good Bye";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage;                            //Webkit, Safari, Chrome

}


function getScore(){

  let player1Score = Number(localStorage.getItem('player1Score'));
  let player2Score = Number(localStorage.getItem('player2Score'));
  let remainingCards = Number(localStorage.getItem('remainingCards'));
  let player1CardUrl = localStorage.getItem('player1CardUrl');
  let player2CardUrl = localStorage.getItem('player2CardUrl');
  let score = {
    ['player1'] : player1Score,
    ['player2'] : player2Score,
    ['remainingCards']: remainingCards,
    ['player1CardUrl']: player1CardUrl,
    ['player2CardUrl']: player2CardUrl
  };

  return score;
}

function finalScore(){

  let result = score.player1 > score.player2?'Player 1 Wins the Game':'Player 2 Wins the Game';
<<<<<<< HEAD
  console.log(score.player1 > score.player2);
=======
>>>>>>> main

  localStorage.clear();
  
  document.querySelector('#Start').classList.remove('hidden');
  document.querySelector('main').classList.add('hidden');
  document.querySelector('#finalResult').innerText = result;

  document.querySelector('#score').innerText = `Player 1: ${0} Player 2: ${0}`;
  document.querySelector('#remainingCards').innerText = `Remaining Cards: ${52}`;
  document.querySelector('#player1').src = '';
  document.querySelector('#player2').src = '';
  document.querySelector('#result').innerText = 'New Game';

}


function getCardNumValue(val){

  if(val == 'ACE'){
    return 14;
  }else if(val == 'KING'){
    return 13;
  }else if(val == 'QUEEN'){
    return 12;
  }else if(val == 'JACK'){
    return 11;
  }else{
    return val;
  }


}



/*
local Storage

get the score

save the deck
save the score

*/