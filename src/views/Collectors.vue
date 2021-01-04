<template>
  <div id="wrapper">
    <header>
      <div id="welcome">
        <h1>Welcome to Rich Collectors</h1>
      </div>

      <div class="info left">
        <button class="buttons homeButton" v-on:click="getHowToInfo()"> {{ this.labels.rules }} </button>
        <div class="popup" style= "position:relative; left:0em; top:0em;">
        <span class="popupHowToInfoText" id="myHowToInfoPopup"  style= "left:0em; top:0em;">
          <!-- <a href="/images/rules_collectors.pdf" >Click here to open rules</a> -->
          <embed src="/images/rules_collectors.pdf" width="2000em" height="950em"/>
          <br>
          <button class="closeButton" v-on:click="getHowToInfo()" >close</button>
        </span>
        </div>

        <button class="buttons"> {{ this.labels.nextQuarter }}</button>

      </div>



      <div class="info right">
        <p class="gameLog">
          {{ this.labels.startLog }}
        </p>

        <!-- <p id="drawCardText">{{ this.labels.draw }}:</p> -->
        <input type="image" @click="drawCard" id="drawCardButton" alt="Login"
        src='/images/card_backside_flipped.png' value="Draw card"  >    <!-- NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY -->

        <!-- <button class="buttons" @click="player.money += 1">
          Fake money
        </button> -->

      </div>
    </header>

    <main>
      <div class="game board">
        <div class="item pool">
          <CollectorsBuyActions v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :itemsOnSale="itemsOnSale"
          :marketValues="marketValues"
          :placement="buyPlacement"
          @buyCard="buyCard($event)"
          @placeBottle="placeBottle('buy', $event)"
          @getInfo="getInfo('item')"/>
        </div>

        <div class="skill pool">
          <CollectorsGainSkill v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :skillsOnSale="skillsOnSale"
          :placement="skillPlacement"
          @chooseAction="chooseAction(chosenAction, $event)"
          @placeBottle="placeBottle('skill', $event)"
          @getInfo="getInfo('skill')"/>
        </div>

        <div class="work pool">
          <CollectorsStartWork v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :marketValues="marketValues"
          :placement="workPlacement"
          @startWork="startWork($event)"
          @placeWorkBottle="placeWorkBottle( $event)"
          @getInfo="getInfo('work')"/>
        </div>

        <div class="auction pool">
          <CollectorsStartAuction v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :auctionCards="auctionCards"
          :auctionSpot = "auctionSpot"
          :marketValues="marketValues"
          :placement="auctionPlacement"
          @chooseAction="chooseAction(chosenAction, $event)"
          @placeBottle="placeBottle('auction', $event)"
          @getInfo="getInfo('auction')"/>
        </div>

        <div class="market pool">
          <CollectorsRaiseValue v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :market="market"
          :marketValues="marketValues"
          :auctionCards="auctionCards"
          :skillsOnSale="skillsOnSale"
          :placement="marketPlacement"
          @raiseValue="raiseValue($event)"
          @placeBottle="placeBottle('market', $event)"
          @getInfo="getInfo('market')"/>
        </div>

      </div>

      <div class="players board">

        <!--Object.keys(this.players) ger en array med alla playerid -->
        <CollectorsPlayerBoard class="player" v-for='(data, id) in players' :key='id'
        :labels= "labels"
        :player= "data"
        :playerId= "id"
        @chooseAction= "chooseAction(chosenAction, $event)"/>

      </div>


    </main>

    <footer>
      <p>
        {{ labels.invite }}
        <input type="text" :value="publicPath + $route.path" @click="selectAll" readonly="readonly">
      </p>
    </footer>
  </div>
</template>



<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

//import CollectorsCard from '@/components/CollectorsCard.vue'
import CollectorsBuyActions from '@/components/CollectorsBuyActions.vue'
import CollectorsGainSkill from '@/components/CollectorsGainSkill.vue'
import CollectorsRaiseValue from '@/components/CollectorsRaiseValue.vue'
import CollectorsStartAuction from '@/components/CollectorsStartAuction.vue'
import CollectorsStartWork from '@/components/CollectorsWork.vue'
import CollectorsPlayerBoard from '@/components/CollectorsPlayerBoard.vue'

/* VUE-objekt för spelet*/
export default {
  name: 'Collectors',
  components: {
    //CollectorsCard,
    CollectorsBuyActions,
    CollectorsGainSkill,
    CollectorsRaiseValue,
    CollectorsStartAuction,
    CollectorsStartWork,
    CollectorsPlayerBoard                                                                                                                                                         /*HÄÄÄÄÄÄÄÄÄÄR*/
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
              if (typeof this.players[p].hand[c].item !== "undefined" && !(this.players[p].hand[c].available))
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
            for(let c = 0; c < this.players[this.playerId].hand.length; c += 1) {
              if (typeof this.players[this.playerId].hand[c].item !== "undefined") {
                console.log("före: ", this.players[this.playerId].hand[c].available);
                this.$set(this.players[this.playerId].hand[c], "available", true);
                console.log("efter: ", this.players[this.playerId].hand[c].available);
              }
            }

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
          document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} bought an item!`;
          this.players = d.players;
          this.itemsOnSale = d.itemsOnSale;
        }.bind(this)
      );

      this.$store.state.socket.on('collectorsValueRaised',
      function(d) {
        document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} raised a value!`;
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
      document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} started an auction!`;
      this.players = d.players;
      this.auctionCards = d.auctionCards;
      this.auctionSpot = d.auctionSpot; //TEST ???
    }.bind(this)
  );
  this.$store.state.socket.on('collectorsWorkStarted',
  function(d) {
    document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} started work!`;
    this.players = d.players;
    this.auctionCards = d.auctionCards;
    this.auctionSpot = d.auctionSpot; //TEST ???
  }.bind(this)
);

this.$store.state.socket.on('collectorsSkillGained',
function(d) {
  document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} gained a skill!`;
  this.players = d.players;
  this.skillsOnSale = d.skillsOnSale;
}.bind(this)
);
},        //END OF CREATED

methods: {
  chooseAction(action, card){
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

  /*
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  popup.style.left=event.clientX - event.target.getBoundingClientRect().x +"px";
  popup.style.top=event.clientY - event.target.getBoundingClientRect().y - 70+"px"  ;
  console.log(popup.style, event.clientX, event.clientY);*/


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
  /*console.log("gainSkill", card);     //DENNA UTSKRIFT BEHÖVS KANSKE EJ? */
  this.$store.state.socket.emit('collectorsGainSkill', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    cost: this.chosenPlacementCost     //placeringskostnad
  }
);
},

startAuction: function (card) {
  /*console.log("startAuction", card);    //DENNA UTSKRIFT BEHÖVS KANSKE EJ? */
  this.$store.state.socket.emit('CollectorsStartAuction', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    cost: this.chosenPlacementCost
  }
);
},
startWork: function (card) {
  /*console.log("startWork", card);   //DENNA UTSKRIFT BEHÖVS KANSKE EJ? */
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
  /*console.log("buyCard", card);   //DENNA UTSKRIFT BEHÖVS KANSKE EJ? */
  this.$store.state.socket.emit('collectorsBuyCard', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    cost: this.marketValues[card.market] + this.chosenPlacementCost     //marknadsvärde (raise value) + placeringskostnad
  }
);
},
getInfo: function(string){
  if (string === 'work') {
    var popupwork = document.getElementById("myWorkPopup");
    popupwork.classList.toggle("show");
  }
  else if (string === 'auction') {
    var popupauction = document.getElementById("myAuctionPopup");
    popupauction.classList.toggle("show");

  }
  else if (string === 'market') {
    var popupmarket = document.getElementById("myMarketPopup");
    popupmarket.classList.toggle("show");
  }
  else if (string === 'skill') {
    var popupskill = document.getElementById("mySkillPopup");
    popupskill.classList.toggle("show");
  }
  else if (string === 'item') {
    var popupitem = document.getElementById("myItemPopup");
    popupitem.classList.toggle("show");
  }
},
getHowToInfo:function(){
      var popupwork = document.getElementById("myHowToInfoPopup");
      popupwork.classList.toggle("show");
},

raiseValue: function (card) {
  /*console.log("raiseValue", card);    //DENNA UTSKRIFT BEHÖVS KANSKE EJ? */
  this.$store.state.socket.emit('collectorsRaiseValue', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    cost: this.chosenPlacementCost     //placeringskostnad
  }
);
}
},
};

</script>
<!--  /*getInfo: function(){
console.log("bajs");
var popup = document.getElementById("myPopup");
popup.classList.toggle("show");
},*/-->



<!-- style scoped är bara för filen, utan scoped gäller det allt -->
<style>
/*Här ligger gridsen, uppdelade genom att placera de små gridsen i den stora. De små ska flyttas till respektive komponent. /Dani*/
/*info om att centrera saker https://philipwalton.github.io/solved-by-flexbox/demos/vertical-centering/*/

@import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');

#wrapper {
  font-family: arial, verdana, sans-serif;
  color: #000;
  padding: 1em;
}

h1 {
  margin: 0;
  text-align: center;
  font-size: 1.5em;
}

h1, h2, h3 {
  font-family: 'Handlee', cursive;
}

h2, h3 {
  padding: 0.2em;
}

header {
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-areas:
  "leftInfo welcome rightInfo";
  margin: 0;
  align-items: center;
  text-align: center;
  grid-area: header;
}

.info {
  display: flex;
  align-items: flex-end;
  padding: 0 5%;
}

.left { grid-area: leftInfo; }

#welcome { grid-area: welcome; }

.right {
  grid-area: rightInfo;
  display: flex;
  font-weight: bold;
}

.gameLog {
  color: red;
}

/* =========================
BUTTONS                    */

.buttons {
  width: 100%;
  color: #292929;
  font-size: 1em;
  font-weight: bold;
  background: #FAC84C;
  border: solid thin #787975;
  border-radius: 0.3em;
  padding: 0.6em;
  margin: 3%;
  box-shadow: 2px 2px 3px #787975;
}

.buttons:hover, .drawCardButton:hover {
  cursor: pointer;
}

.buttons:hover {
  box-shadow: inset 2px 2px 3px #787975;
}

.closeButton {
  width: 30%;
  color: #292929;
  font-size: 1em;
  font-weight: bold;
  background: #FAC84C;
  border: solid thin #787975;
  border-radius: 0.3em;
  padding: 0.6em;
  margin: 3%;
  box-shadow: 2px 2px 3px #787975;
  font-size: 1.2em;
  background: #e63b2b;
  margin: 5% 0;
}

.closeButton:hover, .drawCardButton:hover {
  cursor: pointer;
}

.closeButton:hover {
  box-shadow: inset 2px 2px 3px #787975;
}

#drawCardButton {
  border-radius: 0.3em;
  box-shadow: 0.2em 0.2em 0.3em #787975;
  width: 20%;
  margin-left: 5%;
}

.drawCardButton:hover {
  box-shadow: inset 0.2em 0.2em 0.3em #787975;
}

.drawCardButton:focus {
  outline: none;
}

/*  ===========================  */

main {
  user-select: none;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 70% 30%;
  grid-template-rows: 150vh;
  grid-template-areas:
  "gameBoard playerBoard";
}

p, span {
  font-size: 1em;
  margin: 0;
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

.board { padding: 0.2em; }

/* =====================================
GAME BOARD (GRID)                 */

.game {
  grid-area: gameBoard;
  grid-gap: 0.5%;
  display: grid;
  grid-template-columns: 25% 25% 49%;
  grid-template-rows: 15% 30% 15%;
  grid-template-areas:
  "itemPool itemPool itemPool"
  "skillPool workPool auctionPool"
  "skillPool marketPool marketPool";
}

.item, .skill, .work, .auction, .market{padding: 1em;}

.item {
  grid-area: itemPool;
  background-color: #F8DCCE;
}

.skill {
  grid-area: skillPool;
  background-color: #DFEDCC;
}

.work {
  grid-area: workPool;
  background-color: #F6F2CD;
}

.auction {
  grid-area: auctionPool;
  background-color: #F5F2E3;
}

.market {
  grid-area: marketPool;
  background-color: #D0DCF2;
}

/* =====================================
PLAYER BOARD                          */

.players {
  grid-area: playerBoard;
}

.player {
  border: solid medium #4E4E4E;
  margin: 0 0 0.2em 0;
  padding: 0.5em;
}

/* ========================= */
/* BUY CARD BUTTON */

.buyCards, .buttons {
}

.buyCards{
  display: grid;
  grid-template-columns: repeat(auto-fill, 15vw);
}

.horizontalBuyCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 10vw);
}

/* ========================= */
/* PLACE BOTTLE BUTTON */

.bottlePlacement {
  width: 2.5vw;
}

.horizontalPlacement {
  display: grid;
  grid-template-columns: repeat(auto-fill, 19%);
  margin-top: 4%;
}


/* .buttonText, .buttonImg {          //TROR EJ DETTA ÄR NÖDVÄNDIGT LÄNGRE
margin: 0;
padding: 0;
} */
.buttonText {
  padding: 0.05em;
  font-size: 0.9em;
  font-weight: bold;
  color: #595959;
  background-color: white;
  border: solid thin #3c3c3c;
  border-radius: 2em;
  position: relative;
  left: -0.5em;
  top: -0.25em;
  border: 1px solid black;
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  text-align: center;
}

/* ========================= */

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
/*popup rutan som kommer upp */

.popuptext {
  position: absolute;
  display: none;
  cursor: pointer;
  user-select: none;
  width: 20em;
  background-color: #f3f3f3;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  z-index: 1;
  margin-left: -80px;
  border-color: grey;
  border-width: 1px;
  border-style:solid;
  /*overflow-y: scroll; / kan skrolla*/
}


.popup .popuptext::after {
  content: "";
  position: absolute;
}
.popup:hover {
  cursor: pointer;
}


.popup .show {
  display: block;
}

/* ==========HJÄLP Dåligt kodad få ihop popuptext klasserna snyggt==================== */
.popupHowToInfoText {
  position: absolute;
  display: none;
  cursor: pointer;
  user-select: none;
  background-color: #f3f3f3; /*bakgrund popup*/
  color: black; /*textfärg popup*/
  text-align: center;
  border-radius: 0px;
  padding: 20px 20px;  /*padding popup*/
  z-index: 1;
  margin-left: -37em;
  border-color: grey;
  border-width: 1px;
  border-style:solid;
  overflow-y: scroll;
}


@media screen and (max-width: 800px) {
  main {
    width:90vw;
  }
}
</style>
