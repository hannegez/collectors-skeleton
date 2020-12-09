<template>
    <div>
      <h2>{{ labels.startAuction }}</h2>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->

<!--BUY CARDS -->
<!--       <div class="buy-cards">
        <div v-for="(card, index) in auctionCards" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="startWork(card)"/>

        </div>
      </div> -->


      <div>
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId===null"
            :disabled="cannotAfford(p.cost)"
            @click="placeBottle(p)" >
            ${{p.cost}}
          </button>
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

        </div>
      </div>  -->

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
    itemsOnSale: Array,
    marketValues: Object,
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

    placeBottle: function (p) {
      this.$emit('placeBottle', p.cost);
    },
    setAvailable: function (card) {
      this.$set(card, "available", true);
    },
    startWork: function (card) {
      if (card.available) {
        this.$emit('startWork', card);

      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-cards, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
  }
</style>
