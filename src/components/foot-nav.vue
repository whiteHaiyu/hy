<!--底部的导航栏-->
<template>
<div>
    <mt-tabbat v-model="selected">
      <mt-tab-item id="readdemo">
      <img src="../assets/icon1-1.png" slot="icon">
      Demo
    </mt-tab-item>
    <mt-tab-item id="readbook">
      <img src="../assets/icon2-1.png" slot="icon">
      Book
    </mt-tab-item>
    <mt-tab-item id="readmore">
      <img src="../assets/icon3-1.png" slot="icon">
      More
    </mt-tab-item>
    </mt-tabbat>
</div>
</template>

<script>

  import {Tabbar, TabItem} from 'mint-ui'

    export default {
      name: "foot-nav",
      components:{
        'mt-tabbat':Tabbar,
        'mt-tab-item':TabItem
      },
      data(){
          return{
            selected:'demo'
          }
      },
      watch:{
        $router () {
          // console.log('改变路由')
          this.selected = sessionStorage.getItem('pageUrl')
        },
          selected:function (val) {
            console.log(val)
            this.$router.push({
              path:val
            })
          }
      }
    }

</script>

<style scoped>
div{
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
