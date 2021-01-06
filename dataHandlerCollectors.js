'use strict';

let csv = require("csvtojson");

let collectorsDeck = "collectors-cards";
let languages = ["en", "se"];
/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.rooms = {};
}


/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

/*
Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({checkType: true})
  .fromFile("./data/" + table + ".csv")
  .then((jsonObj) => {
    this.data[table] = jsonObj;
  });
};

Data.prototype.initializeData = function() {
  console.log("Starting to build data tables");
  for (let i in languages) {
    this.initializeTable(collectorsDeck);
  }
}

Data.prototype.getUILabels = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let lang = room.lang;
    var ui = require("./data/collectors-" + lang + ".json");
    return ui;
  }
  else return {};
}

Data.prototype.createRoom = function(roomId, playerCount, lang="en") {
  let room = {};
  room.players = {};
  room.lang = lang;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  // room.raiseValueOnSale = room.deck.splice(0, 4); //TA BORT raiseValueOnSale
  room.auctionSpot = [];
  room.market = [];
  room.buyPlacement = [ {cost:1, playerId: null},           //HÄR ÄNDRAR VI OM VI VILL ÄNDRA VAD SAKER KOSTAR AV NÅGON ANLEDNING
                        {cost:1, playerId: null},
                        {cost:2, playerId: null},
                        {cost:2, playerId: null},
                        {cost:3, playerId: null} ];
  room.skillPlacement = [ {cost:0, playerId: null},
                          {cost:0, playerId: null},
                          {cost:0, playerId: null},
                          {cost:1, playerId: null},
                          {cost:1, playerId: null} ];
  room.auctionPlacement = [ {cost:-2, playerId: null},
                            {cost:-1, playerId: null},
                            {cost:0, playerId: null},
                            {cost:0, playerId: null} ];
  room.marketPlacement = [ {cost:0, playerId: null},
                           {cost:-2, playerId: null},
                           {cost:0, playerId: null} ];

  /*DETTA VILL VI SEN IMPLEMENTERA MED workPlacement:*/
  room.workPlacement = [ {cost:-3, playerId: null, workAction: 1},
                        {cost:-1, playerId: null, workAction: 2},
                        {cost:1, playerId: null, workAction: 3},
                        {cost:0, playerId: null, workAction: 4},
                        {cost:0, playerId: null, workAction: 5},]

  this.rooms[roomId] = room;
}









Data.prototype.createDeck = function() {
  // we want a copy of the deck array, not a reference to it so we use the
  // spread operator (...) to copy the items. Note that this is a shallow copy
  // so it is not generalizable to all copy problems
  let deck = [...this.data[collectorsDeck]];
  return shuffle(deck);
}



Data.prototype.getPlayers = function (id) {
  let room = this.rooms[id]
  if (typeof room !== 'undefined') {
    return room.players;
  }
  else return {};
}

Data.prototype.updatePoints = function (roomId, player, points) {
  let room = this.rooms[roomId]
  if (typeof room !== 'undefined') {
    room.points[player] += points;
    return room.points;
  }
  else return {};
}

/* returns players after a new card is drawn */
Data.prototype.drawCard = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let card = room.deck.pop();
    room.players[playerId].hand.push(card);
    return room.players;
  }
  else return [];
}

/* moves card from itemsOnSale to a player's hand */
Data.prototype.buyCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.itemsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.itemsOnSale[i].x === card.x &&
          room.itemsOnSale[i].y === card.y) {
        c = room.itemsOnSale.splice(i,1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.players[playerId].hand[i].x === card.x &&
          room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i,1);
        break;
      }
    }
    room.players[playerId].items.push(...c);
    room.players[playerId].money -= cost;

    //ÄVEN HÄR EN JÄTTEFUL LÖSNING PÅ ITEMCOUNTER!
    if ( card.item === 'fastaval' ) {
      room.players[playerId].itemCounter[0] ++;
    }
    else if ( card.item === 'figures' ) {
      room.players[playerId].itemCounter[1] ++;
    }
    else if ( card.item === 'music' ) {
      room.players[playerId].itemCounter[2] ++;
    }
    else if ( card.item === 'movie' ) {
      room.players[playerId].itemCounter[3] ++;
    }
    else if ( card.item === 'technology' ) {
      room.players[playerId].itemCounter[4] ++;
    }


  }
}

<<<<<<< HEAD
/* moves card from raiseValueOnSale to market */
Data.prototype.raiseValue = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;

    //GÅ IGENOM SKILLSONSALE, AUCTIONCARDS OCH HAND
    //NÄSTA STEG: ta bort raiseValueOnSale
    //för skill och auction istället för raisevalueonsale

    /// check first if the card is among the raise value on sale
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.auctionCards[i].x === card.x &&
          room.auctionCards[i].y === card.y) {
        c = room.auctionCards.splice(i,1, {});
        break;
      }
    }

    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.skillsOnSale[i].x === card.x &&
          room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i,1, {});
        break;
      }
    }

    // for (let i = 0; i < room.raiseValueOnSale.length; i += 1) {
    //   // since card comes from the client, it is NOT the same object (reference)
    //   // so we need to compare properties for determining equality
    //   if (room.raiseValueOnSale[i].x === card.x &&
    //       room.raiseValueOnSale[i].y === card.y) {
    //     c = room.raiseValueOnSale.splice(i,1, {});
    //     break;
    //   }
    // }

    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.players[playerId].hand[i].x === card.x &&
          room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i,1);
        break;
      }
    }
    room.market.push(...c);
    room.players[playerId].money -= cost;
  }
}

/* moves card from auctionCards or Hand to a AuctionSpot */
Data.prototype.startAuction = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      if (room.auctionCards[i].x === card.x &&
          room.auctionCards[i].y === card.y) {
        c = room.auctionCards.splice(i,1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.players[playerId].hand[i].x === card.x &&
          room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i,1);
        break;
      }
    }
    //room.players[playerId].items.push(...c);
    room.auctionSpot.push(...c);
    room.players[playerId].money -= cost;

  }
}
 // lös problemet med att pengar inte dras bort
Data.prototype.startWork = function (roomId, playerId, cost, workAction) { // bör läggas till workAction?
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    console.log(workAction + "Går in här när man trycker på kort i workaction =5??");

  //  room.players[playerId].money -= cost;
=======


>>>>>>> df217617db647349d19e866c9cf42305a2d8d037


<<<<<<< HEAD
/* moves card from skillsOnSale to a player's hand */
Data.prototype.gainSkill = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the skills on sale
    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.skillsOnSale[i].x === card.x &&
          room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i,1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.players[playerId].hand[i].x === card.x &&
          room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i,1);
        break;
      }
    }
    room.players[playerId].skills.push(...c);
    room.players[playerId].money -= cost;
    //kalla på skillmetod som vi skapar nedan this.skillHappening(card);
    if (card.skill === 'bottle') {
      room.players[playerId].totalBottles += 1;
      room.players[playerId].bottlesLeft += 1;
    }
=======


>>>>>>> df217617db647349d19e866c9cf42305a2d8d037








//________________________________________________________________________________//

          Data.prototype.createDeck = function() {
            // we want a copy of the deck array, not a reference to it so we use the
            // spread operator (...) to copy the items. Note that this is a shallow copy
            // so it is not generalizable to all copy problems
            let deck = [...this.data[collectorsDeck]];
            return shuffle(deck);
          }

          Data.prototype.joinGame = function (roomId, playerId) {
            let room = this.rooms[roomId];
            if (typeof room !== 'undefined') {
              if (typeof room.players[playerId] !== 'undefined') {
                console.log("Player", playerId, "joined again with info", room.players[playerId]);
                return true;
              }
              else if (Object.keys(room.players).length < room.playerCount) {
                console.log("Player", playerId, "joined for the first time");
                room.players[playerId] = { hand: [],
                  money: 1,
                  points: 0,
                  skills: [],
                  items: [],
                  /*         itemCounter: { 'fastaval' : 0,
                  'figures' : 0,
                  'music' : 0,
                  'movie' : 0,
                  'technology' : 0 }, //LYCKADES INTE MED DETTA FÖRST, VILL GÖRA LIKNANDE PÅ skillCounter /KARRO */
                  itemCounter: [0,0,0,0,0], //FÖRENKLING: fastaval, figures, music, movie, technology, /KARRO
                  skillCounter: [0,0,0,0,0,0], //FÖRENKLING: workerIncome, workerCard, bottle, auctionIncome, VP-, VP-all /KARRO
                  income: [],
                  futureIncome: 0, //ska sättas till längden av income när man väljer work som resulterar i income
                  secret: [],
                  totalBottles: 2, //ska ökas med en när man skaffar en bottle-skill
                  bottlesLeft: 2}; //ska minska med en varje gång man gör ett drag, när allas är 0 ändras quarter
                  return true;
                }
                console.log("Player", playerId, "was declined due to player limit");
              }
              return false;
            }











                /* moves card from raiseValueOnSale to market */
                Data.prototype.raiseValue = function (roomId, playerId, card, cost) {
                  let room = this.rooms[roomId];
                  if (typeof room !== 'undefined') {
                    let c = null;

                    //GÅ IGENOM SKILLSONSALE, AUCTIONCARDS OCH HAND
                    //NÄSTA STEG: ta bort raiseValueOnSale
                    //för skill och auction istället för raisevalueonsale

                    /// check first if the card is among the raise value on sale
                    for (let i = 0; i < room.auctionCards.length; i += 1) {
                      // since card comes from the client, it is NOT the same object (reference)
                      // so we need to compare properties for determining equality
                      if (room.auctionCards[i].x === card.x &&
                        room.auctionCards[i].y === card.y) {
                          c = room.auctionCards.splice(i,1, {});
                          break;
                        }
                      }

                      for (let i = 0; i < room.skillsOnSale.length; i += 1) {
                        // since card comes from the client, it is NOT the same object (reference)
                        // so we need to compare properties for determining equality
                        if (room.skillsOnSale[i].x === card.x &&
                          room.skillsOnSale[i].y === card.y) {
                            c = room.skillsOnSale.splice(i,1, {});
                            break;
                          }
                        }

                        // for (let i = 0; i < room.raiseValueOnSale.length; i += 1) {
                        //   // since card comes from the client, it is NOT the same object (reference)
                        //   // so we need to compare properties for determining equality
                        //   if (room.raiseValueOnSale[i].x === card.x &&
                        //       room.raiseValueOnSale[i].y === card.y) {
                        //     c = room.raiseValueOnSale.splice(i,1, {});
                        //     break;
                        //   }
                        // }

                        // ...then check if it is in the hand. It cannot be in both so it's safe
                        for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
                          // since card comes from the client, it is NOT the same object (reference)
                          // so we need to compare properties for determining equality
                          if (room.players[playerId].hand[i].x === card.x &&
                            room.players[playerId].hand[i].y === card.y) {
                              c = room.players[playerId].hand.splice(i,1);
                              break;
                            }
                          }
                          room.market.push(...c);
                          room.players[playerId].money -= cost;
                        }
                      }

                      /* moves card from auctionCards or Hand to a AuctionSpot */
                      Data.prototype.startAuction = function (roomId, playerId, card, cost) {
                        let room = this.rooms[roomId];
                        if (typeof room !== 'undefined') {
                          let c = null;
                          for (let i = 0; i < room.auctionCards.length; i += 1) {
                            if (room.auctionCards[i].x === card.x &&
                              room.auctionCards[i].y === card.y) {
                                c = room.auctionCards.splice(i,1, {});
                                break;
                              }
                            }
                            // ...then check if it is in the hand. It cannot be in both so it's safe
                            for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
                              // since card comes from the client, it is NOT the same object (reference)
                              // so we need to compare properties for determining equality
                              if (room.players[playerId].hand[i].x === card.x &&
                                room.players[playerId].hand[i].y === card.y) {
                                  c = room.players[playerId].hand.splice(i,1);
                                  break;
                                }
                              }
                              //room.players[playerId].items.push(...c);
                              room.auctionSpot.push(...c);
                              room.players[playerId].money -= cost;

                            }
                          }
                          // lös problemet med att pengar inte dras bort
                          Data.prototype.startWork = function (roomId, playerId, cost, workAction) { // bör läggas till workAction?
                            let room = this.rooms[roomId];
                            if (typeof room !== 'undefined') {
                              console.log(workAction + "Går in här när workaction === 5");
                              console.log("Data.prototype.startWork futureIncome: " + room.players[playerId].futureIncome );
                              room.players[playerId].futureIncome += 1;
                              console.log("Data.prototype.startWork futureIncome: " + room.players[playerId].futureIncome );

/*
console.log(workAction + "Går in här när workaction === 5");
console.log("Data.prototype.startWork futureIncome: " + room.players[playerId].futureIncome );
room.players[playerId].futureIncome += 1;
console.log("Data.prototype.startWork futureIncome: " + room.players[playerId].futureIncome );

console.log("room.players[playerId].hand[i].x är lika med:" + room.players[playerId].hand[i].x);
console.log("room.players[playerId].hand.length är lika med:" + room.players[playerId].hand.length);
console.log("room.players[playerId].hand[i].y är lika med:" + room.players[playerId].hand[i].y);

/*                  let c = null;




      for (let i = 0; i < room.players[playerId].hand.length; i += 1) {

        if (room.players[playerId].hand[i].x === card.x &&
          room.players[playerId].hand[i].y === card.y) {
            c = room.players[playerId].hand.splice(i,1);
            break;
          }
        }
        room.market.push(...c);




}*/


                            }
                          }



                          /* moves card from skillsOnSale to a player's hand */
                          Data.prototype.gainSkill = function (roomId, playerId, card, cost) {
                            let room = this.rooms[roomId];
                            if (typeof room !== 'undefined') {
                              let c = null;
                              /// check first if the card is among the skills on sale
                              for (let i = 0; i < room.skillsOnSale.length; i += 1) {
                                // since card comes from the client, it is NOT the same object (reference)
                                // so we need to compare properties for determining equality
                                if (room.skillsOnSale[i].x === card.x &&
                                  room.skillsOnSale[i].y === card.y) {
                                    c = room.skillsOnSale.splice(i,1, {});
                                    break;
                                  }
                                }
                                // ...then check if it is in the hand. It cannot be in both so it's safe
                                for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
                                  // since card comes from the client, it is NOT the same object (reference)
                                  // so we need to compare properties for determining equality
                                  if (room.players[playerId].hand[i].x === card.x &&
                                    room.players[playerId].hand[i].y === card.y) {
                                      c = room.players[playerId].hand.splice(i,1);
                                      break;
                                    }
                                  }
                                  room.players[playerId].skills.push(...c);
                                  room.players[playerId].money -= cost;
                                  //kalla på skillmetod som vi skapar nedan this.skillHappening(card);
                                  if (card.skill === 'bottle') {
                                    room.players[playerId].totalBottles += 1;
                                    room.players[playerId].bottlesLeft += 1;
                                  }

                                  //ÄVEN HÄR EN JÄTTEFUL LÖSNING PÅ SKILLCOUNTER!
                                  if ( card.skill === 'workerIncome' ) {
                                    room.players[playerId].skillCounter[0] ++;
                                  }
                                  else if ( card.skill === 'workerCard' ) {
                                    room.players[playerId].skillCounter[1] ++;
                                  }
                                  else if ( card.skill === 'bottle' ) {
                                    room.players[playerId].skillCounter[2] ++;
                                  }
                                  else if ( card.skill === 'auctionIncome' ) {
                                    room.players[playerId].skillCounter[3] ++;
                                  }
                                  else if ( card.skill === 'VP-all' ) {
                                    room.players[playerId].skillCounter[5] ++;
                                  }
                                  else {                                           //Lägger nr 5 (idx 4) sist på else (kan vara olika symboler på VP-...)
                                    room.players[playerId].skillCounter[4] ++;
                                  }

                                }
                              }

                              /*Här kan vi skapa en skillmetod som hanterar olika skills
                              Data.prototype.skillHappening = function (card) {

                            } */

                            Data.prototype.placeBottle = function (roomId, playerId, action, cost) {
                              let room = this.rooms[roomId];
                              if (typeof room !== 'undefined') {
                                let activePlacement = [];
                                room.players[playerId].bottlesLeft -= 1;
                                if (action === "buy") {
                                  activePlacement = room.buyPlacement;
                                }
                                else if (action === "skill") {
                                  activePlacement = room.skillPlacement;
                                }
                                else if (action === "auction") {
                                  activePlacement = room.auctionPlacement;
                                }
                                else if (action === "market") {
                                  activePlacement = room.marketPlacement;
                                }


                                for(let i = 0; i < activePlacement.length; i += 1) {
                                  if( activePlacement[i].cost === cost &&
                                    activePlacement[i].playerId === null ) {
                                      activePlacement[i].playerId = playerId;
                                      break;
                                    }
                                  }
                                }
                              }

                              Data.prototype.placeWorkBottle = function (roomId, playerId, cost, workAction) {
                                let room = this.rooms[roomId];
                                if (typeof room !== 'undefined') {
                                  let activePlacement = room.workPlacement;
                                  room.players[playerId].bottlesLeft -= 1;

                                  for(let i = 0; i < activePlacement.length; i += 1) {
                                    if( activePlacement[i].workAction === workAction &&
                                      activePlacement[i].playerId === null ) {
                                        activePlacement[i].playerId = playerId;
                                        //lägg till if satser / metod med if satser.
                                        if (workAction === 1){
                                          console.log("workaction 1: 1 bottle recycled");
                                          room.players[playerId].money -= cost; // olika för olika rounds
                                          room.players[playerId].totalBottles -= 1; //4th quarter
                                        }
                                        else if (workAction === 2) {
                                          console.log("workaction 2: 1 bottle recycled");
                                          room.players[playerId].money -= cost;
                                          room.players[playerId].totalBottles -= 1;
                                        }
                                        else if (workAction === 3) {//tar upp två kort när knapp 3 trycks på
                                          console.log("workaction 3: 2 cards added to your hand");
                                          this.drawCard(roomId, playerId);
                                          this.drawCard(roomId, playerId);
                                          room.players[playerId].money -= cost; //ska dra bort 1 coin
                                        }
                                        else if (workAction === 4) {
                                          console.log("workaction 4: 1 card added to your hand and you are now the first player (ska addas sen)");
                                          this.drawCard(roomId, playerId);
                                          //add 1st player token
                                        }
                                        else if (workAction === 5) {
                                          console.log("workaction 5: 1 card added to your hand, now choose 1 card from your hand to discard as future income ");
                                          this.drawCard(roomId, playerId);

                                          //chansning
                                          //HJÄLP 18/12
                                          //this.chooseIncomeCard(rommId, playerId);

                                          //room.players[playerId].income PUSHA hit
                                          //you must draw one card from the deck to your hand and place
                                          // one card from your hand face down next to your player board
                                          // on its right side
                                        }


                                        break;
                                      }
                                    }
                                  }
                                }

        //------------------------------------------------------------------------------------//

                                /* returns the hand of the player */
                                Data.prototype.getCards = function (roomId, playerId) {
                                  let room = this.rooms[roomId];
                                  if (typeof room !== 'undefined') {
                                    let i = room.players.map(d => d.playerId).indexOf(playerId)
                                    return room.players[i].hand;
                                  }
                                  else return [];
                                }

                                Data.prototype.getPlacements = function(roomId){
                                  let room = this.rooms[roomId];
                                  if (typeof room !== 'undefined') {
                                    return { buyPlacement: room.buyPlacement,
                                      skillPlacement: room.skillPlacement,
                                      auctionPlacement: room.auctionPlacement,
                                      //HÄR VILL VI LÄGGA TILL workPlacement
                                      workPlacement: room.workPlacement,
                                      marketPlacement: room.marketPlacement }
                                    }
                                    else return {};
                                  }

                                  Data.prototype.getItemsOnSale = function(roomId){
                                    let room = this.rooms[roomId];
                                    if (typeof room !== 'undefined') {
                                      return room.itemsOnSale;
                                    }
                                    else return [];
                                  }

                                  Data.prototype.getMarketValues = function(roomId){
                                    let room = this.rooms[roomId];
                                    if (typeof room !== 'undefined') {
                                      let mv = { fastaval: 0,
                                        movie: 0,
                                        technology: 0,
                                        figures: 0,
                                        music: 0 };

                                        for (let cardIndex in room.market) {
                                          mv[room.market[cardIndex].market] += 1;
                                        }
                                        return mv;
                                      }
                                      else return [];
                                    }

                                    Data.prototype.getMarket = function(roomId){
                                      let room = this.rooms[roomId];
                                      if (typeof room !== 'undefined') {
                                        return room.market;
                                      }
                                      else return [];
                                    }

                                    Data.prototype.getSkillsOnSale = function(roomId){
                                      let room = this.rooms[roomId];
                                      if (typeof room !== 'undefined') {
                                        return room.skillsOnSale;
                                      }
                                      else return [];
                                    }

                                    Data.prototype.getAuctionCards = function(roomId){
                                      let room = this.rooms[roomId];
                                      if (typeof room !== 'undefined') {
                                        return room.auctionCards;
                                      }
                                      else return [];
                                    }

                                    Data.prototype.getAuctionSpot = function(roomId){
                                      let room = this.rooms[roomId];
                                      if (typeof room !== 'undefined') {
                                        return room.auctionSpot;
                                      }
                                      else return [];
                                    }

                                    module.exports = Data;
