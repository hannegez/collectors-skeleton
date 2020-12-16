<!-- här testar jag att skapa player board, har även infogat player_board.png i images
copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
  <div class= "playerContainer">


    <div class = "playerHeader">
      <h1>PLAYER INFO</h1>
      <p><img class= "playerSymbol" src='/images/coin100px.png' alt="coin symbol"> X {{player.money}}</p>
      <p><img class= "playerSymbol" src='/images/future_income100px.png' alt="income symbol"> X {{player.income}}</p>
      <p>Total bottles: {{player.totalBottles}}</p>
      <p>Bottles left: {{player.bottlesLeft}}</p>


      <br>
      <button @click="player.money += 1">
        <h2>FAKE MONEY</h2>
      </button>
    </div>

    <div class="playerslots Yhand" >
      <h2>Your hand</h2>
      <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(chosenAction, card)" :key="'hand'+ index"/>
    </div>


    <div class="playerslots Yitems">
      <h2>Your items </h2>
      <CollectorsCard v-for="(card, index) in player.items" :card="card" :key="'item'+ index" />
    </div>


    <div class="playerslots Yskills">
      <h2>Your skills</h2>
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
    //NÅNTING MED WORK?
  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.playerContainer {
  background-color: #ececec;
  width: 100%;
  height: 50%;
  grid-gap: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 40% 20% 20% 20%;
  grid-template-areas:
  "playerHeader playerHeader playerHeader"
  "items items items"
  "skill skill skill"
  "hand hand hand";
}

.playerHeader {
  grid-area: playerHeader;
}

.Yhand {
  grid-area: hand;
}

.Yskills {
  grid-area: skill;
}

.Yitems {
  grid-area: items;
}



.playerSymbol{
  width: 20%;
}


.playerslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
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
