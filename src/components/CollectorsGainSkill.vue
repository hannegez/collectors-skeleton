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
      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
        this.setAvailable(this.skillsOnSale[i]);
      }
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



  .green{
    grid-area: lside;
    display: grid;
    grid-template-columns: 1fr 1fr ;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;

    grid-template-areas:
      " i j "
      " k l "
      " k l "
      " k l "
      " k l "
      " k l ";
  }
  .arrowGreen{
    grid-area: k;
    background: url('/images/pilgron.PNG' ) ;
    background-repeat: no-repeat;
    background-size: 30% 95%;

  }
  .bottleGreen{
    grid-area: l;
    background: url('/images/gronflaska.PNG' )  ;

    background-repeat: no-repeat;
    background-size: 100% 95%;

  }
  .greens{
    grid-area: i;
    background: url('/images/gron.PNG' ) ;
    background-repeat: no-repeat; /* gör att endast en syns men vill att en ska synas per grid*/
    background-size: 110% 100%;

  }
  .greenInfo{
    grid-area: j;
    background: url('/images/gainSkill.PNG' ) ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
