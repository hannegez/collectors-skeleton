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

      <h1 >Skills </h1>
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

     <h1 >Auction </h1>
     <div class="cardslots">
       <CollectorsCard v-for="(card, index) in auctionCards" :card="card" :key="index"/>
     </div>
     <h1 > Hand </h1>
     <div class="cardslots" v-if="players[playerId]">
       <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="buyCard(card)" :key="index"/>
     </div>
     <h1 > Items </h1>
     <div class="cardslots" v-if="players[playerId]">
       <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
      </div>
  <!--  <div class="popup" style= "position:relative; left:0; top:0em;">
        <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo($event)" >
        <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
      </div>-->
      <!-- TESTAR HÄR ATT FÅ IN GAME BOARD -->

      <!--  <div class="popup" style= "position:relative; left:0; top:0em;">
            <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo($event)" >
            <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
          </div>-->




        <div class="container">
              <div class="box pink"> <!-- detta ska på något sätt flyttas till collectors buyaction alla ovan ska delas upp -->
                  <div class="box arrow">pilar</div>
                  <div class="box bottlePink">flaskor</div>
                  <div class="box pinks">enfärg</div>
                  <div class="box pinkInfo" style= "position:relative; left:0; top:0em;" @click="getInfo($event)">
                  <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
                    </div>
              </div>
            <div class="box green">top</div>
            <div class="box yellow">lside</div>
            <div class="box blue">
              <div class="box char">karaktar</div>
              <div class="box bottleBlue">flaskor</div>
              <div class="box blues">enfärg</div>
              <div class="box blueInfo" style= "position:relative; left:0; top:0em;" @click="getInfo($event)">
              <span class="popuptext" id="myPopup"> raise value gör det här och det här</span>
                </div>
            </div>
            <div class="box beige">rside</div>

          </div>
    <!--        <div class="itemGameBoard">
              <GameBoard/>
            </div>

            <div class="itemPlayerBoard">
              <PlayerBoard/>
            </div>
            <div class="itemPossibleActions" >
              <possibleActions/>
            </div>  -->
            <!-- NÅNTING MED WORK HÄR -->
        <!--     <div class="itemRosa" >
              pink
                <apinkBG/>
            </div>
            <div class="itemGron" >
              green


            </div>
            <div class="itemGul" >
              yellow

            </div>
            <div class="itemBeige" >
              beige

            </div>
            <div class="itemBlue" >
              blue

            </div>

              pink
            </div>
            <div class="bottleOne" >
                <bottlePayOne/>
            </div> -->
      <!--     </div>-->


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
//import GameBoard from '@/components/GameBoard.vue'                            /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
//import PlayerBoard from '@/components/PlayerBoard.vue'   /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
//import possibleActions from '@/components/infoBoxes.vue'
//import apinkBG from '@/components/pinkBG.vue'
//import agreenBG from '@/components/greenBG.vue'
//import abeigeBG from '@/components/beige.vue'
//import bottlePayOne from '@/components/bottleone.vue'                                                                                                                    /*HÄÄÄÄÄÄÄÄÄÄR*/

/* VUE-objekt för spelet*/
export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
//    bottlePayOne
//    GameBoard,                                                                 /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
//    PlayerBoard,                                /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
//    possibleActions,
//    apinkBG,
//    agreenBG,
//    abeigeBG,
//    ayellowBG                                                                                                                                              /*HÄÄÄÄÄÄÄÄÄÄR*/
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
/*nytt försök med grids*/

.container {
  display: grid;
  height: 500px;
  width: 1000px;
  grid-template-columns: 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr ;
  grid-template-areas:
    "topp topp topp"
    "lside mside rside "
    "lside mside rside "
    "bottoms bottoms bottoms" ;
  }
.green {
  grid-area: lside;
  background: #dfeccc;
}
.yellow {
  grid-area: mside;
  background: #f5f2cc;
}
.beige{
  grid-area: rside;
  background: #f5f1e2;
}

/*påbörjar den rosa delen*/
.pink{
  grid-area: topp;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr ;
  grid-template-areas:
    " a a a a a c"
    " b b b b b g ";
}
.arrow{
  grid-area: a;
  background: url('/images/pilrosa.PNG' ) ;
  min-width: 100%;
  min-height: 100%;
}
.bottlePink{
  grid-area: b;
  background: url('/images/rosaflaska.PNG' ) ;
  min-width: 100%;
  min-height: 100%;
  object-fit: contain;

}
.pinks{
  grid-area: c;
  background: url('/images/rosa.PNG' ) ;
  object-fit: contain;
}
.pinkInfo{
  grid-area: g;
  background: url('/images/buyItem.PNG' ) ;
}

/*påbörjar den blåa delen*/
.blue{
  grid-area: bottoms;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr ;
  grid-template-areas:
    " d d d d d f"
    " e e e e e h ";
}

.char{
  grid-area: e;
  background: url('/images/pilbla.PNG' ) ;
  min-width: 100%;
  min-height: 100%;
}
.bottleBlue{
  grid-area: d;

  background: url('/images/blaflaska.PNG' ) ;
  min-width: 100%;
  min-height: 100%;
  object-fit: contain;

}
.blues{
  grid-area: h;
  background: url('/images/bla.PNG' ) ;
}

.blueInfo{
  grid-area: f;
  background: url('/images/raiseValue.PNG' ) ;
}






/*
    /display: grid;
    grid-template-columns: repeat(4, 100px);

    grid-template-rows: repeat(4, 100px);

    grid-template-areas:
    "ro ro ro ro "
    "gr gu be be "
    "gr gu be be "
    "gr bl bl bl  "
    ;




  }


  .itemRosa {
  grid-area: ro;
  background: #f8dcce;

}

.itemGron {
  grid-area: gr;
  background: #dfeccc;
}

.itemGul{
  grid-area: gu;
  background: #f5f2cc;
}

.itemBeige{
  grid-area: be;
  background: #f5f1e2;
}
.itemBlue{
  grid-area: bl;
  background: #cfdcf2;
}
.bottleOne{
  grid-area: b1;
}*/



h1{
  color: black;
}


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


.box .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 10px;
  border-style: solid;
  border-color: pink transparent transparent transparent;
}


.box .show {
  display: block;
} /*nu fungerar de*/


@media screen and (max-width: 800px) {
  main {
    width:90vw;
  }
}
</style>
