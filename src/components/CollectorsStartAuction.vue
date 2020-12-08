<template>
    <div>
      <h2>{{ labels.buyCard }}</h2>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->

<!--BUY CARDS -->
      <div class="buy-cards">
        <div v-for="(card, index) in auctionCards" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="startAuction(card)"/>
            <!-- {{ cardCost(card) }} -->
        </div>
      </div>


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

      <h2> AuctionSpot </h2>
      <div class="buy-cards">
        <div v-for="(card, index) in auctionSpot" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="startAuction(card)"/>
            <!-- {{ cardCost(card) }} -->
        </div>
      </div>

    </div>

</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'
export default {
  name: 'CollectorsStartAuction',
  components: {
    CollectorsCard
  },
  props: {            //HÄR ÄR ALLA v-binds FRÅN ELEMENTET I Collectors.vue
    labels: Object,  //specify what kind of object
    player: Object,
    auctionCards: Array,
    auctionSpot: Array,
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
      this.highlightAvailableCards(p.cost);
    },
    setAvailable: function (card) {
      this.$set(card, "available", true);
    },

    highlightAvailableCards: function () {
      for (let i = 0; i < this.auctionCards.length; i += 1) {
        this.setAvailable(this.auctionCards[i]);
        console.log("AuctionCard ska highlightas");
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {                              //ÄVEN KORTEN PÅ HAND HIGHLIGHTAS, SÅ VILL VI EJ HA DET
        this.setAvailable(this.player.hand[i]);
        console.log("Hand ska highlightas");
      }
    },
    startAuction: function (card) {
      if (card.available) {
        this.$emit('startAuction', card);
        this.highlightAvailableCards();
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
