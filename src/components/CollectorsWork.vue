<template>
  <div>
    <div class="workHeader">
      <h2>{{ labels.startWork }}</h2>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->
    </div>

  <!-- merge ta bort? 7-24   HEAD -->
        <!--BUY CARDS -->
        <!--       <div class="buy-cards">
        <div v-for="(card, index) in auctionCards" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="startWork(card)"/>

      </div>
    </div>-->
    <!--  HEAD
     gör om till objekt och skicka med kostnad och action samt ändra i placement. -->
    <!--      <div>
    <div class="buttons" v-for="(p, index) in placement" :key="index">-->
        <!--  <div>
            <div class="buttons" v-for="(p, index) in placement" :key="index">
    ======= -->

    <div class="bottlePlacements">
      <div v-for="(p, index) in placement" :key="'bp' + index">
        <input class="bottlePlacement"
        type="image"
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeWorkBottle(p)"
        src='/images/bottle_placement.png' >
        <img class="workInfo" src='/images/coin100px.png'>
        <p class="buttonText"> ${{p.cost}} </p>
        <div v-if="p.playerId !== null">
          {{p.playerId}}
        </div>
        </div>
<!--          ${{p.cost}}
${{p.workAction}}
{{p}}
{{index}} -->
<!--          <button
v-if="p.playerId===null"
:disabled="cannotAfford(p.cost)"
@click="placeWorkBottle(p)" >
kostnad ${{p.cost}}
knappnummer {{p.workAction}}

</button>
<div v-if="p.playerId !== null">
{{p.playerId}}
</div>-->


<div class="bottlePlacements">
  <div v-for="(p, index) in placement" :key="'bp' + index">
    <input type="image"
    v-if="p.playerId===null"
    :disabled="cannotAfford(p.cost)"
    @click="placeWorkBottle(p)"
    src='/images/bottle_placement.png' >
    <p class="buttonText"> ${{p.cost}} </p>
    <div v-if="p.playerId !== null">
      {{p.playerId}}
    </div>
  </div>
</div>


<!--börjar här -->
<h2>{{ labels.workSpot }}</h2> <!-- FATTAR EJ VARFÖR DENNA INTE VERKAR FUNKA... -->
<!--      <div class="buy-cards">
<div v-for="(card, index) in auctionSpot" :key="index">
<CollectorsCard
:card="card"
:availableAction="card.available"
@doAction="startWork(card)"/>

</div>-->
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
    skillsOnSale: Array,
    placement: Array
    //NÅNTING MED WORK?
  },
  methods: {
    cannotAfford: function (cost) {
      let minCost = 100;
      if (cost < minCost)
      minCost = cost;
      return (this.player.money < minCost);
    },

    placeWorkBottle: function (p) {
      this.$emit('placeWorkBottle', p); //emitta hela p.
    },
    setAvailable: function (card) {
      this.$set(card, "available", true);
    },
    startWork: function (card) {//skicka placerin/textsträng till startWork ex actiion
      console.log("startWork 1" + card);
      if (card.available) {
        this.$emit('startWork', card); //skicka placerin/textsträng till startWork ex actiion
        console.log("startWork 2" + card);

      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

/* ta bort? merge, 128-132 HEAD */
/* .buy-cards, .buttons {
display: grid;
grid-template-columns: repeat(auto-fill, 130px);
} */

.workInfo {
  margin-left: 3em;
  width: 7vw;
}

</style>
