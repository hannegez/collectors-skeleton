<template>
  <div class="rulesPopupWrapper" >
    <div class="rulesPopup">

      <input class="closeCross" type="image" @click="$emit('getInfo')" alt="Login" src='/images/close.png' >

      <div v-if=" content === 'market' ">
        <h2>{{ labels.raiseValue }}</h2>
        <p>{{ labels.valueInfo }}</p>
      </div>

      <div v-if=" content === 'auction' ">
        <h2>{{ labels.startAuction }}</h2>
        <p>{{ labels.auctionInfo }}</p>
        <img width="95%" src='/images/skills_info.png'>
      </div>

      <div v-if=" content === 'work' ">
        <h2>{{ labels.startWork }}</h2>
        <p>{{ labels.workInfo }}</p>
      </div>

      <div v-if=" content === 'item' ">
        <h2>{{ labels.buyItem }}</h2>
        <p>{{ labels.itemInfo }}</p>
      </div>

      <div v-if=" content === 'skill' ">
        <h2>{{ labels.gainSkill }}</h2>
        <p>{{ labels.skillInfo }}</p>
        <img width="95%" src='/images/skills_info.png'>
      </div>
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
    z-index: 1;       /*denna gör att popupen placeras ovanpå andra element*/
  }

  .rulesPopup {
    background: #fff;
    border: solid thin #ececec;
    margin: 0 20%;
    padding: 1em;
  }

  .closeCross {
    width: 3%;
    margin: 0%;
  }

  p {
    margin: 2%;
  }

</style>
