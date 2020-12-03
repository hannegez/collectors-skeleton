<!-- jävla skitkorv -->
<template>
    <div class="possible_Actions" >
      <p>hej</p>
    </div>
</template>

<script>
export default {
  name: 'possibleActions',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .possible_Actions {
    color:red;
    user-select: none;
    width:100px;
    height:100px;
    background: url('/images/actions.PNG') no-repeat;
    background-position: -100px 0px;
    background-size: 400px 100px;

    border-radius: 10px;

  }

</style>








<!--
<template>
    <div class="card" :style="{'background-position': (-(card.x-1)*250)+'px ' + (-(card.y-1)*350)+'px'}">

      {{card.item}}
      {{card.skill}}
      {{card.market}}
    </div>
</template>

<script>
export default {
  name: 'CollectorsCard',
  props: {
    card: Object
  }
}
</script>

 Add "scoped" attribute to limit CSS to this component only
<style scoped>
  .card {
    color:red;
    user-select: none;
    width:250px;
    height:350px;
    background-image: url('/images/collectors-cards.png');
    border-radius: 10px;
  }

</style> -->
