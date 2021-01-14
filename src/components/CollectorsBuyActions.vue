<template>
  <div class="buyItem">
    <div class="buyItemHeader">
      <div class="buyInfo">
        <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/buyItem.PNG' alt="Buy Item" width="60%" @click="$emit('getInfo')" >
        </div>
      </div>
    </div>

    <div class="horizontalBuyCards">
      <div v-for="(card, index) in itemsOnSale" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="buyCard(card)"/>
      </div>
    </div>

    <div>
      <div class="bottlePlacements horizontalPlacement">
        <div v-for="(p, index) in placement" :key="'bp' + index">
          <input class="bottlePlacement"
          type="image"
          v-if="p.playerId===null"
          :disabled="cannotAfford(p.cost)"
          @click="placeBottle(p)"
          src='/images/bottle_placement.png' >
          <span class="buttonText" v-if="p.playerId===null"> ${{p.cost}} </span>
          <div v-if="p.playerId !== null">
            <input class="bottlePlacement" type="image" :src="placedBottle(p.playerId)" >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'
export default {
  name: 'CollectorsBuyActions',
  components: {
    CollectorsCard
  },
  props: {            //HÄR ÄR ALLA v-binds FRÅN ELEMENTET I Collectors.vue
    labels: Object,  //specify what kind of object
    player: Object,
    players: Object,
    itemsOnSale: Array,
    skillsOnSale: Array,
    marketValues: Object,
    placement: Array
  },

  methods: {
    placedBottle: function (playerId) {
      return '/images/bottle_' + this.players[playerId].color + '.png';
    },
    cannotAfford: function (cost) {
      let minCost = 100;
      for(let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
        minCost = cost + this.marketValues[key]
      }
      return (this.player.money < minCost);
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit('placeBottle', p.cost);
      this.highlightAvailableCards(p.cost);
    },
    checkAvailable: function (card, cost) {
      if (this.marketValues[card.item] <= this.player.money - cost) {
        this.$set(card, "available", true);
      }
      else {
        this.$set(card, "available", false);
      }
    },
    highlightAvailableCards: function (cost=100) {
      for (let i = 0; i < this.itemsOnSale.length; i += 1) {
        this.checkAvailable(this.itemsOnSale[i], cost);
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        this.checkAvailable(this.player.hand[i], cost);
      }
    },
    buyCard: function (card) {
      if (card.available) {
        this.$emit('buyCard', card)
        this.highlightAvailableCards()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buyItem{
  grid-gap: 5%;
  display: grid;
  grid-template-rows: 36% 10%;
  grid-template-columns: 80% 20%;
  grid-template-areas:
  "buyCards buyItemHeader"
  "bottlePlacements buyInfo";
}

.horizontalBuyCards{grid-area: buyCards;}
.bottlePlacements{grid-area: bottlePlacements;}
.buyItemHeader{grid-area: buyItemHeader;}
.buyInfo{grid-area: buyInfo;}

</style>
