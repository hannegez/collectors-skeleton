<!-- här testar jag att skapa player board, har även infogat player_board.png i images
    copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
  <div class= "playerContainer">
    <h1>PLAYER INFO</h1>
    {{player}}

    <h2>Your hand</h2>
    <div class="playerslots Yhand" >
      <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(chosenAction, card)" :key="'hand'+ index"/>
    </div>

    <h2>Your items </h2>
    <div class="playerslots Yitems">
      <CollectorsCard v-for="(card, index) in player.items" :card="card" :key="'item'+ index" />
    </div>

    <h2>Your skills</h2>
    <div class="playerslots Yskills">
      <CollectorsCard v-for="(card, index) in player.skills" :card="card" :key="'skill' +index"/>
    </div>

    <h2>FAKE MONEY</h2>
    <button @click="player.money += 1">
      fake more money
    </button>



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
    grid-gap: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
    "items items items"
    "skill skill skill"
    "hand hand hand";
}

.Yhand {
  grid-area: hand;
  color: blue;
}

.Yskills {
  grid-area: skill;
  color: green;
}

.Yitems {
  grid-area: items;
  color: yellow;
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
