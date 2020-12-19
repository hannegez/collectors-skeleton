<template>
  <div id="wrapper">
    <header>
      WELCOME TO RICH COLLECTORS
    </header>

    <main>
      <div class="game board">
        <div class="item pool">
          <!-- <div class="popup" style= "position:relative; left:25em; top:0em;">
          <img src='/images/buyItem.PNG' alt="" width="15%" @click="getInfo($event, 'item')" >
          <span class="popuptext" id="myItemPopup"  style= "position:relative; left:3em; top:-11em;">
            Buy item används för att köpa objekt
          </span>
          </div> -->
          <CollectorsBuyActions v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :itemsOnSale="itemsOnSale"
          :marketValues="marketValues"
          :placement="buyPlacement"
          @buyCard="buyCard($event)"
          @placeBottle="placeBottle('buy', $event)"
          @getInfo="getInfo('item')"/>


          <p>buyPlacement: {{buyPlacement}}</p>
          <p>chosenPlacementCost: {{chosenPlacementCost}}</p>
        </div>

        <div class="skill pool">
          <!-- <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/gainSkill.PNG' alt="" width="50%" @click="getInfo($event, 'skill')" >
          <span class="popuptext" id="mySkillPopup"  style= "position:relative; left:3em; top:-11em;">
            Gain skill används för att köpa skills
          </span>
          </div> -->

          <CollectorsGainSkill v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :skillsOnSale="skillsOnSale"
          :placement="skillPlacement"
          @chooseAction="chooseAction(chosenAction, $event)"
          @placeBottle="placeBottle('skill', $event)"
          @getInfo="getInfo('skill')"/>
        </div>

        <!--  HEAD
        <div class="work pool">
        <CollectorsStartWork v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :marketValues="marketValues"
        :placement="workPlacement"
        @startWork="startWork($event)"
        @placeWorkBottle="placeWorkBottle( $event)"/>
      </div>-->

      <div class="work pool">
        <div class="popup" style= "position:relative; left:0em; top:0em;">
        <img src='/images/workInfo.PNG' alt="" width="80%" @click="getInfo($event,'work')" >
        <span class="popuptext" id="myWorkPopup"  style= "position:relative; left:3em; top:-11em;">
          work kan användas bla bla bla
        </span>
        </div>

        <CollectorsStartWork v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :marketValues="marketValues"
        :placement="workPlacement"
        @startWork="startWork($event)"
        @placeWorkBottle="placeWorkBottle( $event)"/>
      </div>

      <div class="auction pool">
        <div class="popup" style= "position:relative; left:0em; top:0em;">
        <img src='/images/startAuction.png' alt="" width="20%" @click="getInfo($event,'auction')" >
        <span class="popuptext" id="myAuctionPopup"  style= "position:relative; left:3em; top:-11em;">
          Auction används för det här o de här
        </span>
        </div>

        <CollectorsStartAuction v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :auctionCards="auctionCards"
        :auctionSpot = "auctionSpot"
        :marketValues="marketValues"
        :placement="auctionPlacement"
        @chooseAction="chooseAction(chosenAction, $event)"
        @placeBottle="placeBottle('auction', $event)"/>


      </div>

      <!--        HEAD
      <div class="market pool">-->
      <!--:raiseValueOnSale="raiseValueOnSale" tagit bort från nedan-->
      <!--  <CollectorsRaiseValue v-if="players[playerId]"
      :labels="labels"
      :player="players[playerId]"
      :market="market"
      :marketValues="marketValues"
      :auctionCards="auctionCards"
      :skillsOnSale="skillsOnSale"
      :placement="marketPlacement"
      @raiseValue="raiseValue($event)"
      @placeBottle="placeBottle('market', $event)"/>
    </div>
  </div>

  <div class="player board">
  <h1>PLAYER INFO</h1>
  <p>Players: {{players}}</p>
  <p>marketValues: {{marketValues}}</p>-->

  <div class="market pool">
    <!--:raiseValueOnSale="raiseValueOnSale" tagit bort från nedan-->
    <!-- <div class="popup" style= "position:relative; left:0em; top:0em;">
    <img src='/images/raiseValue.PNG' alt="" width="20%" @click="getInfo($event,'market')" >
    <span class="popuptext" id="myMarketPopup"  style= "position:relative; left:3em; top:-11em;">
      raise value används för att yada yada yada
    </span>
    </div> -->

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

<div class="player board">

  <div id="drawCard" class="buttons">
    <p class="buttonText">{{ labels.draw }}</p>
    <input type="image" @click="drawCard" class="imgButton" alt="Login"
    src='/images/card_backside300px.png' value="Draw card"  >    <!-- NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY -->
  </div>

  <!-- <CollectorsPlayerBoard v-if="players[playerId]"
  :labels="labels"
  :player="players[playerId]"
  :playerId="playerId"/> -->

  <!--Object.keys(this.players) ger en array med alla playerid -->

  <CollectorsPlayerBoard v-for='(data, id) in players' :key='id'
  :labels= "labels"
  :player= "data"
  :playerId= "id"
  @chooseAction= "chooseAction(chosenAction, $event)"/>

</div>


</main>

<footer>
  HEJ HÄR ÄR FOOTER



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



  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
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
#wrapper {
  color: #000;
  padding: 1em;
}

header {
  /* user-select: none;
  position: fixed;
  width:100%;
  pointer-events: none; */
  border: solid thin #000;
}

main {
  user-select: none;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 70% 30%;
  grid-template-rows: 150vh;
  grid-template-areas:
  "gameBoard playerBoard";
}

p {
  font-size: 1.2em;
  font-weight: bold;
}

footer {
  margin-top: 5em auto;
  background: brown;
}
footer a {
  text-decoration: none;
  border-bottom: 2px dotted ivory;
}
footer a:visited {
  color:ivory;
}

.game, .player { padding: 1em; }

/* =====================================
GAME BOARD (GRID)                 */

.game {
  grid-area: gameBoard;
  grid-gap: 1em;
  display: grid;
  grid-template-columns: 25% 25% 50%;
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

.player {
  grid-area: playerBoard;
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
  grid-template-columns: repeat(auto-fill, 20%);
}

/* ========================= */
/* DRAW CARD BUTTON */
.imgButton {
  border: solid thin #787975;
  margin: 1em;
  border-radius: 0.3em;
  box-shadow: 0.2em 0.2em 0.3em #787975;
  width: 20%;
}

.buttons {
  width: 100%;
}

.imgButton:hover {
  box-shadow: inset 0.2em 0.2em 0.3em #787975;
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
  font-size: 1em;
  font-weight: bold;
  color: #3c3c3b;
  background-color: white;
  border-radius: 1em;
  position: relative;
  left: -0.5em;
  top: -0.25em;
  border: 1px solid black;
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
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
  width: 160px;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  z-index: 1;
  margin-left: -80px;
  border-color: grey;
  border-width: 1px;
  border-style:solid;
}


.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 10px;
  border-style: solid;
  border-color: grey transparent transparent transparent;
}


.popup .show {
  display: block;
}


@media screen and (max-width: 800px) {
  main {
    width:90vw;
  }
}
</style>
