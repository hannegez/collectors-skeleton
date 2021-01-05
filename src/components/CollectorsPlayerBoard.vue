<!-- här testar jag att skapa player board, har även infogat player_board.png i images
copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
  <div class= "playerContainer">

    <div class = "playerHeader">
      <h1>{{labels.playerInfo}} {{playerId}}</h1>

<!--  OBS: dessa itemsymboler och counters vill vi egentligen lösa med en for-loop och lagra counters i ett objekt
      istället så att vi kan komma åt dem på ett snyggare sätt. Men vi fick det inte att funka och gjorde denna
      tillfälliga och "osnygga" lösningen så länge. -->
      <div class="itemCounters">
        <div class="itemCounter">
          <img class="itemSymbol" src='/images/item_fastaval.png'>
          <span> {{ player.itemCounter[0] }} </span>
        </div>
        <div class="itemCounter">
          <img class="itemSymbol" src='/images/item_figures.png'>
          <span> {{ player.itemCounter[1] }} </span>
        </div>
        <div class="itemCounter">
          <img class="itemSymbol" src='/images/item_music.png'>
          <span> {{ player.itemCounter[2] }} </span>
        </div>
        <div class="itemCounter">
          <img class="itemSymbol" src='/images/item_movie.png'>
          <span> {{ player.itemCounter[3] }} </span>
        </div>
        <div class="itemCounter">
          <img class="itemSymbol" src='/images/item_technology.png'>
          <span> {{ player.itemCounter[4] }} </span>
        </div>
      </div>

      <div class="clickToSee">

        <div class="yourSkills playerSymbols">
          <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/your_skills.png' alt="See your skills" width="20%" @click='getYourInfo("klick på yourSkills")' >
          <span class="popuptext" id="yourSkillsPopup" style= "left:10em; top:-3em;">
            {{ labels.valueInfo }}
            <br>
            <button class="closeButton"  @click="$emit('getInfo')">close</button>
          </span>
          </div>
          <span>
            {{ player.skills.length }}
          </span>
        </div>

        <div class="yourHand playerSymbols">
          <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/your_hand.png' alt="See your hand" width="50%" @click="$emit('getInfo')" >
          <span class="popuptext" id="myMarketPopup"  style= "left:10em; top:-3em;">
            {{ labels.valueInfo }}
            <br>
            <button class="closeButton"  @click="$emit('getInfo')">close</button>
          </span>
          </div>
          <span>
            {{ player.hand.length }}
          </span>
        </div>

      <div class="yourCoins playerSymbols">
        <img src='/images/coin100px.png' alt="coin symbol" width="50%"><span>{{player.money}}</span>
      </div>

      <div class="yourIncome playerSymbols">
        <img  src='/images/future_income100px.png' alt="income symbol" width="60%"><span> {{player.futureIncome}}</span>
      </div>

      <div class="yourBottles playerSymbols">
        <img src='/images/bottle_placement.png' alt="bottle symbol" width="50%"><span>{{player.bottlesLeft}}</span>
      </div>

    </div>
  </div>

      <div class="textbottles">

      <p>Total bottles: {{player.totalBottles}}</p>
      <p>Bottles left: {{player.bottlesLeft}}</p>
    </div>
    <div class="categoryHand">
      <h2>Your hand</h2>
    </div>
    <div class="playerslots Yhand" >

        <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(card)" :key="'hand'+ index"/>
    </div>

    <!-- DETTA KAN TAS BORT OM VI ÄR OK MED ITEMCOUNTERN HÖGST UPP
    <div class="categoryItems">
      <h2>Your items </h2>
    </div>

    <div class="playerslots Yitems">

      <CollectorsCard v-for="(card, index) in player.items" :card="card" :key="'item'+ index" />
    </div> -->


    <div class="categorySkill">
      <h2>Your skills</h2>
    </div>


    <div class="playerslots Yskills">
      <CollectorsCard v-for="(card, index) in player.skills" :card="card" :key="'skill' +index"/>
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
    //NÅNTING MED WORK?
  },
  methods: {
    chooseAction(card){
      this.$emit('chooseAction', card);
    },
    getYourInfo: function(string){
      console.log("inne i getYourInfo", string);
      if (string=="klick på yourSkills") {
        console.log("inne i if-satsen");
        document.getElementById("yourSkillsPopup").classList.toggle("show");
      }

      // if (string === 'work') {
      //   var popupwork = document.getElementById("myWorkPopup");
      //   popupwork.classList.toggle("show");
      // }
      // else if (string === 'auction') {
      //   var popupauction = document.getElementById("myAuctionPopup");
      //   popupauction.classList.toggle("show");
      //
      // }
      // else if (string === 'market') {
      //   var popupmarket = document.getElementById("myMarketPopup");
      //   popupmarket.classList.toggle("show");
      // }
      // else if (string === 'skill') {
      //   var popupskill = document.getElementById("mySkillPopup");
      //   popupskill.classList.toggle("show");
      // }
      // else if (string === 'item') {
      //   var popupitem = document.getElementById("myItemPopup");
      //   popupitem.classList.toggle("show");
      // }
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
  height: 50%;
  grid-gap: 1%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30% 15% 15% 15%;
  grid-template-areas:
  "playerHeader playerHeader"
  "textbottles textbottles"
/*  "categoryItems items " */
  "categorySkill skill"
  "categoryHand hand";
}

p {
  margin: 1em;
}

.playerHeader, .Yitems, .Yskills, .Yhand { padding: 0em; }

.playerHeader {
  grid-area: playerHeader;
}

.itemCounters {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20%);
  text-align: center;
}

.itemSymbol {
  width: 65%;
}

.clickToSee {
  display: flex;
}

.textbottles{
  grid-area: textbottles;

}
.Yitems {
  grid-area: items;
}
.Yskills {
  grid-area: skill;
}
.Yhand {
  grid-area: hand;
}

.categoryHand{
  grid-area: categoryHand;
}
.categorySkill{
  grid-area: categorySkill;
}
.categoryItems{
  grid-area: categoryItems;
}

.playerslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 17px);
  grid-template-rows: repeat(10px, 180px);
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
