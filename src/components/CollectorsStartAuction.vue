<!-- Daniella har varit här och ändrat i griden -->

<template>
  <div class="startAuction">

    <div class="auctionInfo">
      <div class="popup" style= "position:relative; left:7em; top:0em;">
        <img src='/images/startAuction.png' alt="Start auction" width="45%"  @click="$emit('getInfo')" >
      </div>
    </div>



    <!--BUY CARDS -->
    <div class="buyCards horizontalPlacement">
      <div v-for="(card, index) in reverseAuctionCards" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="chooseAction(card)"/>
        <!-- {{ cardCost(card) }} -->
      </div>
    </div>



<div class="bottlePlacements horizontalPlacement">
  <div v-for="(p, index) in placement" :key="'bp' + index">
    <input class="bottlePlacement"
    type="image"
    v-if="p.playerId===null"
    :disabled="cannotAfford(p.cost)"
    @click="placeBottle(p)"
    src='/images/bottle_placement.png' >
    <p class="buttonText"> ${{p.cost}} </p>
    <div v-if="p.playerId !== null">
      {{p.playerId}}
    </div>
  </div>
</div>

 <!-- FATTAR EJ VARFÖR DENNA INTE VERKAR FUNKA... -->
<div class="auctionCards horizontalPlacement">
  <h2>{{ labels.auctionSpot }}</h2>
  <br>
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
    placement: Array,
    chosenAction: String
    //NÅNTING MED WORK?
  },
  computed: {
    reverseAuctionCards: function() {
      return [...this.auctionCards].reverse();
    }
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
      this.highlightAvailableCards();
    },

    setAvailable: function (card) {
      this.$set(card, "available", true);
    },

    chooseAction(card){
      this.$emit('chooseAction', card);
    },

    highlightAvailableCards: function () {
      for (let i = 0; i < this.auctionCards.length; i += 1) {
        this.setAvailable(this.auctionCards[i]);
        console.log("AuctionCard ska highlightas");
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
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
.startAuction{
  grid-gap: 1em;
  display: grid;
  grid-template-rows: 35% 25% 25%;
  grid-template-columns: 50% 50%;
  grid-template-areas:
  "bottlePlacements auctionInfo"
  "auctionCards buyCards"
  "auctionCards buyCards";
}

.buyCards{grid-area: buyCards;
padding-top: 2.5em;}
.bottlePlacements{grid-area: bottlePlacements;
  padding-top: 3em;
}
/*
.auctionHeader{grid-area: auctionHeader;
  font-weight: bold;
  font-size: 1.4em;
  padding-top: 0.9em;
  padding-left: 1em;} */
.auctionInfo{grid-area: auctionInfo;}
.auctionCards{grid-area: auctionCards;
padding-top: 2em;}




/* .buy-cards, .buttons {
display: grid;
grid-template-columns: repeat(auto-fill, 130px);
} */
</style>
