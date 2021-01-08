<template>
  <div class="rulesPopupWrapper" >
    <div class="rulesPopup">
      
      <input class="closeCross" type="image" @click="$emit('getInfo')" alt="Login" src='/images/close.png' >

      <div v-if=" content === 'market' ">
        <h2>{{ labels.raiseValue }}</h2>
        {{ labels.valueInfo }}
      </div>

      <div v-if=" content === 'auction' ">
        <h2>{{ labels.startAuction }}</h2>
        {{ labels.auctionInfo }}
      </div>

      <div v-if=" content === 'work' ">
        <h2>{{ labels.startWork }}</h2>
        {{ labels.workInfo }}
      </div>

      <div v-if=" content === 'item' ">
        <h2>{{ labels.buyItem }}</h2>
        {{ labels.itemInfo }}
      </div>

      <div v-if=" content === 'skill' ">
        <h2>{{ labels.gainSkill }}</h2>
        {{ labels.skillInfo }}
      </div>


      <!-- gör för alla andra också -->

      <br>
      <button class="closeButton"  @click="$emit('getInfo')">close</button>
    </div>
</div>
</template>

<script>
export default {
  name: 'CollectorsRulesPopup',
  components: {
  },
  props: {
    labels: Object,
    content: String,
  },
  methods: {
    }
}
</script>


<style scoped>
  .rulesPopupWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

</style>
