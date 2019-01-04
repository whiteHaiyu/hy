<!--带底部轮播文本的播放器-->
<template>
    <div>
      TTSplayer
      <br>
      <p class="guide">在这里输入要转换的文本</p>
      <input type="text-area" v-model="inputmsg">
      <audio :src="playsrc" autoplay="autoplay"></audio>
      <button @click="play">
        <img src="../assets/play.png">
      </button>
      <div class="show">
        <ul>
          <li v-for="item in items" @click="getItem(item)">{{item}}</li>
        </ul>
      </div>
    </div>
</template>

<script>

  import { Button } from 'mint-ui';

    export default {
      name: "TTSplayer",
      data(){
          return{
            inputmsg:'hi，京东',
            playsrc:'',
            //playsrc:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
            UUID:this.getUUID(),
            items:['测试用例111',
              '测试用例222',
              '测试用例333',
              '测试用例444',
              '测试用例555',
              '测试用例666',
              '测试用例777',
              '测试用例888',
              '测试用例111',
              '测试用例222']
          }
      },
      components:{
        'mt-button':Button
      },
      methods:{
        getUUID() {
          return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        },

        play() {
          let postdata = this.inputmsg;

          console.log(postdata);

          this.$axios({
            url: '/api/tts',
            method: 'post',
            headers: {
              'Service-Type':'synthesis',
              'Request-Id':this.UUID,
              'Application-Id':'d1bd6e9f-8dbf-4ea6-b92f-75dfa263304c',
              'Sequence-Id':'-1',
              'Protocol':'1',
              'Net-State':'2',
              'Applicator':'0',
              'Property':'{"platform":"web","version":"0.0.0.1","parameters":{}}'
            },
            data:postdata
          }).then((res) => {
            console.log('请求成功');
            this.playsrc = 'data:audio/mpeg;base64,'+res.data.audio
          }).catch(function () {
            console.log('请求失败')
          })
        },

        getItem(item){
          console.log(item);
          //this.inputmsg = e.currentTarget
          this.inputmsg = item
        }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }

  .guide{
    margin-top:10%;
  }

  input{
    width: 50%;
    height: 5rem;
  }

  button{
    display: block;
    margin: 5% auto;
    border: none;
    width: 35%;
    background-color:white;
    /*height: 5rem;*/
  }

  button img{
    width: 100%;
    height: auto;
  }

  .show{
    border: 1px solid #000;
    height: 25%;
    width: 100%;
    position: fixed;
    bottom: 10%;
    left: 0;
    overflow: hidden;
    background-color: gainsboro;
  }
  .show ul{
    width: 500%;
    height: 100%;
    animation: trans 25s linear 0s infinite normal;
  }
  @keyframes trans {
    from{
      transform: translateX(0rem);
    }
    to{
      transform: translateX(-80%);
    }
  }
  .show ul li{
    float: left;
    box-sizing: border-box;
    border: 1px solid #000;
    width: 8%;
    height: 70%;
    margin:1%;
    list-style: none;
    border-radius: 5%;
    background-color: white;
  }

</style>
