<template>
  <div class="startWork">
    <div class="workHeader" >
    <!--  {{ labels.startWork }}     behövs ej längre pga infoknappar-->
    </div>

    <div class="workInfo">
      <div class="popup" style= "position:relative; left:0em; top:0em;">
      <img src='/images/workInfo.PNG' alt="Work" width="70%" @click="$emit('getInfo')" >
      <span class="popuptext" id="myWorkPopup"  style= "left:10em; top:-3em;">
        {{ labels.workInfo }}
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


  <!-- har ändrat bilderna från coin till bilderna som ska va, första bilden vet jag ej hur vi ska göra /dani -->

    <div class="bottlePlacements">
      <div v-for="(p, index) in placement" :key="'bp' + index">
        <input class="bottlePlacement"
        type="image"
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeWorkBottle(p)"
        src='/images/bottle_placement.png' >

        <p class="buttonText"> ${{p.cost}} </p>

        <div v-if="p.playerId !== null">
          {{p.playerId}}
        </div>

      </div>
    </div>

    <div class="workImages">
      <br>
      <img src="/images/work_recycle.png" alt="" width="25%">
      <br>
      <img src="/images/work_recycle.png" alt="" width="25%">
        <br>
      <img src="/images/work_gainTwo.png" alt="" height="36%">
        <br>
      <img src="/images/work_firstPlayer.png" alt="" height="36%">
        <br>
      <img src="/images/work_futureIncome.png" alt="" height="36%">
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

.workInfos {
  margin-left: 3em;
  width: 7vw;
}

.startWork{
  grid-gap: 0em;
  display: grid;

  grid-template-rows: 10% 10% 10%;
  grid-template-columns: 40% 60%;
  grid-template-areas:
  "gainWorkHeader workInfo"
  "bottlePlacements workImages"
  "bottlePlacements workImages";
}


.bottlePlacements{grid-area: bottlePlacements;
margin-top: 2em;}
.workHeader{grid-area: gainWorkHeader;}
.workInfo{grid-area: workInfo;}
.workImages{grid-area: workImages;}






</style>
