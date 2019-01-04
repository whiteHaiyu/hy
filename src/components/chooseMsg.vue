<!--选择播放示例文本-->
<template>
    <div>
      <p class="title">播放示例</p>
      <ul>
        <li v-for="(item,index) in items" :class="{'active':activeClass==index}" :key="index" @click="getItem(item,index)">{{item}}</li>
      </ul>
      <div class="blank"></div>
    </div>
</template>

<script>
    export default {
      name: "chooseMsg",
      data(){
          return{
            items:['青青子衿，悠悠我心','真理惟一可靠的标准就是永远自相符合','过放荡不羁的生活，容易得像顺水推舟，但是要结识良朋益友，却难如登天'],
            activeClass:'-1',

          }
      },

      methods:{
        //获取当前点击对象，组件间进行通信
        getItem(item,index){
          this.bus.$emit('toChangeMsg',item)
          //console.log(item)
          this.activeClass = index
          //console.log(index)
        }
      }
    }
</script>

<style scoped>

  *{
    margin: 0;
    padding: 0;
  }
  .title{
    font-size: 1rem;
    font-weight: bolder;
    margin-top: 0.5rem;
  }

  li{
    list-style: none;
    display: block;
    width: 90%;
    height: 3rem;
    border-radius: 0.5rem;
    margin: 0.5rem auto;
    border: 1px solid #000;
  }

  .blank{
    height: 3rem;
  }

 .active{
   border: 1px solid orangered;
  }
</style>
