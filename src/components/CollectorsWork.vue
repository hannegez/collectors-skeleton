<template>
  <div class="startWork">
    <div class="workHeader" >
    </div>

    <div class="workInfo">
      <div class="popup" style= "position:relative; left:0em; top:0em;">
        <img src='/images/workInfo.PNG' alt="Work" width="70%" @click="$emit('getInfo')"  >
      </div>
    </div>

    <div class="bottlePlacements">
      <div v-for="(p, index) in placement" :key="'bp' + index">
        <input class="bottlePlacement"
        type="image"
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeWorkBottle(p)"
        src='/images/bottle_placement.png' >

        <p class="buttonText" v-if="p.playerId===null"> ${{p.cost}} </p>

        <div v-if="p.playerId !== null">
          <input class="bottlePlacement" type="image" :src="placedBottle(p.playerId)" >
        </div>
      </div>
    </div>

    <!--försöker koppla till start work, sista kopplar för att kortenfinns men emit fungerar ej DANI-->
    <div class="workImages">
      <br>

      <img  alt="" src="/images/quartertile_1.PNG"
      height="28%" id="imgClickAndChange"   /> <!-- @click="startWork()" -->
      <br>
      <img  src="/images/work_recycle.png" alt="" height="28%"> <!-- @click="$emit('startWork', card)"-->
      <br>
      <img src="/images/work_gainTwo.png" alt="" height="28%"> <!-- @click="$emit('startWork', card)"-->
      <br>
      <img  src="/images/work_firstPlayer.png" alt="" height="28%"> <!-- @click="$emit('startWork', card)"-->
      <br>
      <img src="/images/work_futureIncome.png" alt="" height="28%">
    </div>
  </div>

</template>

<script>
export default {
  name: 'CollectorsStartWork',
  components: {
  },
  props: {            //HÄR ÄR ALLA v-binds FRÅN ELEMENTET I Collectors.vue
    labels: Object,  //specify what kind of object
    player: Object,
    players: Object,
    skillsOnSale: Array,
    placement: Array
    //NÅNTING MED WORK?
  },
  methods: {
    placedBottle: function (playerId) {
      return '/images/bottle_' + this.players[playerId].color + '.png';
    },
    cannotAfford: function (cost) {
      let minCost = 100;
      if (cost < minCost)
      minCost = cost;
      return (this.player.money < minCost);
    },

    placeWorkBottle: function (p) {
      this.$emit('placeWorkBottle', p); //emitta hela p.
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.workInfos {
  margin-left: 3em;
  width: 7vw;
}

.startWork{
  grid-gap: 0em;
  display: grid;
  grid-template-rows: 12% 10% 10%;
  grid-template-columns: 40% 60%;
  grid-template-areas:
  "gainWorkHeader workInfo"
  "bottlePlacements workImages"
  "bottlePlacements workImages";
}

.bottlePlacements{
  grid-area: bottlePlacements;
  margin-top: 2em;
}
.workHeader{grid-area: gainWorkHeader;}
.workInfo{grid-area: workInfo;}
.workImages{grid-area: workImages;}

</style>
