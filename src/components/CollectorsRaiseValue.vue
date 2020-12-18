<template>
  <div class="raiseValue">
    <div class="raiseValueHeader">
      <h3>{{ labels.raiseValue }}</h3>       <!-- DET SOM STÅR HÄR FINNS I DATAMAPPEN -->

      <div class="popup" style= "position:relative; left:0em; top:0em;">
      <img src='/images/infoknapp_rv.png' alt="" width="70%" @click="$emit('getInfo')" >
      <span class="popuptext" id="myMarketPopup"  style= "left:3em; top:-3em;">
        raise value används för att yada yada yada
      </span>
      </div>
    </div>

    <div class="bottlePlacements horizontalPlacement">
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

    <div class="marketValues">
      <div class="marketValue">
        <p>{{marketValues.fastaval}}</p>
        <img class="valueSymbol" src='/images/fastaval_symbol.png'>
</div>
<div class="marketValue">
        <p>{{marketValues.figures}}</p>
        <img class="valueSymbol" src='/images/figures_symbol.png'>
      </div>
      <div class="marketValue">
        <p>{{marketValues.music}}</p>
        <img class="valueSymbol" src='/images/music_symbol.png'>
      </div>
      <div class="marketValue">
        <p>{{marketValues.movie}}</p>
        <img class="valueSymbol" src='/images/movie_symbol.png'>
      </div>
      <div class="marketValue">
        <p>{{marketValues.technology}}</p>
        <img class="valueSymbol" src='/images/technology_symbol.png'>
    </div>
  </div>
</div>

  <!-- OBS: alla kort som lagts till i market, detta ska ej synas i slutet, men låter det vara kvar tillfälligt -->
  <!-- <div class="buyCards horizontalBuyCards">
  <div v-for="(card, index) in market" :key="index">
  <CollectorsCard
  :card="card"
  :availableAction="card.available"
  @doAction="raiseValue(card)"/>
  {{ cardCost(card) }}
</div> -->

</template>

<script>
//import CollectorsCard from '@/components/CollectorsCard.vue'
export default {
  name: 'CollectorsRaiseValue',
  components: {
    //  CollectorsCard
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
<style>

.raiseValue{
  grid-gap: 1em;
  display: grid;
  grid-template-rows: 40% 60%;
  grid-template-columns: 10% 90%;
  grid-template-areas:
  "raiseValueHeader marketValues"
  "raiseValueHeader bottlePlacements";
}

.buyCards{grid-area: buyCards;}
.bottlePlacements{grid-area: bottlePlacements;}
.raiseValueHeader{grid-area: raiseValueHeader;}

.marketValues {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20%);
}
.valueSymbol {
  width: 4vw;
}
</style>
