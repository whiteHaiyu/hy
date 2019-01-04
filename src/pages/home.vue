<template>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <foot-nav></foot-nav>
    </div>
</template>

<script>

  import footNav from '../components/foot-nav.vue'

    export default {
      name: "home",
      components:{
          'foot-nav':footNav
      }
    }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
</style>
