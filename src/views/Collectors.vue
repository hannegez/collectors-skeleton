<template>
  <div>
    <main>
      {{buyPlacement}} {{chosenPlacementCost}}
      <!-- OBS : och @ är förkortning för v-bind: och v-on:
           VILL VI BYTA NAMN TILL CollectorsBuyItem och till @butItem="buyItem($event) och ändra från buy till item typ?"  -->
     <CollectorsBuyActions v-if="players[playerId]"
       :labels="labels"
       :player="players[playerId]"
       :itemsOnSale="itemsOnSale"
       :marketValues="marketValues"
       :placement="buyPlacement"
       @buyCard="buyCard($event)"
       @placeBottle="placeBottle('buy', $event)"/>

      <div class="buttons">
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>

      Skills
     <div class="cardslots">
       <CollectorsCard v-for="(card, index) in skillsOnSale" :card="card" :key="index"/>
     </div>

     <!-- DETTA VILL VI HA:
     <CollectorsGetSkill v-if="players[playerId]"
       :labels="labels"
       :player="players[playerId]"
       :skillsOnSale="skillsOnSale" //kopiera från buy action
       :placement="buyPlacement"
       @getSkill="getSkill($event)"
       @placeBottle="placeBottle('skill', $event)"/>
     -->

     Auction
     <div class="cardslots">
       <CollectorsCard v-for="(card, index) in auctionCards" :card="card" :key="index"/>
     </div>
     Hand
     <div class="cardslots" v-if="players[playerId]">
       <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="buyCard(card)" :key="index"/>
     </div>
     Items
     <div class="cardslots" v-if="players[playerId]">
       <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
      </div>
      <div class="popup" style= "position:relative; left:0; top:0em;">
        <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo($event)" >
        <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
      </div>
      <!-- TESTAR HÄR ATT FÅ IN GAME BOARD -->
          <div id="collectors-board">
            <div id="left-board">
              <GameBoard/>
            </div>

            <div id="right-board">
              <PlayerBoard/>
            </div>
            <div id="middle-board" class="popup">
              <possibleActions/>
<!-- NÅNTING MED WORK HÄR -->
            </div>
          </div>


            <!--allt för popup-->
            <!--<div class="popup" style= "position:relative; left:20%; top:18em;">
              <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo" >
              <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
            </div>-->
          </main>
          {{players}}
{{marketValues}}
<button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>
    <footer>
        <p> /*kan välja att skriva vanlig text här..*/
          {{ labels.invite }}
          <input type="text" :value="publicPath + $route.path" @click="selectAll" readonly="readonly">
        </p>
    </footer>
  </div>
</template>

      <!--allt för popup-->
      <!--<div class="popup" style= "position:relative; left:20%; top:18em;">
        <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo" >
        <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
      </div>-->


<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from '@/components/CollectorsCard.vue'
import CollectorsBuyActions from '@/components/CollectorsBuyActions.vue'
import GameBoard from '@/components/GameBoard.vue'                            /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
import PlayerBoard from '@/components/PlayerBoard.vue'   /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
import possibleActions from '@/components/infoBoxes.vue'                                                                                                                        /*HÄÄÄÄÄÄÄÄÄÄR*/

/* VUE-objekt för spelet*/
export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    GameBoard,                                                                 /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
    PlayerBoard,                                /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
    possibleActions                                                                                                                                                               /*HÄÄÄÄÄÄÄÄÄÄR*/
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      maxSizes: { x: 0,
                  y: 0 },
      labels: {},                                                           //ALLT ÄR TOMT, VÄRDENA SÄTTS LÄNGRE NER
      players: {},
      // playerId: {
      //   hand: [],
      //   money: 1,
      //   points: 0,
      //   skills: [],
      //   items: [],
      //   income: [],
      //   secret: []
      // }
      buyPlacement: [],
      skillPlacement: [],
      auctionPlacement: [],
      marketPlacement: [],

      //HÄR LÄGGER VI TILL workPlacement
      //workPlacement: [],

      chosenPlacementCost: null,
      marketValues: { fastaval: 0,
                     movie: 0,
                     technology: 0,
                     figures: 0,
                     music: 0 },
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],

      //NÅTT LIKNANDE SOM OVAN FAST FÖR WORK?

      playerid: 0
    }
  },
  computed: {
    playerId: function() { return this.$store.state.playerId}
  },
  watch: {
    players: function(newP, oldP) {
      console.log(newP, oldP)
      for (let p in this.players) {
        for(let c = 0; c < this.players[p].hand.length; c += 1) {
          if (typeof this.players[p].hand[c].item !== "undefined")
          this.$set(this.players[p].hand[c], "available", false);
        }

         }
       }
     },
     created: function () {
       this.$store.commit('SET_PLAYER_ID', this.$route.query.id)
       //TODO! Fix this ugly hack
       //background: https://github.com/quasarframework/quasar/issues/5672
       const newRoute = this.$route.params.id + "?id=" + this.playerId;
       if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
         this.$router.push(newRoute);
       this.$store.state.socket.emit('collectorsLoaded',
         { roomId: this.$route.params.id,
           playerId: this.playerId } );


    this.$store.state.socket.on('collectorsInitialize',    //HÄR LÄGGER VI TILL ALLA VÄRDEN SOM SKICKATS I OBJEKTET I socketsCollectors.js
      function(d) {
        this.labels = d.labels;
        this.players = d.players;
       this.itemsOnSale = d.itemsOnSale;
       this.marketValues = d.marketValues;
       this.skillsOnSale = d.skillsOnSale;
       this.auctionCards = d.auctionCards;
       //NÅTT SOM OVAN FAST MED WORK
       this.buyPlacement = d.placements.buyPlacement;
       this.skillPlacement = d.placements.skillPlacement;
       this.marketPlacement = d.placements.marketPlacement;
       this.auctionPlacement = d.placements.auctionPlacement;
       //this.workPlacement = d.placements.workPlacement;
     }.bind(this));
   this.$store.state.socket.on('collectorsBottlePlaced',
     function(d) {
       this.buyPlacement = d.buyPlacement;
       this.skillPlacement = d.skillPlacement;
       this.marketPlacement = d.marketPlacement;
       this.auctionPlacement = d.auctionPlacement;
       //this.workPlacement = d.workPlacement;
      }.bind(this));

         this.$store.state.socket.on('collectorsPointsUpdated', (d) => this.points = d );

             this.$store.state.socket.on('collectorsCardDrawn',
               function(d) {
                   //this has been refactored to not single out one player's cards
                   //better to update the state of all cards
                   this.players = d;
               }.bind(this)
    );


    this.$store.state.socket.on('collectorsCardBought',
      function(d) {
        console.log(d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
      }.bind(this)
    );
  },
  methods: {
    selectAll: function (n) {
      n.target.select();
    },
    placeBottle: function (action, cost) {
      this.chosenPlacementCost = cost;
      this.$store.state.socket.emit('collectorsPlaceBottle', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          action: action,
          cost: cost,
        }
      );
    },
    drawCard: function () {
      this.$store.state.socket.emit('collectorsDrawCard', {
          roomId: this.$route.params.id,
          playerId: this.playerId
        }
      );
    },
    buyCard: function (card) {
      console.log("buyCard", card);
      this.$store.state.socket.emit('collectorsBuyCard', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.marketValues[card.market] + this.chosenPlacementCost
        }
      );
    },
    getInfo: function(event){

        var popup = document.getElementById("myPopup");
      //  console.log(popup);
        popup.classList.toggle("show");
        popup.style.left=event.clientX - event.target.getBoundingClientRect().x +"px";
        popup.style.top=event.clientY - event.target.getBoundingClientRect().y - 70+"px"  ;
        console.log(popup.style, event.clientX, event.clientY);

    }
  },
}
</script>
<!--  /*getInfo: function(){
    console.log("bajs");
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
},*/-->




<style scoped>
  #collectors-board {
    display: grid;
    grid-gap: 0;
    grid-template-columns: 1fr 1fr;

    grid-template-areas:
      "game-board middle-boards player-boards";

  }

  #left-board { grid-area: game-board; }
  #right-board { grid-area: player-boards; }
  #middle-board {grid-area: middle-boards }


  header {
    user-select: none;
    position: fixed;
    width:100%;
    pointer-events: none;
  }
  main {
    user-select: none;
  }
  footer {
    margin-top: 5em auto;
  }
  footer a {
    text-decoration: none;
    border-bottom: 2px dotted ivory;
  }
  footer a:visited {
    color:ivory;
  }
  .cardslots {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
    grid-template-rows: repeat(auto-fill, 180px);
  }
  .cardslots div {
    transform: scale(0.5)translate(-50%,-50%);
    transition:0.2s;
    transition-timing-function: ease-out;
    z-index: 0;
  }
  .cardslots div:hover {
    transform: scale(1)translate(-25%,0);
    z-index: 1;
  }
  /*allt för popup*/

  .popuptext {
  position: absolute;
  display: none;
  cursor: pointer;

  user-select: none;


  width: 160px;
  background-color: pink;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;

  z-index: 1;

  margin-left: -80px;
}


.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 10px;
  border-style: solid;
  border-color: pink transparent transparent transparent;
}


.popup .show {
  display: block;
} /*nu fungerar de*/


@media screen and (max-width: 800px) {
  main {
    width:90vw;
  }
}
</style>
