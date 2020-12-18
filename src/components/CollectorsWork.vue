<template>
  <div class="startWork">
    <div class="workHeader">
      <h2>{{ labels.startWork }}</h2>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->
    </div>

    <div class="workInfo">
      <div class="popup" style= "position:relative; left:0em; top:0em;">
      <img src='/images/workInfo.PNG' alt="" width="70%" @click="$emit('getInfo')" >
      <span class="popuptext" id="myWorkPopup"  style= "left:2em; top:-3em;">
        work kan användas bla bla bla
      <!--  <img src='/images/skills_info.png'>  Maja har lagt till-->
      </span>
      </div>
    </div>
    <!--<div class="popup" style= "position:relative; left:0em; top:0em;">
    <img src='/images/workInfo.PNG' alt="" width="80%" @click="getInfo($event,'work')" >
    <span class="popuptext" id="myWorkPopup"  style= "position:relative; left:3em; top:-11em;">
      work kan användas bla bla bla
    </span>
  </div> -->


  <!-- här måste bilderna ändras från mynt /dani -->

    <div class="bottlePlacements">
      <div v-for="(p, index) in placement" :key="'bp' + index">
        <input class="bottlePlacement"
        type="image"
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeWorkBottle(p)"
        src='/images/bottle_placement.png' >
        <img class="workInfo" src='/images/coin100px.png'>
        <p class="buttonText"> ${{p.cost}} </p>
        <div v-if="p.playerId !== null">
          {{p.playerId}}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'CollectorsStartWork',
  components: {
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

    placeWorkBottle: function (p) {
      this.$emit('placeWorkBottle', p); //emitta hela p.
    },
    setAvailable: function (card) {
      this.$set(card, "available", true);
    },
    //HJÄLP 18/12
    highlightAvailableCards: function (workAction)  {
      console.log("vår workaction: ", workAction);
      if (workAction === 5) {
        console.log("inne i hightligh if-satsen");
        for (let i = 0; i < this.player.hand.length; i += 1) {
          console.log("inne i hightlight for-loopen");
          this.setAvailable(this.player.hand[i]);
          console.log("Hand ska highlightas");
        }
      }
    },
    startWork: function (card) {//skicka placerin/textsträng till startWork ex actiion
      console.log("startWork 1" + card);
      if (card.available) {
        this.$emit('startWork', card); //skicka placerin/textsträng till startWork ex actiion
        console.log("startWork 2" + card);

      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.workInfo {
  margin-left: 3em;
  width: 7vw;
}

.startWork{
  grid-gap: 1em;
  display: grid;
  grid-template-rows: 1% 10% 10%;
  grid-template-columns: 50% 50%;
  grid-template-areas:
  "gainWorkHeader workInfo"
  "bottlePlacements bottlePlacements"
  "bottlePlacements bottlePlacements";
}


.bottlePlacements{grid-area: bottlePlacements;}
.workHeader{grid-area: gainWorkHeader;}
.workInfo{grid-area: workInfo;}




</style>
