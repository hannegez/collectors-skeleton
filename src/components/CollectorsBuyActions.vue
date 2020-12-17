<template>
  <div class="buyItem">

    <div class="itemHeader">
      <h1>{{ labels.buyItem }}</h1>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->
    </div>

    <div id="drawCard" class="popup" style="position:relative; left:0; top:0em;">
      <p class="buttonText">Info</p>
      <input type="image" @click="showInfoItem" class="imgButton" alt="Login"
      src='/images/coin100px.png' value="Draw card"  >    <!-- NÄR MAN DRAR KORT ÅTERSTÄLLS ENS MONEY -->
    </div>

    <div class="buyCards horizontalBuyCards">
      <div v-for="(card, index) in itemsOnSale" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="buyCard(card)"/>
        {{ cardCost(card) }}
      </div>
    </div>

    <div>


<div class="bottlePlacements horizontalPlacement">
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
    showInfoItem: function() {
      console.log("hej här är popup");
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      popup.style.left=event.clientX - event.target.getBoundingClientRect().x +"px";
      popup.style.top=event.clientY - event.target.getBoundingClientRect().y - 70+"px"  ;
      console.log(popup.style, event.clientX, event.clientY);
    },




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
<style>
.popup .show {
  display: block;
}

.popuptext {
  position: absolute;
  display: none;
  cursor: pointer;

  user-select: none;


  width: 160px;
  background-color: pink;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;

  z-index: 1;

  margin-left: -80px;
}


.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 10px;
  border-style: solid;
  border-color: pink transparent transparent transparent;
}

/* SLUT PÅ POPUP*/
.pink{
  grid-area: topp;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr ;
  grid-template-areas:
  " a a a a a g"
  " b b b b b c ";
}
.arrow{
  grid-area: a;
  background: url('/images/pilrosa.PNG' ) ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bottlePink{
  grid-area: b;
  background: url('/images/rosaflaska.PNG' )  ;
  background-repeat: no-repeat;
  background-size: 100% 100%;

}
.pinks{
  grid-area: c;
  background: url('/images/rosa.PNG' ) ;
  background-repeat: no-repeat; /* gör att endast en syns men vill att en ska synas per grid*/
  background-size: 100% 100%;

}
.pinkInfo{
  grid-area: g;
  background: url('/images/buyItem.PNG' ) ;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
