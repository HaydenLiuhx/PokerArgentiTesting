var readline = require('readline')
var fs =require('fs')
// var readMe = fs.readFileSync("poker-hands.txt","utf8");


var myInterface = readline.createInterface({
    input: fs.createReadStream("poker-hands.txt","utf8")
  });
var lineno = 0;
var lineArr = []
myInterface.on('line', function (line) {
    lineArr.push(line)
lineno++;
//console.log('Line number ' + lineno + ': ' + line);
//console.log(lineArr)
});

let Pokerhand = function(card){
  
  let num = card.split('')[0]
  this.first = changeJQKA(num)
  this.second = card.split('')[1]

}
/* 
  Change JQKA => 11-14
*/
function changeJQKA(num){
  switch(num){
    case 'J':
      num = '11';
      break
    case 'Q':
      num = '12';
      break
    case 'K':
      num = '13';
      break
    case 'A':
      num = '14';
      break
    default:
      num = num
  }
  return num
}
//console.log(changeJQKA('K'))

let straightFlush = (player) => {
  let playerCard = player
  let firstCard = playerCard[0]
  // for (let i = 1; i < playerCard.length; i++){
  //   if (playerCard[i].second === firstCard.second && playerCard[i].first === firstCard.first + 1){
  //     firstCard = playerCard[i]
  //   } else if ()
  // }
}

let returnScore = (cards) => {
  let playerArr = []
  for(let i of cards.split(' ')){
    playerArr.push(i)
  }
  let playerCard = playerArr.map((card) => {
    return new Pokerhand(card)
  }).sort((player1,player2) => {
    return player1.first - player2.first
  })
  for(let n of playerCard){
    console.log(n)
  }
 

}
console.log(returnScore('KC 9D 8D 7C 3C'))






// function handOuput(player1, player2) {

// }
