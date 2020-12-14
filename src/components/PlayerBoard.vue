<!-- här testar jag att skapa player board, har även infogat player_board.png i images
    copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
  <div class="player board">
    <h1>PLAYER INFO</h1>

    <h2>Your hand</h2>
    <div class="cardslots" >
      <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(chosenAction, card)" :key="'hand'+ index"/>
    </div>

    <h2>Your items </h2>
    <div class="cardslots" >
      <CollectorsCard v-for="(card, index) in player.items" :card="card" :key="'item'+ index" />
    </div>

    <h2>Your skills</h2>
    <div class="cardslots">
      <CollectorsCard v-for="(card, index) in player.skills" :card="card" :key="'skill' +index"/>
    </div>

    <h2>FAKE MONEY</h2>
    <button @click="player.money += 1">
      fake more money
    </button>

    <div id="drawCard" class="buttons">
      <p class="buttonText">{{ labels.draw }}</p>
      <input type="image" @click="drawCard" class="imgButton" alt="Login"
      src='/images/card_backside300px.png' value="Draw card">    <!-- NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY -->
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

.player {
  background-color: pink;
}


</style>
