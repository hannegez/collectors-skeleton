<template>
  <div class="gainSkill">


    <div class="gainSkillInfo">
      <div class="popup" style= "position:relative; left:0em; top:0em;">
        <img src='/images/gainSkill.PNG' alt="Gain skill" width="70%" @click="$emit('getInfo')" >
      </div>
    </div>

    <div class="skillCards">
      <div v-for="(card, index) in reversedSkills" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="chooseAction(card)"/>
      </div>
    </div>

    <div class="bottlePlacements">
      <div v-for="(p, index) in placement" :key="'bp' + index">
        <input class="bottlePlacement"
        type="image"
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeBottle(p)"
        src='/images/bottle_placement.png' >
        <p class="buttonText" v-if="p.playerId===null"> ${{p.cost}} </p>
        <div v-if="p.playerId !== null">
          <input class="bottlePlacement" type="image" :src="placedBottle(p.playerId)" >
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
    players: Object,
    skillsOnSale: Array,
    placement: Array,
    chosenAction: String
  },

  computed: {
    reversedSkills: function() {
      return [...this.skillsOnSale].reverse();
    }
  },

  methods: {
    placedBottle: function (playerId) {
      return '/images/bottle_' + this.players[playerId].color + '.png';
    },
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
<style scoped>

.gainSkill{
  grid-gap: 1em;
  display: grid;
  grid-template-rows: 25% 10%;
  grid-template-columns: 50% 50%;
  grid-template-areas:
  "skillCards gainSkillInfo"
  "skillCards bottlePlacements";
}

.skillCards{grid-area: skillCards;}
.bottlePlacements{grid-area: bottlePlacements;}

.gainSkillInfo{grid-area: gainSkillInfo;}

  </style>
