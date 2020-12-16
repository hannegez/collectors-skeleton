<template>
    <div>

      <div>
        <h2>{{ labels.buyCard }}</h2>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->
        <p>{{ marketValues }}</p>
    </div>

      <div class="buy-cards">
        <div v-for="(card, index) in itemsOnSale" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="buyCard(card)"/>
          {{ cardCost(card) }}
        </div>
      </div>

      <div>

        <!-- GAMLA BOTTLE PLACEMENT - KNAPPAR
        <div class="buttons" v-for="(p, index) in placement" :key="'original' + index">
          <button
            v-if="p.playerId===null"
            :disabled="cannotAfford(p.cost)"
            @click="placeBottle(p)" >
            ${{p.cost}}
          </button>
          <div v-if="p.playerId !== null">
            {{p.playerId}}
          </div>
        </div> -->

<div class="bottlePlacements">
        <div v-for="(p, index) in placement" :key="'bp' + index">
          <input type="image"
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


      </div>

    </div>


</template>
<!--<div class="box pink">
    <div class="box arrow">pilar</div>
    <div class="box bottlePink">flaskor</div>
    <div class="box pinks">enfärg</div>
    <div class="box pinkInfo" style= "position:relative; left:0; top:0em;" @click="getInfo($event)">
    <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
    </div>
</div> -->

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
    itemsOnSale: Array,
    skillsOnSale: Array,
    marketValues: Object,
    placement: Array
    //NÅNTING MED WORK?
  },
  methods: {
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
      console.log("marketValue:",this.marketValues[card.item],"player money:",this.player.money, "cost:",cost);
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

   .bottlePlacements {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
  }








</style>
