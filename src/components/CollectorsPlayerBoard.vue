<!-- här testar jag att skapa player board, har även infogat player_board.png i images
copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
  <div class= "playerContainer">

    <div id="playerName">
      <h2>{{labels.playerInfo}} {{playerId}}</h2>
    </div>

    <div class="itemCounters">
      <div v-for="(chosenItem, index) in itemCounter" :key="index" class="itemCounter">
        <img class="itemSymbol" :src="chosenItem.image" >
        <span> {{chosenItem.value }} </span>
      </div>
    </div>

    <div class="skillCounters hoverSkill">
      <div v-for="(chosenSkill, index) in skillCounter" :key="index" class="skillCounter">
        <img class="skillSymbol" :src="chosenSkill.image" >
        <span> {{chosenSkill.value }} </span>

        <div class="moreSkills moreSkillCounters">
         <div v-for="(chosenVPSkill, index) in skillCounter_VP" :key="index" class="skillCounter hoverSkill">
           <img class="extraSkill" :src="chosenVPSkill.image">
           <span> {{chosenVPSkill.value }} </span>
         </div>
       </div>

      </div>

    </div>

    <div class="clickToSee">

      <div class="yourHand playerSymbols">
        <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/your_hand150.png' alt="See your hand" width="65%" @click='getYourInfo("yourHand")' >
          <div :class="['popuptext',  {show:showHand}]" style= "left:-38vw;  top:8vh;"> <!--HANDLEDNING tar bort id Maja -->
            <input class="closeCross" type="image" @click="getYourInfo('yourHand')" alt="Login"
            src='/images/close.png' >
            <h2>{{ labels.yourHand }}</h2>
            <div class="playerslots" >
              <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(card)" :key="'hand'+ index"/>
            </div>
            <br>
            <button class="closeButton"  @click='getYourInfo("yourHand")'>close</button>
          </div>
          <span>
            {{ player.hand.length }}
          </span>
        </div>
      </div>

      <div class="yourBottles playerSymbols">
        <div class="popup" style= "position:relative; left:0em; top:0em;">

          <img :src="bottlePic" alt="See complete bottle info" width="75%" @click='getYourInfo("yourBottles")' >
          <div class="popuptext" id="yourBottlesPopup"  style= "left:-43vw;  top:8vh;">
            <input class="closeCross" type="image" @click="getYourInfo('yourBottles')" alt="Login"
            src='/images/close.png' >
            <h2>{{ labels.yourBottles }}</h2>
            <div class="textbottles">
              <p>{{ labels.totalBottles }} {{ player.totalBottles}}</p>
              <p>{{ labels.bottlesLeft }} {{ player.bottlesLeft}}</p>
            </div>
            <img src='/images/bottlemenu.png' width="90%">
            <p>{{ labels.bottleInfo }}</p>
            <br>
            <button class="closeButton"  @click='getYourInfo("yourBottles")'>close</button>
          </div>
          <span>
            {{ player.bottlesLeft }}
          </span>
        </div>

      </div>

    </div>

      <div id="yourMoneySymbols">
        <div class="yourCoins moneySymbols">
          <img src='/images/coin100px.png' alt="coin symbol" width="60%"><span> {{player.money}}</span>
        </div>

        <div class="yourIncome moneySymbols">
          <img src='/images/future_income100px.png' alt="income symbol" width="60%"><span> {{player.futureIncome}}</span>
        </div>
      </div>

    </div>


</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'

export default {
  name: 'CollectorsPlayerBoard',
  components: {
    CollectorsCard
  },
  props: {            //HÄR ÄR ALLA v-binds FRÅN ELEMENTET I Collectors.vue
    labels: Object,  //specify what kind of object
    player: Object,
    playerId: String,
  },

// Lades till under HANDLEDNING Maja
  data: function() {
    return {
      showHand: false
    }
  },
  computed: {
    bottlePic: function() {
      return '/images/bottle_' + this.player.color + '.png';
    },
    itemCounter: function() {
      return this.player.itemCounter;
    },
    skillCounter: function() {
      return this.player.skillCounter;
    },
    skillCounter_VP: function() {
      return this.player.skillCounter_VP;
    },
  },
  methods: {
    chooseAction(card){
      this.$emit('chooseAction', card);
    },


      //Det rätta:
      getYourInfo: function(string){
  console.log("inne i getYourInfo", string);
  if (string=="yourSkills") {
  }
  else if (string=="yourHand") {
    this.showHand = !this.showHand;
  }
  else if (string=="yourBottles") {
    document.getElementById("yourBottlesPopup").classList.toggle("show");
  }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* =====================================
PLAYER BOARD (GRID)                 */

.playerContainer {
  background-color: #ececec;
  width: 90%;
  text-align: right;
  padding: 1% 0 5% 1%;
  display: grid;
  grid-gap: 5% 2.5%;
  grid-template-columns: 40% 40% 10%;
  grid-template-areas:
    "playerName clickToSee yourMoneySymbols"
    "itemCounters itemCounters itemCounters"
    "skillCounters skillCounters skillCounters";
}

#playerName, .clickToSee { text-align: left; }

#playerName { grid-area: playerName; }
#yourMoneySymbols { grid-area: yourMoneySymbols; }

.clickToSee {
  display: flex;
  grid-area: clickToSee;
}

.itemCounters, .skillCounters { display: grid; }

.itemCounters {
  grid-area: itemCounters;
  grid-template-columns: repeat(auto-fill, 20%);
}

.skillCounters {
  grid-area: skillCounters;
  grid-template-columns: repeat(auto-fill, 16.66%);
}

.moreSkillCounters {
  display: flex;
}

.itemSymbol {
  width: 65%;
}

.skillSymbol {
  width: 40%;
}

.extraSkill {
  width: 55%;
}

.hoverSkill {
  position:relative;
}

.moreSkills {
  bottom: 120%;
  right: 0%;
  width: 60%;
  height: 90%;
  padding: 1%;
  background-color: #fff;
  border: solid thin #4E4E4E;
  color: #4E4E4E;
  border-radius: 0.3em;
  opacity: 0;
  position: absolute;
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  transition: opacity 0.5s;
}

.hoverSkill:hover .moreSkills {
  opacity: 1;
}

h2 { padding-left: 7%; }

p {
  margin: 1em;
}

span {
  font-size: 0.8em;
}

.playerslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 17px);
  grid-template-rows: repeat(10px, 180px);
  margin: 10%;
}
.playerslots div {
  transform: scale(0.5)translate(-50%,-50%);
  transition:0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.playerslots div:hover {
  transform: scale(1)translate(-25%,0);
  z-index: 1;
}

</style>
