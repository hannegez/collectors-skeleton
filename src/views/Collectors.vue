<template>
  <div id="wrapper">
    <main>
      <h1>PLAYER INFO</h1>
       <p>Players: {{players}}</p>
      <p>marketValues: {{marketValues}}</p>

      <h2>FAKE MONEY</h2>
      <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
      </button>

      <!--  sätt nr 2 -->
     <div id="drawCard" class="buttons">
        <p class="buttonText">{{ labels.draw }}</p>
        <input type="image" @click="drawCard" class="imgButton" alt="Login"
         src='/images/card_backside300px.png' value="Draw card">    <!-- NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY -->
      </div>
<!--
      <h2>DRAW CARD</h2>
      <div class="buttons">
        <button @click="drawCard">        NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY
          {{ labels.draw }}
        </button>
      </div>
 -->


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

       <h2>Your hand</h2>
       <div class="cardslots" v-if="players[playerId]">
         <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="chooseAction(chosenAction, card)" :key="index"/>
       </div>

      <h2>Your items </h2>
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
      :placement="skillPlacement"
      @chooseAction="chooseAction(chosenAction, $event)"
      @placeBottle="placeBottle('skill', $event)"/>

     <h1>Auction</h1>
     <CollectorsStartAuction v-if="players[playerId]"
       :labels="labels"
       :player="players[playerId]"
       :auctionCards="auctionCards"
       :auctionSpot = "auctionSpot"
       :marketValues="marketValues"
       :placement="auctionPlacement"
       @chooseAction="chooseAction(chosenAction, $event)"
       @placeBottle="placeBottle('auction', $event)"/>



      <h1>Work</h1>
      <CollectorsStartWork v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :marketValues="marketValues"
        :placement="workPlacement"
        @startWork="startWork($event)"
        @placeWorkBottle="placeWorkBottle( $event)"/>



<!--:raiseValueOnSale="raiseValueOnSale" tagit bort från nedan-->
      <h1>Raise Value</h1>
      <CollectorsRaiseValue v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :market="market"
        :marketValues="marketValues"
        :auctionCards="auctionCards"
        :skillsOnSale="skillsOnSale"
        :placement="marketPlacement"
        @raiseValue="raiseValue($event)"
        @placeBottle="placeBottle('market', $event)"/>



      <div class="popup" style= "position:relative; left:0; top:0em;">
        <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo($event)" >
        <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
      </div>





      <!-- Här vill jag lägga in ett grid med uppdelade grids inuti, se Style längre ned.
i collectors.vue ska det finnas en grid som sammanställer mer detaljerade grid i respektive komponent ex från buy actions. Detta har jag dock inte fått till..
Från Mikael:
1. Att lägga ett element i en komponent betyder att du också flyttar över relevant CSS till komponenten. Föräldrakomponenten behöver då inte bry sig om denna alls. Så flytta allt som har med “pink” att göra till komponenten.

Se css längre ned /dani

    -->
        <div class="container">

            <div class="box green">
              <div class="box arrowGreen">pilar</div>
              <div class="box bottleGreen">flaskor</div>
              <div class="box greens">enfärg</div>
              <div class="box greenInfo" style= "position:relative; left:0; top:0em;" @click="getInfo($event)">
              <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
              </div>
            </div>

            <div id="right-board">
              <PlayerBoard/>
            </div>
            <div id="middle-board" class="popup">
              <!-- <possibleActions/> -->
            </div>
          </div>


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
import CollectorsRaiseValue from '@/components/CollectorsRaiseValue.vue'
import CollectorsStartAuction from '@/components/CollectorsStartAuction.vue'
import CollectorsStartWork from '@/components/CollectorsWork.vue'

//import PlayerBoard from '@/components/PlayerBoard.vue'   /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/

/* VUE-objekt för spelet*/
export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsGainSkill,
    CollectorsRaiseValue,
    CollectorsStartAuction,
    CollectorsStartWork,
  //  PlayerBoard,                                /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/                                                                                                                                                           /*HÄÄÄÄÄÄÄÄÄÄR*/
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
      workPlacement: [],

      //HÄR LÄGGER VI TILL workPlacement
      //workPlacement: [],
      chosenWorkAction: null, //bajs
      chosenPlacementCost: null,
      chosenAction: null,           //MAJA LA TILL DENNA
      marketValues: { fastaval: 0,
                     movie: 0,
                     technology: 0,
                     figures: 0,
                     music: 0 },
    //  raiseValueOnSale: [],
      market: [],
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],
      auctionSpot: [], // TEST??

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
  //     this.raiseValueOnSale = d.raiseValueOnSale;
       this.marketValues = d.marketValues;
       this.market = d.market;
       this.skillsOnSale = d.skillsOnSale;
       this.auctionCards = d.auctionCards;
       this.auctionSpot = d.auctionSpot;
       //NÅTT SOM OVAN FAST MED WORK
       this.buyPlacement = d.placements.buyPlacement;
       this.skillPlacement = d.placements.skillPlacement;
       this.marketPlacement = d.placements.marketPlacement;
       this.auctionPlacement = d.placements.auctionPlacement;
       this.workPlacement = d.placements.workPlacement;
     }.bind(this));

   this.$store.state.socket.on('collectorsBottlePlaced',
     function(d) {
       this.buyPlacement = d.buyPlacement;
       this.skillPlacement = d.skillPlacement;
       this.marketPlacement = d.marketPlacement;
       this.auctionPlacement = d.auctionPlacement;
      }.bind(this));

      this.$store.state.socket.on('collectorsWorkBottlePlaced',
        function(d) {
          this.players= d.players;
          this.placements = d.placements;
          this.workPlacement = d.placements.workPlacement;

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

    this.$store.state.socket.on('collectorsValueRaised',
      function(d) {
        console.log(d.playerId, "raised a value");
        this.players = d.players;
//        this.raiseValueOnSale = d.raiseValueOnSale;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.marketValues = d.marketValues;
        this.market = d.market;
      }.bind(this)
    );

    this.$store.state.socket.on('collectorsAuctionStarted',
      function(d) {
        console.log(d.playerId, "started an auction");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.auctionSpot = d.auctionSpot; //TEST ???
      }.bind(this)
    );
    this.$store.state.socket.on('collectorsWorkStarted',
      function(d) {
        console.log(d.playerId, "started Work");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.auctionSpot = d.auctionSpot; //TEST ???
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
    chooseAction(action, card){
      console.log("action utskrift", action);
      if (action === "buy") {
        this.buyCard(card);
      }
      else if (action === "skill") {
        this.gainSkill(card);
      }
      else if (action === "auction") {
        this.startAuction(card);
      }
      else if (action === "market") {
        this.raiseValue(card);
      }
      /* HÄR LÄGGER VI SEN TILL workPlacement: */
      else if (action === "work") {
        this.startWork(card); /*måste ändras*/
      //  work(card);
    }
    },




    selectAll: function (n) {
      n.target.select();
    },
    placeBottle: function (action, cost) { /* skicka till server och gör förändring där.*/
      this.chosenPlacementCost = cost;
      this.chosenAction = action;
      this.$store.state.socket.emit('collectorsPlaceBottle', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          action: action,
          cost: cost,
        }
      );
    },
    placeWorkBottle: function (p) { /* skicka till server och gör förändring där.*/

      this.chosenPlacementCost = p.cost;
      this.chosenAction = "work";
      this.chosenWorkAction= p.workAction;
      this.$store.state.socket.emit('collectorsPlaceWorkBottle', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          action: "work",
          cost: p.cost,
          workAction:p.workAction,
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

    startAuction: function (card) {
      console.log("startAuction", card);
      this.$store.state.socket.emit('CollectorsStartAuction', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost
        }
      );
    },
    startWork: function (card) {
      console.log("startWork", card);
      this.$store.state.socket.emit('CollectorsStartWork', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost,
          workAction:this.chosenWorkAction
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

    raiseValue: function (card) {
      console.log("raiseValue", card);
      this.$store.state.socket.emit('collectorsRaiseValue', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost     //placeringskostnad
        }
      );
    },

    /*funktion för att ge popup när man trycker på informationen i gameboardet //dani*/
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
/*Här ligger gridsen, uppdelade genom att placera de små gridsen i den stora. De små ska flyttas till respektive komponent. /Dani*/
#wrapper { color: #000; }


.container {
  display: grid;
  height: 1000px;
  width: 1200px;
  padding-left: 200px;
  padding-bottom: 200px;
  grid-template-columns: 1fr 1fr 1fr ;
  grid-template-rows: 1fr 2fr 2fr 1fr ;
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

.bottleBlue{
  grid-area: d;

  background: url('/images/blaflaska.PNG' ) ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.char{
  grid-area: e;
  background: url('/images/pilbla.PNG' ) ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.blues{
  grid-area: h;
  background: url('/images/bla.PNG' ) ;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.blueInfo{
  grid-area: f;
  background: url('/images/raiseValue.PNG' ) ;
  background-size: 100% 100%;
  background-repeat: no-repeat;

}

/*påbörjar den gröna rosa delen*/
.green{
  grid-area: lside;
  display: grid;
  grid-template-columns: 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;

  grid-template-areas:
    " i j "
    " k l "
    " k l "
    " k l "
    " k l "
    " k l ";
}
.arrowGreen{
  grid-area: k;
  background: url('/images/pilgron.PNG' ) ;
  background-repeat: no-repeat;
  background-size: 30% 95%;

  #collectors-board {
    display: grid;
    grid-gap: 0;
    grid-template-columns: 1fr 1fr;

    grid-template-areas:
      "game-board middle-boards player-boards";

  }

  #wrapper {
    color: black;
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
