<!-- här testar jag att skapa player board, har även infogat player_board.png i images
copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
  <div class= "playerContainer">

    <div class = "playerHeader">
      <h1>{{labels.playerInfo}} {{playerId}}</h1>
      </div>

      <p><img class= "coinSymbol" src='/images/coin100px.png' alt="coin symbol" width="27%"> X {{player.money}}</p>

      <p><img class= "futureSymbol" src='/images/future_income100px.png' alt="income symbol" width="30%"> X {{player.income}}</p>

      <div class="textbottles">

      <p>Total bottles: {{player.totalBottles}}</p>
      <p>Bottles left: {{player.bottlesLeft}}</p>

      <button @click="player.money += 1">
        <h2>FAKE MONEY</h2>
      </button>
    </div>
    <div class="categoryHand">
      <h2>Your hand</h2>
    </div>
    <div class="playerslots Yhand" >

        <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(card)" :key="'hand'+ index"/>
    </div>

    <div class="categoryItems">
      <h2>Your items </h2>
    </div>

    <div class="playerslots Yitems">

      <CollectorsCard v-for="(card, index) in player.items" :card="card" :key="'item'+ index" />
    </div>
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
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* =====================================
    PLAYER BOARD (GRID)                 */

.playerContainer {
  background-color: #ececec;
  width: 100%;
  height: 50%;
  grid-gap: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5% 10% 20% 15% 15% 15%;
  grid-template-areas:
  "playerHeader playerHeader"
  "coinSymbol futureSymbol"
  "textbottles textbottles"
  "categoryItems items "
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
.coinSymbol{
    grid-area: coinSymbol;
}
.futureSymbol{
    grid-area: futureSymbol;
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
