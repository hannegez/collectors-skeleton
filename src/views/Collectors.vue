<!-- rätt version -->

<template>
  <div id="wrapper">
    <header>
      <div id="welcome">
        <h1>Welcome to Rich Collectors</h1>
        <p>
          {{ labels.invite }}
          <input type="text" :value="publicPath + $route.path" @click="selectAll" readonly="readonly">
        </p>
        <!--
        oklart om det behöver stå nått argument i getInfo pga blir rätt oavsett, annars testa typ 'market' -->
        <CollectorsRulesPopup v-if="showRulesPopup"
        :content="rulesPopupContent"
        :labels="labels"
        @getInfo="getInfo()"/>

      </div>

      <!-- Informationen till vänster om rubriken i headern -->
      <div class="info left">
        <button class="buttons homeButton" v-on:click="getHowToInfo()"> {{ this.labels.rules }} </button>
        <div class="popup" style= "position:relative; left:0em; top:0em;">
          <span class="popupHowToInfoText" id="myHowToInfoPopup"  style= "left:0em; top:0em;">
            <input class="closeCross" type="image" @click="getHowToInfo()" alt="Login"
            src='/images/close.png' >
            <h1>{{ this.labels.rules }}</h1>
            <embed src="/images/rules_collectors.pdf" width="1000em" height="700em"/>
            <br>
            <button class="closeButton" v-on:click="getHowToInfo()" >{{this.labels.close}} </button>

          </span>
        </div>


        <!-- Knappen som vi vill ska göra att man kommer till nästa quarter -->
        <button class="buttons" v-on:click="nextQuarterInfo()"> {{ this.labels.nextQuarter }}</button>
        <div class="popup" style= "position:relative; left:0em; top:0em;">
          <span class="popupNextQuarterText" id="myQuarterInfoPopup"  style= "left:0em; top:0em;">
            <h1>{{ this.labels.nextQuarter }}</h1>
            {{labels.newQuarterInfo}}
            <br>
            <br>
            <h1>{{ this.labels.howToBottles }}</h1>
            <br>
            {{labels.howToInfo1}}
            <br>
            {{labels.howToInfo2}}
            <br>
            {{labels.howToInfo3}}
            <br>
            {{labels.howToInfo4}}
            <br>
            {{labels.howToInfo5}}
            <button class="buttons getButton" v-on:click="getMoney()" > {{this.labels.getCoins}} </button>
            <button class="buttons getButton" v-on:click="drawCard()" > {{this.labels.getCards}} </button>
            <button class="buttons" v-on:click="nextQuarter()" > {{this.labels.nextQuarterClose}} </button>
            <button class="closeButton" v-on:click="nextQuarterInfo()" > {{this.labels.close}} </button>
          </span>
        </div>

      </div>

      <!-- Informationen till höger om rubriken i headern -->
      <div class="info right">

        <div class="hoverButton hoverCoin">
          <div class="getButtons">
            <p>{{ labels.getCoin }}</p>
          </div>
          <input type="image" @click="getMoney" id="getMoneyButton" alt="Login"
          src='/images/coin100pxwhite.png' value="Get Money"  >
        </div>

        <div class="hoverButton hoverCard">
          <div class="getButtons">
            <p>{{ labels.draw }}</p>
          </div>
          <input type="image" @click="drawCard" id="drawCardButton" alt="Login"
          src='/images/card_backside_flipped.png' value="Draw card">
        </div>

        <div class="gameLog">
          <p>
            {{ this.labels.startLog }}
          </p>
        </div>


      </div>
    </header>

    <main>
      <!-- Game Board -->
      <div class="game board">
        <div class="item pool">
          <CollectorsBuyActions v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :players="players"
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
          :players="players"
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
          :players="players"
          :marketValues="marketValues"
          :placement="workPlacement"
          @placeWorkBottle="placeWorkBottle( $event)"
          @getInfo="getInfo('work')"/>
        </div>

        <div class="auction pool">
          <CollectorsStartAuction v-if="players[playerId]"
          :labels="labels"
          :player="players[playerId]"
          :players="players"
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
          :players="players"
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

      <!-- Player Board  -->
      <div class="players board">
        <CollectorsPlayerBoard class="player" v-for='(data, id) in players' :key='id'
        :labels= "labels"
        :player= "data"
        :playerId= "id"
        @chooseAction= "chooseAction(chosenAction, $event)"/>
      </div>

    </main>
  </div>
</template>



<script>

//import CollectorsCard from '@/components/CollectorsCard.vue'
import CollectorsBuyActions from '@/components/CollectorsBuyActions.vue'
import CollectorsGainSkill from '@/components/CollectorsGainSkill.vue'
import CollectorsRaiseValue from '@/components/CollectorsRaiseValue.vue'
import CollectorsStartAuction from '@/components/CollectorsStartAuction.vue'
import CollectorsStartWork from '@/components/CollectorsWork.vue'
import CollectorsPlayerBoard from '@/components/CollectorsPlayerBoard.vue'
import CollectorsRulesPopup from '@/components/CollectorsRulesPopup.vue'

/* VUE-objekt för spelet*/
export default {
  name: 'Collectors',
  components: {
    CollectorsBuyActions,
    CollectorsGainSkill,
    CollectorsRaiseValue,
    CollectorsStartAuction,
    CollectorsStartWork,
    CollectorsPlayerBoard,
    CollectorsRulesPopup                                                                                                                                                         /*HÄÄÄÄÄÄÄÄÄÄR*/
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      maxSizes: { x: 0,
        y: 0 },
        //ALLT ÄR TOMT, VÄRDENA SÄTTS LÄNGRE NER
        labels: {},
        players: {},
        buyPlacement: [],
        skillPlacement: [],
        auctionPlacement: [],
        marketPlacement: [],
        workPlacement: [],

        chosenWorkAction: null,
        chosenNumberOfActions: null,
        currentQuarter: 1,
        chosenPlacementCost: null,
        chosenAction: null,
        marketValues: {
          fastaval: 0,
          movie: 0,
          technology: 0,
          figures: 0,
          music: 0 },

          market: [],
          itemsOnSale: [],
          skillsOnSale: [],
          auctionCards: [],
          auctionSpot: [],

          workAction: 0,
          numberOfActions: 0,
          showRulesPopup: false,
          rulesPopupContent: ''
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
          //    console.log("är i players " + this.chosenNumberOfActions);

            }
          }
        }
      },
      created: function () {
        this.$store.commit('SET_PLAYER_ID', this.$route.query.id)
        const newRoute = this.$route.params.id + "?id=" + this.playerId;
        if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
        this.$router.push(newRoute);
        this.$store.state.socket.emit('collectorsLoaded',
        { roomId: this.$route.params.id,
          playerId: this.playerId } );

        //HÄR LÄGGER VI TILL ALLA VÄRDEN SOM SKICKATS I OBJEKTET I socketsCollectors.js
        this.$store.state.socket.on('collectorsInitialize',
        function(d) {
          this.labels = d.labels;
          this.players = d.players;
          this.itemsOnSale = d.itemsOnSale;
          this.marketValues = d.marketValues;
          this.market = d.market;
          this.skillsOnSale = d.skillsOnSale;
          this.auctionCards = d.auctionCards;
          this.auctionSpot = d.auctionSpot;
          this.buyPlacement = d.placements.buyPlacement;
          this.skillPlacement = d.placements.skillPlacement;
          this.marketPlacement = d.placements.marketPlacement;
          this.auctionPlacement = d.placements.auctionPlacement;
          this.workPlacement = d.placements.workPlacement;
          this.currentQuarter= d.currentQuarter;
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
          this.chosenNumberOfActions = d.numberOfActions;

          document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} started work!`;
            for(let c = 0; c < this.players[this.playerId].hand.length; c += 1 ) {
              if (typeof this.players[this.playerId].hand[c].item !== "undefined" && this.chosenWorkAction === 5 ) {
                this.$set(this.players[this.playerId].hand[c], "available", true);
              }
              if (typeof this.players[this.playerId].hand[c].item !== "undefined" && this.chosenWorkAction === 1 ) {
                if (this.currentQuarter <= 3){
                  if (this.chosenNumberOfActions >0) {
                    this.$set(this.players[this.playerId].hand[c], "available", true);
                  }
                }
              }
            }
        }.bind(this));

        this.$store.state.socket.on('collectorsPointsUpdated', (d) => this.points = d );

        this.$store.state.socket.on('collectorsCardDrawn',
          function(d) {
            this.players = d;
          }.bind(this)
        );

        this.$store.state.socket.on('collectorsGottenMoney',
          function(d) {
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
            this.auctionSpot = d.auctionSpot;
          }.bind(this)
        );

        this.$store.state.socket.on('collectorsWorkStarted',
          function(d) {
            document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} started work!`;
            this.players = d.players;
          }.bind(this)
        );

        this.$store.state.socket.on('collectorsSkillGained',
          function(d) {
            document.querySelector('.gameLog').innerHTML = `Player ${d.playerId} gained a skill!`;
            this.players = d.players;
            this.skillsOnSale = d.skillsOnSale;
          }.bind(this)
        );
    },


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

    else if (action === "work") {
      this.startWork(card);
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

placeWorkBottle: function (p) {
  this.chosenPlacementCost = p.cost;
  this.chosenAction = "work";
  this.chosenWorkAction= p.workAction;
  this.chosenNumberOfActions = p.numberOfActions;
  //this.chosenNumberOfActions -=1;
  this.$store.state.socket.emit('collectorsPlaceWorkBottle', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    action: "work",
    cost: p.cost,
    workAction:p.workAction,
    numberOfActions:p.numberOfActions
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

getMoney: function () {
  this.$store.state.socket.emit('collectorsGetMoney', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
  }
);
},

gainSkill: function (card) {
  this.$store.state.socket.emit('collectorsGainSkill', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    //placeringskostnad
    cost: this.chosenPlacementCost
  }
);
},

startAuction: function (card) {
  this.$store.state.socket.emit('CollectorsStartAuction', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    cost: this.chosenPlacementCost
  }
);
},
//försök till number of actions men har inte fått ihop det.
startWork: function (card) {
  this.$store.state.socket.emit('CollectorsStartWork', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    cost: this.chosenPlacementCost,
    workAction:this.chosenWorkAction,
    numberOfActions:this.chosenNumberOfActions,
  }
);
},

buyCard: function (card) {
  this.$store.state.socket.emit('collectorsBuyCard', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
    //marknadsvärde(raise value) + placeringskostnad
    cost: this.marketValues[card.market] + this.chosenPlacementCost
  }
);
},

getInfo: function(string){
  this.showRulesPopup = !this.showRulesPopup;
  this.rulesPopupContent = string;


},
getHowToInfo:function(){
  var popupwork = document.getElementById("myHowToInfoPopup");
  popupwork.classList.toggle("show");
},
nextQuarterInfo:function(){
  var popupwork = document.getElementById("myQuarterInfoPopup");
  popupwork.classList.toggle("show");
},
nextQuarter:function(){
  this.changeImageNextQuarter();
  this.$store.state.socket.emit('collectorsNextQuarter', {
    roomId: this.$route.params.id,
    }
  );
  this.nextQuarterInfo();
},

changeImageNextQuarter: function(){
  if (document.getElementById("imgClickAndChange").src === "http://localhost:8080/images/quartertile_1.PNG")
  {document.getElementById("imgClickAndChange").src = "/images/quartertile_2.PNG"; }
  else if (document.getElementById("imgClickAndChange").src === "http://localhost:8080/images/quartertile_2.PNG")
  {document.getElementById("imgClickAndChange").src = "/images/quartertile_3.PNG";}
  else if (document.getElementById("imgClickAndChange").src === "http://localhost:8080/images/quartertile_3.PNG")
  {document.getElementById("imgClickAndChange").src = "/images/quartertile_4.PNG";}
  else {document.getElementById("imgClickAndChange").src = "/images/quartertile_1.PNG";}
},

raiseValue: function (card) {
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');

#wrapper {
  font-family: arial, verdana, sans-serif;
  color: #000;
  padding: 0.8em;
  padding-left: 2.5em;
  padding-right: 1.2em;
  display: grid;
  grid-template-rows: 10% 70%;
  grid-template-areas:
  "header"
  "main";
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

h1, h2, h3 {
  font-family: 'Handlee', cursive;
  margin: 0;
}

h1 {
  text-align: center;
  font-size: 1.5em;
}

h2 {
  font-size: 1.3em;
}

.info {
  display: flex;
  padding: 0 5%;
}

.left { grid-area: leftInfo; }

#welcome { grid-area: welcome; }

.right {
  grid-area: rightInfo;
  display: grid;
  grid-template-columns: 15% 30% 55%;
  grid-template-areas:
  "hoverCoin hoverCard gameLog";
  font-weight: bold;
}

.hoverCoin { grid-area: hoverCoin; }
.hoverCard { grid-area: hoverCard; }

.gameLog {
  grid-area: gameLog;
  color: red;
  margin-left: 2%;
}

/* =========== BUTTONS =========== */

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

.buttons:hover {
  cursor: pointer;
}

.buttons:hover {
  box-shadow: inset 2px 2px 3px #787975;
}

.hoverButton {
  position:relative;
}

.getButtons {
  padding: 5%;
  width: 80%;
  background-color: #f2f2f2;
  border: solid thin #4E4E4E;
  color: #4E4E4E;
  font-size: 0.6em;
  border-radius: 5px;
  opacity: 0;
  position: absolute;
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  transition: opacity 0.5s;
}

.hoverButton:hover .getButtons {
  opacity: 1;
}
.getButton{
  background-color: green;
}

.closeButton {
  width: 30%;
  color: #292929;
  font-weight: bold;
  background: #FAC84C;
  border: solid thin #787975;
  border-radius: 0.3em;
  padding: 0.6em;
  box-shadow: 2px 2px 3px #787975;
  font-size: 1.2em;
  background: #e63b2b;
  margin: 1% 0;
}

.closeButton:hover, .drawCardButton:hover {
  cursor: pointer;
}

.closeButton:hover {
  box-shadow: inset 2px 2px 3px #787975;
}

.closeCross {
  float: right;
  margin: 1% 3% 3% 3%;
  width: 7%;
}

#drawCardButton, #getMoneyButton {
  margin: 2%;
}

#drawCardButton:hover, #getMoneyButton:hover {
  box-shadow: inset 0.2em 0.2em 0.3em #787975;
}

#drawCardButton:focus, #getMoneyButton:focus {
  outline: none;
}

#getMoneyButton {
  width: 50px;
}

#drawCardButton {
  border-radius: 0.3em;
  box-shadow: 0.2em 0.2em 0.3em #787975;
  width: 70%;
}

/*  ======================================  */

/* ============ YTTRE GRID ===============*/
main {
  user-select: none;
  grid-area: main;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 70% 30%;
  grid-template-rows: 90vh;
  grid-template-areas:
  "gameBoard playerBoard";
}

p, span {
  font-size: 1em;
  margin: 0;
}

.board { padding: 0.2em; }

/* ===================================================== */

/* =============== GAME BOARD (GRID) =================== */

.game {
  grid-area: gameBoard;
  grid-gap: 0.5%;
  display: grid;
  grid-template-columns: 25% 25% 49%;
  grid-template-rows: 24% 50% 23%;
  grid-template-areas:
  "itemPool itemPool itemPool"
  "skillPool workPool auctionPool"
  "skillPool marketPool marketPool";
}

.item, .skill, .work, .auction, .market{
  padding: 1em;
}

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

/* ======================================================== */

/* ================= PLAYER BOARD (GRID) ================== */

.players {
  grid-area: playerBoard;
}

.player {
  border: solid medium #4E4E4E;
  margin: 0 0 0.2em 0;
  padding: 0.5em;
}

/* ======================================================== */

/* BUY CARD BUTTON */

/* .buyCards{
  display: grid;
  grid-template-columns: repeat(auto-fill, 15vw);
} */

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

/* ============= CARD DESIGN =============== */
.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 30px);
  grid-template-rows: repeat(10px, 180px);
  margin: 10%;
}
.cardslots div {
  transform: scale(1)translate(0,0);
  transition:0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  z-index: 1;
}

/* används i playerboard */
.popuptext {
  position: absolute;
  display: none;
  cursor: pointer;
  user-select: none;
  width: 20em;
  background-color: #fff;
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

/* sehär  ==========HJÄLP Dåligt kodad få ihop popuptext klasserna snyggt==================== */
.popupHowToInfoText {
  position: absolute;
  display: none;
  cursor: pointer;
  user-select: none;
  background-color: #f3f3f3; /*bakgrund popup*/
  color: black; /*textfärg popup*/
  text-align: center;
  border-radius: 0px;
  z-index: 1;
  margin-left: 0em;
  border-color: grey;
  border-width: 1px;
  border-style:solid;
}
.popupNextQuarterText {
  position: absolute;
  display: none;
  cursor: pointer;
  width: 25em;
  user-select: none;
  background-color: #f3f3f3; /*bakgrund popup*/
  color: black; /*textfärg popup*/
  text-align: center;
  border-radius: 0px;
  padding: 20px 20px;  /*padding popup*/
  z-index: 1;
  margin-left: 0em;
  border-color: grey;
  border-width: 1px;
  border-style:solid;
}



@media screen and (max-width: 800px) {
  main {
    width:90vw;
  }
}
</style>
