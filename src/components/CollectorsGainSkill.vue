<template>
  <div class="gainSkill">
    <div class="gainSkillHeader">
      <!-- {{ labels.gainSkill }} behövs ej längre pga infoknappar -->
    </div>

    <div class="gainSkillInfo">
      <div class="popup" style= "position:relative; left:0em; top:0em;">
      <img src='/images/gainSkill.PNG' alt="Gain skill" width="70%" @click="$emit('getInfo')" >
      <span class="popuptext" id="mySkillPopup"  style= "left:10em; top:-3em;">
        {{ labels.skillInfo }}

        <br>
        <img src='/images/skills_info1.PNG' width="300em">
        <img src='/images/skills_info2.PNG' width="300em">
        <img src='/images/skills_info3.PNG' width="300em">
      <!--  <img src='/images/skills_info.png'>  Maja har lagt till-->
      <br>
      <button class="closeButton"  @click="$emit('getInfo')">close</button>
      </span>
      </div>
    </div>

    <div class="buyCards">
      <div v-for="(card, index) in reversedSkills" :key="index">
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
  computed: {
    reversedSkills: function() {
      return [...this.skillsOnSale].reverse();
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

    // chooseAction(action, card){
    //   console.log("action utskrift", action);
    // if (action === "skill") {
    //     this.gainSkill(card);
    //   }
    //
    //   else if (action === "market") {
    //     this.raiseValue(card);
    //   }
    //   /* HÄR LÄGGER VI SEN TILL workPlacement: */
    //   else if (action === "work") {
    //     this.startWork(card); /*måste ändras*/
    //   //  work(card);
    //   }

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
  grid-template-rows: 1% 25% 10%;
  grid-template-columns: 50% 50%;
  grid-template-areas:
  "gainSkillHeader gainSkillInfo"
  "buyCards gainSkillInfo"
  "buyCards bottlePlacements";
}

.buyCards{grid-area: buyCards;}
.bottlePlacements{grid-area: bottlePlacements;}
.gainSkillHeader{grid-area: gainSkillHeader;
  font-weight: bold;
  font-size: 1.2em;
  padding-top: 0;}
.gainSkillInfo{grid-area: gainSkillInfo;}

</style>
