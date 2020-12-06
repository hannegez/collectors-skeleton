<template>
  <div id="wrapper">
    <main>
      <!-- OBS : och @ är förkortning för v-bind: och v-on: -->
      <h1>Items</h1>
     <CollectorsBuyActions v-if="players[playerId]"
       :labels="labels"
       :player="players[playerId]"
       :itemsOnSale="itemsOnSale"
       :marketValues="marketValues"
       :placement="buyPlacement"
       @buyCard="buyCard($event)"
       @placeBottle="placeBottle('buy', $event)"/>

       <p>buyPlacement: {{buyPlacement}}</p>
        <p>chosenPlacementCost: {{chosenPlacementCost}}</p>

       <h1>PLAYER INFO</h1>
        <p>Players: {{players}}</p>
       <p>marketValues: {{marketValues}}</p>

       <h2>FAKE MONEY</h2>
       <button v-if="players[playerId]" @click="players[playerId].money += 1">
       fake more money
       </button>

       <h2>DRAW CARD</h2>
       <div class="buttons">
         <button @click="drawCard">       <!-- NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY -->
           {{ labels.draw }}
         </button>
       </div>

       <!-- KARRO TESTAR DRA-KORT-HÖG
            OBS: den första knappen är bortkommenterad pga fett jävla svårt
            att ha responsiv, blir knas när jag ändrar width på .imgButton.
            Men den andra lyckas jag inte få text på själva knappen, men det
            kanske inte gör något, utan vi kanske kan ha den infon vid sidan av -->

      <!--  sätt nr 1 -->
       <!-- <div id="drawCard" class="buttons">
         <button class="imgButton" @click="drawCard">
           <p class="buttonText">{{ labels.draw }}</p>
           <img class="buttonImg" src='/images/card_backside300px.png'>
         </button>
      </div> -->

      <!--  sätt nr 2 -->
     <div id="drawCard" class="buttons">
        <p class="buttonText">{{ labels.draw }}</p>
        <input type="image" @click="drawCard" class="imgButton" alt="Login"
         src='/images/card_backside300px.png' value="Draw card">    <!-- NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY -->
      </div>


<!--Test på raise value
       <div class="buttons">
        <button @click="testRaiseValue">
          {{ labels.raiseValue }}
          testRaise
        </button>
      </div> -->

       <h2>Your hand</h2>
       <div class="cardslots" v-if="players[playerId]">
         <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="buyCard(card)" :key="index"/>
       </div>

      <h2> Your items </h2>
       <div class="cardslots" v-if="players[playerId]">
         <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
        </div>

        <h2>Your skills</h2>
        <div class="cardslots" v-if="players[playerId]">
          <CollectorsCard v-for="(card, index) in players[playerId].skills" :card="card" :key="index"/>
         </div>

    <h1>Skills</h1>
    <CollectorsGainSkill v-if="players[playerId]"
      :labels="labels"
      :player="players[playerId]"
      :skillsOnSale="skillsOnSale"
      :marketValues="marketValues"
      :placement="skillPlacement"
      @gainSkill="gainSkill($event)"
      @placeBottle="placeBottle('skill', $event)"/>

      DETTA KAN VI TA BORT SEN NÄR COLLECTORSGAINSKILL FUNKAR
        <h2>Skills on sale</h2>
     <!-- <div class="cardslots">
       <CollectorsCard v-for="(card, index) in skillsOnSale" :card="card" :key="index"/>
     </div> -->


     <h1>Auction</h1>
     <!--<CollectorsStartAuction/>-->
     <!-- <div class="cardslots">
       <CollectorsCard v-for="(card, index) in auctionCards" :card="card" :key="index"/>
     </div> -->

      <h1>Work</h1>
      <!-- <CollectorsWork/> -->

      <h1>Raise Value</h1>
      <!-- <CollectorsRaiseValue/> -->



      <div class="popup" style= "position:relative; left:0; top:0em;">
        <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo($event)" >
        <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
      </div>

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

    <footer>

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
import CollectorsGainSkill from '@/components/CollectorsGainSkill.vue'
//import CollectorsRaiseValue from '@/components/CollectorsRaiseValue.vue'
//import CollectorsStartAuction from '@/components/CollectorsStartAuction.vue'
//import CollectorsWork from '@/components/CollectorsWork.vue'
//import GameBoard from '@/components/GameBoard.vue'                            /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
//import PlayerBoard from '@/components/PlayerBoard.vue'   /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
//import possibleActions from '@/components/infoBoxes.vue'                                                                                                                        /*HÄÄÄÄÄÄÄÄÄÄR*/

/* VUE-objekt för spelet*/
export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsGainSkill,
//    CollectorsRaiseValue,
  //  CollectorsStartAuction,
    //CollectorsWork,
  //  GameBoard,                                                                 /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
  //  PlayerBoard,                                /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
  //  possibleActions                                                                                                                                                               /*HÄÄÄÄÄÄÄÄÄÄR*/
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

    this.$store.state.socket.on('collectorsSkillGained',
      function(d) {
        console.log(d.playerId, "gained a skill");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
      }.bind(this)
    );
  },        //END OF CREATED

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
    drawCard: function () {                                  /* NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY */
      this.$store.state.socket.emit('collectorsDrawCard', {
          roomId: this.$route.params.id,
          playerId: this.playerId
        }
      );
    },
    gainSkill: function (card) {
      console.log("gainSkill", card);
      this.$store.state.socket.emit('collectorsGainSkill', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost     //placeringskostnad
        }
      );
    },
    buyCard: function (card) {
      console.log("buyCard", card);
      this.$store.state.socket.emit('collectorsBuyCard', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.marketValues[card.market] + this.chosenPlacementCost     //marknadsvärde (raise value) + placeringskostnad
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

  // //TESTTEST
  //    testRaiseValue: function () {
  //      console.log("testRaiseValue");
  //      this.$store.state.socket.emit('collectorsTestRaiseValue', {
  //        roomId: this.$route.params.id,
  //        playerId: this.playerId
  //      }
  //    );
  //  }
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

  /*hitta hit, karro*/
  /* ========================= */
  /* DRAW CARD BUTTON */
  .imgButton {
    border: solid thin #787975;
    margin: 1em;
    border-radius: 10px;
    box-shadow: 2px 2px 3px #787975;
    width: 10%;
  }
  .imgButton:hover {
    box-shadow: inset 2px 2px 3px #787975;
    cursor: pointer;
  }
  .imgButton:focus {
    outline: none;
  }
  .buttonText, .buttonImg {
    margin: 0;
    padding: 0;
  }
  .buttonText {
    font-size: 2em;
    font-weight: bold;
    color: #3c3c3b;
  }

  /* ========================= */

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
