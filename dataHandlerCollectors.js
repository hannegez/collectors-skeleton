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
  room.playerColors = ['731F6D', '4E4E4E', '19B3A7', 'BF8F65']; //lila, grå, turkos, beige
  room.lang = lang;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  // room.raiseValueOnSale = room.deck.splice(0, 4); //TA BORT raiseValueOnSale
  room.auctionSpot = [];
  room.quarter=1;
  room.market = [];
  this.resetPlacements(room);
  this.rooms[roomId] = room;
  }

  Data.prototype.resetPlacements = function(room) {

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
        room.marketPlacement = [{cost:0, playerId: null},
                                {cost:-2, playerId: null},
                                {cost:0, playerId: null} ];
        room.workPlacement = [ {cost:0, playerId: null, workAction: 1 , numberOfActions:2},
                                {cost:-1, playerId: null, workAction: 2, numberOfActions:1},
                                {cost:1, playerId: null, workAction: 3, numberOfActions:1},
                                {cost:0, playerId: null, workAction: 4, numberOfActions:1},
                                {cost:0, playerId: null, workAction: 5, numberOfActions:1},]
}
Data.prototype.resetSecondQuarterPlacements = function(room) {
      room.workPlacement = [ {cost:-1, playerId: null, workAction: 1, numberOfActions:2},
                              {cost:-1, playerId: null, workAction: 2, numberOfActions:1},
                              {cost:1, playerId: null, workAction: 3, numberOfActions:1},
                              {cost:0, playerId: null, workAction: 4, numberOfActions:1},
                              {cost:0, playerId: null, workAction: 5, numberOfActions:1},]
}
Data.prototype.resetThirdQuarterPlacements = function(room) {
      room.workPlacement = [ {cost:-2, playerId: null, workAction: 1, numberOfActions:2},
                              {cost:-1, playerId: null, workAction: 2, numberOfActions:1},
                              {cost:1, playerId: null, workAction: 3, numberOfActions:1},
                              {cost:0, playerId: null, workAction: 4, numberOfActions:1},
                              {cost:0, playerId: null, workAction: 5, numberOfActions:1},]
}
Data.prototype.resetFourthQuarterPlacements = function(room) {
      room.workPlacement = [ {cost:-3, playerId: null, workAction: 1, numberOfActions:1},
                              {cost:-1, playerId: null, workAction: 2, numberOfActions:1},
                              {cost:1, playerId: null, workAction: 3, numberOfActions:1},
                              {cost:0, playerId: null, workAction: 4, numberOfActions:1},
                              {cost:0, playerId: null, workAction: 5, numberOfActions:1},]
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
      //        console.log("går in i draw card");
              let card = room.deck.pop();
              room.players[playerId].hand.push(card);
              return room.players;
            }
            else return [];
          }

          Data.prototype.getMoney = function (roomId, playerId) {
            let room = this.rooms[roomId];
            if (typeof room !== 'undefined') {
              room.players[playerId].money ++;
              /*  room.money[player] += 1; */
              room.players[playerId].money;
              return room.players;
            }
          }
          // HÄR SKA KORTEN FLYTTAS
          Data.prototype.nextQuarter = function (roomId) {
            let room = this.rooms[roomId];
            if (typeof room !== 'undefined') {
              room.quarter ++;
              if(room.quarter === 5){
                room.quarter=1;
              }

              this.resetPlacements(room);
              for (let playerId in room.players) {
              //  console.log("nextQuarter " + room.players[playerId].bottlesLeft + room.players[playerId].totalBottles);
                room.players[playerId].bottlesLeft=room.players[playerId].totalBottles;
              }
              if(room.quarter === 2){
                this.resetSecondQuarterPlacements(room);
              }
              else if(room.quarter === 3){
                this.resetThirdQuarterPlacements(room);
              }
              else if(room.quarter === 4){
                this.resetFourthQuarterPlacements(room);
              }

              //this.moveCards(room);

            }
          }

          //EN BÖRJAN PÅ ETT FÖRSÖK TILL MOVECARDS, LYCKADES INTE KOMMA ÅT SJÄLVA KORTEN,
          //MEN ARRAYEN SKRIVS UT RÄTT
          Data.prototype.moveCards = function (room) {
            console.log("HÄR ÄR SKILLS ON SALE:", room.skillsOnSale);
            console.log("LÄNGDEN", room.skillsOnSale.length);

            //MOVE TO RAISEVALUE
            let card = null;
            console.log(card);
            for (let i=0; i < room.skillsOnSale.length; i++) {
              console.log("inne i for-loop");
              card = room.skillsOnSale[i];
              if (card !== {}) {
                console.log("inne i if-satsen för", card)
                this.market.push(...card);
                break;
                //pusha till raiseValue, ta bort från skillsOnsale
                //break
              }
            }

          }

          Data.prototype.getQuarter= function(roomId){
            let room = this.rooms[roomId];

            if (typeof room !== 'undefined') {
              return room.quarter;
            }
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
                  room.players[playerId].itemCounter[card.item].value ++;

                }
              }















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
                        color: room.playerColors.shift(),
                        skills: [],
                        items: [],
                        itemCounter:  { fastaval:       { image: '/images/item_fastaval.png',
                                                          value: 0 },
                                        figures:        { image: '/images/item_figures.png',
                                                          value: 0 },
                                        music:          { image: '/images/item_music.png',
                                                          value: 0 },
                                        movie:          { image: '/images/item_movie.png',
                                                          value: 0 },
                                        technology:     { image: '/images/item_technology.png',
                                                          value: 0 }
                                    },
                       skillCounter:  { workerIncome:   { image: '/images/skills_workerIncome.png',
                                                          value: 0 },
                                        workerCard:     { image: '/images/skills_workerCard.png',
                                                          value: 0 },
                                        bottle:         { image: '/images/skills_bottle.png',
                                                          value: 0 },
                                        auctionIncome:  { image: '/images/skills_auctionIncome.png',
                                                          value: 0 },
                                        vp:             { image: '/images/skills_VP-.png',
                                                          value: 0 },
                                        vpAll:          { image: '/images/skills_VP-all.png',
                                                          value: 0 }
                                     },
                        skillCounter_VP: { vp_fastaval:     { image: '/images/skills_VP-fastaval.png',
                                                              value: 0 },
                                           vp_figures:      { image: '/images/skills_VP-figures.png',
                                                              value: 0 },
                                           vp_music:        { image: '/images/skills_VP-music.png',
                                                              value: 0 },
                                           vp_movie:        { image: '/images/skills_VP-movie.png',
                                                              value: 0 },
                                           vp_technology:   { image: '/images/skills_VP-technology.png',
                                                              value: 0 },
                                     },
                        income: [],
                        futureIncome: 0,
                        secret: [],
                        totalBottles: 2,
                        bottlesLeft: 2};
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
                            //försök till number of actions men har inte fått ihop det.
                            Data.prototype.startWork = function (roomId, playerId, card, cost, workAction, numberOfActions) { // bör läggas till workAction?
                              let room = this.rooms[roomId];
                              if (typeof room !== 'undefined') {
                                room.players[playerId].futureIncome += 1;

                                let c = null;
                                for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
                                  if (room.players[playerId].hand[i].x === card.x &&
                                    room.players[playerId].hand[i].y === card.y) {
                                      c = room.players[playerId].hand.splice(i,1);
                                      break;
                                    }
                                  }
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

                                if (card.skill === 'bottle') {
                                  room.players[playerId].totalBottles += 1;
                                  room.players[playerId].bottlesLeft += 1;
                                }

                                //SKILLCOUNTERS
                                if (card.skill === 'workerIncome' || card.skill === 'workerCard' ||
                                    card.skill === 'bottle' || card.skill === 'auctionIncome') {
                                  room.players[playerId].skillCounter[card.skill].value ++;
                                }

                                //HÄRIFRÅN FICK DET BLI FULKOD PGA card.skill heter VP-
                                //och dataHandler kunde ej hantera stora bokstäver och -
                                else if (card.skill === 'VP-all') {
                                  room.players[playerId].skillCounter['vpAll'].value ++;
                                }
                                else {
                                  room.players[playerId].skillCounter['vp'].value ++;
                                  if (card.skill === 'VP-fastaval') {
                                    room.players[playerId].skillCounter_VP['vp_fastaval'].value ++;
                                  }
                                  else if (card.skill === 'VP-figures') {
                                    room.players[playerId].skillCounter_VP['vp_figures'].value ++;
                                  }
                                  else if (card.skill === 'VP-music') {
                                    room.players[playerId].skillCounter_VP['vp_music'].value ++;
                                  }
                                  else if (card.skill === 'VP-movie') {
                                    room.players[playerId].skillCounter_VP['vp_movie'].value ++;
                                  }
                                  else if (card.skill === 'VP-technology') {
                                    room.players[playerId].skillCounter_VP['vp_technology'].value ++;
                                  }
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
                            //försök till number of actions men har inte fått ihop det.
                            Data.prototype.placeWorkBottle = function (roomId, playerId, cost, workAction, numberOfActions) {
                              let room = this.rooms[roomId];
                              if (typeof room !== 'undefined') {
                                let activePlacement = room.workPlacement;
                                room.players[playerId].bottlesLeft -= 1;

                                for(let i = 0; i < activePlacement.length; i += 1) {

                                  if( activePlacement[i].workAction === workAction &&
                                    activePlacement[i].playerId === null ) {
                                      activePlacement[i].playerId = playerId;

                                      if (workAction === 1 && room.quarter === 1){
                                        console.log("workaction 1: lap1: 2 on future income");


                                      //  room.players[playerId].bottlesLeft -= 1; //4th quarter
                                      }
                                      else if (workAction === 1 && room.quarter === 2){
                                        console.log("workaction 1: lap2: 1 coin 2 on future income");
                                        room.players[playerId].money + 1; // olika för olika rounds
                                      //  room.players[playerId].bottlesLeft -= 1; //4th quarter
                                      }
                                      else if (workAction === 1 && room.quarter === 3){
                                        console.log("workaction 1: lap3: 2 coin 2 on future income");
                                        room.players[playerId].money + 2; // olika för olika rounds
                                      //  room.players[playerId].bottlesLeft -= 1; //4th quarter
                                      }
                                      else if (workAction === 1 && room.quarter === 4){
                                        console.log("workaction 1: lap4: 1 bottle recycled");
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
