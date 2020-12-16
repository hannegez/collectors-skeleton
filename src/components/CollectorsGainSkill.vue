<template>
  <div class="gainSkill">
    <div class="gainSkillHeader">
      <h2>{{ labels.gainSkill }}</h2>
    </div>

    <div class="buyCards">
      <div v-for="(card, index) in skillsOnSale" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="chooseAction(card)"/>
      </div>
    </div>

    <!-- <div>
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
    placement: Array,
    chosenAction: String
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
    chooseAction(card){
      this.$emit('chooseAction', card);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.gainSkill{
  grid-gap: 1em;
  display: grid;
  grid-template-rows: 10% 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
  "gainSkillHeader gainSkillHeader"
  "buyCards bottlePlacements";
}

.buyCards{grid-area: buyCards;}
.bottlePlacements{grid-area: bottlePlacements;}
.gainSkillHeader{grid-area: gainSkillHeader;}

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
/*<style scoped>
  .gain-skill, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
  }*/


</style>
