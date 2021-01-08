
<!-- Daniella har varit här och ändrat i griden -->

<template>
  <div class="raiseValue">
    <div class="raiseValueHeader">
      <!-- <h3>{{ labels.raiseValue }}</h3>      behövs ej längre pga infoknappar -->
    </div>

    <div class="raiseValueInfo">

      <div class="popup" style= "position:relative; left:0em; top:0em;">
        <img src='/images/infoknapp_rv.png' alt="Raise value" width="70%" @click="$emit('getInfo')" >
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
        <p class="buttonText" v-if="p.playerId===null"> ${{p.cost}} </p>
        <div v-if="p.playerId !== null">
          <input class="bottlePlacement" type="image" :src="placedBottle(p.playerId)" >
        </div>
      </div>
    </div>

    <div class="marketValues">
      <div v-for="(valueSymbol, index) in valueSymbols" :key="index" class="marketValue">
        <img class="valueSymbol" :src="valueSymbol.image">
        <span>{{valueSymbol.value}}</span>
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
    players: Object,
    auctionCards: Array,
    market: Array,
    skillsOnSale: Array,
    marketValues: Object,
    placement: Array
    //NÅNTING MED WORK?
  },
  computed: {
    valueSymbols : function() {
      return {
        fastaval: {  image: '/images/fastaval_symbol.png',
                     value: this.marketValues.fastaval
                  },
        figures: {  image: '/images/figures_symbol.png',
                     value: this.marketValues.figures
                  },
        music: {  image: '/images/music_symbol.png',
                     value: this.marketValues.music
                  },
        movie: {  image: '/images/movie_symbol.png',
                     value: this.marketValues.movie
                  },
        technology: {  image: '/images/technology_symbol.png',
                     value: this.marketValues.technology
                  }
      }
    }
  },
  methods: {
    placedBottle: function (playerId) {
      return '/images/bottle_' + this.players[playerId].color + '.png';
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
  grid-gap: 2%;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 15% 85%;
  grid-template-areas:
  "raiseValueInfo marketValues"
  "raiseValueHeader bottlePlacements";
  /*  grid-template-areas:
  "raiseValueHeader marketValues"
  "raiseValueHeader bottlePlacements";*/
}

.buyCards{grid-area: buyCards;}
.bottlePlacements{grid-area: bottlePlacements;}
.raiseValueHeader{grid-area: raiseValueHeader;}
.raiseValueInfo{grid-area: raiseValueInfo}

.marketValues {
  display: grid;
  grid-template-columns: repeat(auto-fill, 15%);
}
.valueSymbol {
  width: 3.5vw;
}
</style>
