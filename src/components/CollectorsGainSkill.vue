<template>
    <div>
        <p>Denna rubrik vill vi ändra så att det står annat för gain skill:</p>
      <h2>{{ labels.gainSkill }}</h2>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->

<!--BUY CARDS -->
      <div class="gain-skill">
        <div v-for="(card, index) in skillsOnSale" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="gainSkill(card)"/>
        <!--  {{ cardCost(card) }} -->
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

    </div>

</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'
export default {
  name: 'CollectorsGainSkill',
  components: {
    CollectorsCard
  },
  props: {            //HÄR ÄR ALLA v-binds FRÅN ELEMENTET I Collectors.vue
    labels: Object,  //specify what kind of object
    player: Object,
    skillsOnSale: Array,
    marketValues: Object, // DENNA SKA BORT
    placement: Array
    //NÅNTING MED WORK?
  },
  methods: {
    cannotAfford: function (cost) {
      let minCost = 100;
      //for(let key in this.marketValues) {
        if (cost < minCost)
          minCost = cost;
      //}
      return (this.player.money < minCost);
    },
  //  cardCost: function (card) {
    //  return this.marketValues[card.market];
    //},

    placeBottle: function (p) {
      this.$emit('placeBottle', p.cost);
      this.highlightAvailableCards(p.cost);
    },
    setAvailable: function (card) {
        this.$set(card, "available", true);
    },
    highlightAvailableCards: function () {
      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
        this.setAvailable(this.skillsOnSale[i]);
      }
      //ÄVEN KORTEN PÅ HAND HIGHLIGHTAS, SÅ VILL VI EJ HA DET
    //  for (let i = 0; i < this.player.hand.length; i += 1) {
      //  this.setAvailable(this.player.hand[i]);
    //  }
    },
    gainSkill: function (card) {
      if (card.available) {
        this.$emit('gainSkill', card)
        this.highlightAvailableCards()
      }
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .gain-skill, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
  }
</style>
