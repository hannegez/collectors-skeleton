<!-- här har vi själva korten -->

<template>
  <!-- cred till BJÖRN CARLSSON -->
  <div v-if="card.x>0" :class="['card', {'available-to-choose': availableAction}]" :style="{'zoom':scalefactor,'background-position': (-(card.x-1)*250)+'px ' + (-(card.y-1)*350)+'px'}" @click="doAction">
    {{card.item}}
    {{card.skill}}
    {{card.market}}
  </div>
</template>

<script>
export default {
  name: 'CollectorsCard',
  /*cred till BJÖRN CARLSSON*/
  data: function() {
    return{
      scalefactor: window.innerWidth/5500   // Här dyker en skalning upp - det är faktiskt här och inte i collectors.vue som det sker. Se även ovan där kortens koordinater bestäms.
    }
  },
  props: {
    card: Object,
    availableAction: Boolean
  },
  methods: {
    doAction: function() {
      if (this.availableAction){ //han säger att vi ska lägga till det i bilden
        this.$emit('doAction');
      }
    }
  },
  /*cred till BJÖRN CARLSSON*/
  mounted() {
    window.addEventListener('resize', () => {
      this.scalefactor = window.innerWidth/5500 //ändrar storlek kort
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  color:red;
  user-select: none;
  width: 250px;
  height: 350px;
  background-image: url('/images/collectors-cards.png');
  border-radius: 10px;
}

.available-to-choose {
  animation: jiggle 1s ease-in-out;
  animation-iteration-count:infinite;
  box-shadow: 0 0 40px Yellow;
  cursor: pointer;
}
@keyframes jiggle {
  0% {transform:rotate(2deg);}
  50% {transform:rotate(-2deg);}
  100% {transform:rotate(2deg);}
}

</style>
