<template>
    <div>
      <h2>{{ labels.raiseValue }}</h2>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->

<!--BUY CARDS raiseValueOnSale borttagen for now-->
      <!-- <div class="buy-cards">
        <div  v-for="(card, index) in skillsOnSale" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="raiseValue(card)"/>
          {{ cardCost(card) }}
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

      <h2>MARKET</h2> <!-- FATTAR EJ VARFÖR DENNA INTE VERKAR FUNKA... -->
      <div class="buy-cards">
        <div v-for="(card, index) in market" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="raiseValue(card)"/>
            <!-- {{ cardCost(card) }} -->
        </div>
      </div>

    </div>

</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'
export default {
  name: 'CollectorsRaiseValue',
  components: {
    CollectorsCard
  },
  props: {            //HÄR ÄR ALLA v-binds FRÅN ELEMENTET I Collectors.vue
    labels: Object,  //specify what kind of object
    player: Object,
  //itemsOnSale: Array,
    auctionCards: Array,
  //  raiseValueOnSale: Array,
    market: Array,
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

    setAvailable: function (card) {
        this.$set(card, "available", true);
    },

    //byt ut till setavailable --> gain skill..
    checkAvailable: function (card, cost) {
      if (this.marketValues[card.item] <= this.player.money - cost) {
        this.$set(card, "available", true);
      }
      else {
        this.$set(card, "available", false);
      }
    },

    highlightAvailableCards: function (cost=100) {
      /* för alla kort i raiseValueOnSale ska motsvarade kort i skillsOnSale,
      auctionCards och player.hand highlightas */

      //GÅ IGENOM skillsOnSale AUCTIONCARDS OCH PLAYER HAnd och sätt available på de som ska vara det
      //NÄSTA STEG: ta bort raiseValueOnSale

      //    for (let i = 0; i < this.raiseValueOnSale.length; i += 1) {
      //    this.checkAvailable(this.raiseValueOnSale[i], cost);
      //  }
      //Denna ovan ska bort, ska lägga till första element i auction och i skill.

      //  highlightAvailableCards: function () {
      for (let i = 0; i < this.auctionCards.length; i += 1) {
        if (this.auctionCards[i].x>0) {
          this.setAvailable(this.auctionCards[i]);
          console.log("first AuctionCard ska highlightas");
          break;
        }
      }

      for (let i = 0; i < this.player.hand.length; i += 1) {                              //ÄVEN KORTEN PÅ HAND HIGHLIGHTAS, SÅ VILL VI EJ HA DET
        this.setAvailable(this.player.hand[i], cost);
      }

      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
        if (this.skillsOnSale[i].x>0) {
          this.setAvailable(this.skillsOnSale[i]);
          console.log("first skillsOnSale ska highlightas");
          break;
        }
      }
    },

    raiseValue: function (card) {
      if (card.available) {
        this.$emit('raiseValue', card)
        this.highlightAvailableCards()
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
