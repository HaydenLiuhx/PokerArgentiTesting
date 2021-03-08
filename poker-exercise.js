var readline = require('readline')
var fs =require('fs')
// var readMe = fs.readFileSync("poker-hands.txt","utf8");


var myInterface = readline.createInterface({
    input: fs.createReadStream("poker-hands.txt","utf8")
  });
var lineno = 0;
var lineArr = []
let player1Win = 0
let player2Win = 0
let draw = 0
myInterface.on('line', function (line) {
  lineArr.push(line)
  let player1 = line.slice(0,14)
  let player2 = line.slice(15)
  // console.log(player1.length)
  // console.log(player2.length)
  console.log('player1 is '+returnScore(player1)[2])
  console.log('player2 is '+returnScore(player2)[2])
  console.log('++++++---+++++')
  if (returnScore(player1)[0]>returnScore(player2)[0]){
    player1Win+=1
  } else if (returnScore(player1)[0]<returnScore(player2)[0]){
    player2Win+=1
  } else{
    if (returnScore(player1)[1]>returnScore(player2)[1]){
      player1Win+=1
    } else if (returnScore(player1)[1]<returnScore(player2)[1]){
      player2Win+=1
    } else{
      draw+=1
    }
  }

  
  lineno++;
console.log('player1Win:'+player1Win)
console.log('player2Win:'+player2Win)
console.log('DRAW:'+draw)
//console.log('Line number ' + lineno + ': ' + line);
//console.log(lineArr)
});
// console.log('player1Win:'+player1Win)
// console.log('player2Win:'+player2Win)
// console.log('DRAW:'+draw)

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
    case 'T':
      num = '10';
      break
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
  if(player[0].second == player[1].second &&
     player[0].second == player[2].second &&
     player[0].second == player[3].second &&
     player[0].second == player[4].second 
    ){
      
      for(let i = 0; i<5; i++){
        if(player[0].first == player[1].first - 1 &&
           player[1].first == player[2].first - 1 &&
           player[2].first == player[3].first - 1 &&
           player[3].first == player[4].first - 1 
          ){
            return [10,player[0].first,'straightFlush']
          }
      }
    }
    return false

}

let Flush = (player) => {
  if(player[0].second == player[1].second &&
    player[0].second == player[2].second &&
    player[0].second == player[3].second &&
    player[0].second == player[4].second 
   ){
     return [6,player[4]*10000000+player[3]*100000+player[2]*1000+player[1]*20+player[0],'Flush']
   }
   return false
}

let straight = (player) => {
  if(player[0].second == player[1].second &&
     player[0].second == player[2].second &&
     player[0].second == player[3].second &&
     player[0].second == player[4].second 
    ){
      return [5,player[0],'straight']
    }
  return false
}

let FourOfAKind = (player) => {
  let cardArr = []
  for(let i of player){
    cardArr.push(i.first)
  }
  let arr = []
  cardArr.sort()
  for (var i = 0; i < cardArr.length;) {
    var count = 0;
    for (var j = i; j < cardArr.length; j++) {
      if (cardArr[i] === cardArr[j]) {
        count++;
      }
    }
    arr.push({
      date: cardArr[i],
      count: count
    })
    i+=count;
    
  }
  //console.log(arr)
  for (var k = 0; k < arr.length; k++) {
    if (arr[k].count == 4){
      return [8,arr[k].date,'FourOfAKind']
    }
  }
  return false
}

let ThreeOfAKind = (player) => {
  let cardArr = []
  for(let i of player){
    cardArr.push(i.first)
  }
  let arr = []
  cardArr.sort()
  for (var i = 0; i < cardArr.length;) {
    var count = 0;
    for (var j = i; j < cardArr.length; j++) {
      if (cardArr[i] === cardArr[j]) {
        count++;
      }
    }
    arr.push({
      date: cardArr[i],
      count: count
    })
    i+=count;
  }
  for (var k = 0; k < arr.length; k++) {
    if (arr[k].count == 3){
      return [4,arr[k].date,'ThreeOfAKind']
    }
  }
  return false
}

let FullHouse = (player) => {
  let cardArr = []
  for(let i of player){
    cardArr.push(i.first)
  }
  let arr = []
  cardArr.sort()
  for (var i = 0; i < cardArr.length;) {
    var count = 0;
    for (var j = i; j < cardArr.length; j++) {
      if (cardArr[i] === cardArr[j]) {
        count++;
      }
    }
    arr.push({
      date: cardArr[i],
      count: count
    })
    i+=count;
  }
  arr.sort((a)=>-a.count)
  for (var k = 0; k < arr.length; k++) {
    if (arr[k].count == 3){
      for (var s = k+1; s < arr.length; s++){
        if (arr[s].count == 2){
          return [7,arr[k].date,'FullHouse']
        }
      }
    }
  }
  return false
}

let TwoPairs = (player) => {
  let cardArr = []
  for(let i of player){
    cardArr.push(i.first)
  }
  let arr = []
  cardArr.sort()
  for (var i = 0; i < cardArr.length;) {
    var count = 0;
    for (var j = i; j < cardArr.length; j++) {
      if (cardArr[i] === cardArr[j]) {
        count++;
      }
    }
    arr.push({
      date: cardArr[i],
      count: count
    })
    i+=count;
  }
  //console.log(arr)
  let twoPairs = 0
  for (var k = 0; k < arr.length; k++) {
    if (arr[k].count == 2){
      twoPairs += 1
    }
  }
  if (twoPairs>1){
    return [3,arr[2].date*1000+arr[1].date*20+arr[0],'TwoPairs']
  }

  return false
}

let OnePair = (player) => {
  let cardArr = []
  for(let i of player){
    cardArr.push(i.first)
  }
  
  let arr = []
  cardArr.sort()
  for (var i = 0; i < cardArr.length;) {
    var count = 0;
    for (var j = i; j < cardArr.length; j++) {
      if (cardArr[i] === cardArr[j]) {
        count++;
      }
    }
    arr.push({
      date: cardArr[i],
      count: count
    })
    i+=count;
  }
  arr.sort()
  //console.log(arr)
  let twoPairs = 0
  for (var k = 0; k < arr.length; k++) {
    if (arr[k].count == 2){
      twoPairs += 1
    }
  }
  if (twoPairs === 1){
    return [2,arr[3].date*100000+arr[2].date*1000+arr[1].date*20+arr[0].date,'OnePair']
  }

  return false
}

let HighCard = (player) => {
  let cardArr = []
  for(let i of player){
    cardArr.push(i.first)
  }
  cardArr.sort((a)=>a.date)
  //console.log(cardArr)
  return [1,cardArr[4]*10000000+cardArr[3]*100000+cardArr[2]*1000+cardArr[1]*20+cardArr[0],'HighCard']
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
  // for(let n of playerCard){
  //   console.log(n)
  // }
  if (straightFlush(playerCard)){
    return straightFlush(playerCard)
  } else if (FourOfAKind(playerCard)){
    return FourOfAKind(playerCard)
  } else if (FullHouse(playerCard)){
    return FullHouse(playerCard)
  } else if (Flush(playerCard)){
    return Flush(playerCard)
  } else if (straight(playerCard)){
    return straight(playerCard)
  } else if (ThreeOfAKind(playerCard)){
    return ThreeOfAKind(playerCard)
  } else if (TwoPairs(playerCard)){
    return TwoPairs(playerCard)
  } else if (OnePair(playerCard)){
    return OnePair(playerCard)
  } else {
    return HighCard(playerCard)
  }

}








