<template>
  <div class="player">
    <p class="title">功能体验</p>
    <div class="content">
      <div class="voice">
        <img src="../assets/ui-head.png" >
        <br>
        <p class="chooseSound">桃桃女声</p>
      </div>
      <div class="context">
        <textarea class="context-input" v-model="inputmsg" maxlength="50" @input="watchNum"></textarea>
        <p class="res">您还可以输入{{res}}个字</p>
      </div>
      <div class="play">
        <div class="button" @click="play">
          <img src="../assets/play.png">
        </div>
        <p class="submit" @click="messageBox">我要报错</p>

        <div class="range">
          <div class="range-vol">
            <p style="float:left">音量&nbsp;&nbsp;</p>
            <mt-range  v-model="audioVol" :min="1" :max="100" :step="1" :bar-height="2">
              <div slot="start">0.1</div>
              <div slot="end">10</div>
            </mt-range>
          </div>

          <div class="range-sp">
            <p style="float:left">语速&nbsp;&nbsp;</p>
            <mt-range  v-model="audioSp" :min="25" :max="100" :step="1" :bar-height="2">
              <div slot="start">0.5</div>
              <div slot="end">2.0</div>
            </mt-range>
          </div>
        </div>
      </div>
      <audio :src="playsrc" autoplay="autoplay"></audio>
    </div>
  </div>
</template>

<script>
  import { Range } from 'mint-ui';
  import { MessageBox } from 'mint-ui';

    export default {
      name: "neuhubPlayer",
      data(){
          return{
            inputmsg:'输入文字后点击下方按钮即可合成语音',
            playsrc:'',
            res:'33',   //剩余可输入字数
            audioVol:20,      //音量
            audioSp:50,     //语速
          }
      },

      components:{
        'mt-range':Range
      },

      //监听总线的通信
      mounted () {
        const that = this
        this.bus.$on('toChangeMsg', function (msg) {
          console.log(msg)
          that.inputmsg = msg
          console.log(that.inputmsg)
        })
        that.setProperty()
      },

      methods:{
        //监听剩余可输入字数
        watchNum(){
          let num = this.inputmsg.length;
          this.res = 50-num;
        },

        //生成UUID
        getUUID() {
          return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        },

        //设置请求头中的参数
        setProperty(){
          let that = this;
          let Vol = that.audioVol*0.1.toFixed(1);
          let Sp = that.audioSp*0.02.toFixed(2);
          let char = '{"platform":"web","version":"0.0.0.1","parameters":{"tte":"1","aue":"0","tim":"0","vol":"'+Vol+'","sp":"'+Sp+'","sr":"24000"}}'
          return char
        },

        //播放器
        play() {
          let postdata = this.inputmsg;
          // console.log(postdata);
          this.$axios({
            url: '/api/tts',
            method: 'post',
            headers: {
              'Service-Type':'synthesis',
              'Request-Id':this.getUUID(),
              'Application-Id':'d1bd6e9f-8dbf-4ea6-b92f-75dfa263304c',
              'Sequence-Id':'-1',
              'Protocol':'1',
              'Net-State':'2',
              'Applicator':'0',
              'Property':this.setProperty()
              // 'Property':'{"platform":"web","version":"0.0.0.1","parameters":{"tte":"1","aue":"0","tim":"0","vol":"2.0","sp":"1.0","sr":"24000"}}'
            },
            data:postdata
          }).then((res) => {
            console.log('请求成功');
            this.playsrc = 'data:audio/mpeg;base64,'+res.data.audio
          }).catch(function () {
            console.log('请求失败')
          })
        },

        //弹出发送错误的确定窗口
        messageBox(){
          let value = this.inputmsg;
          this.$messagebox({
            title: '以下文本有误吗？',
            message: value,
            showCancelButton: true,
            confirmButtonText:"确定",
            cancelButtonText:"取消"
          }).then(action => {
            // console.log(action)
            if (action == 'confirm') {
              this.$axios({
                url: '',
                method: 'post',
                data: value
              }).then((res) => {
                console.log('请求成功');
              }).catch(function () {
                console.log('请求失败')
              })
            }
          })
        },


      },
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }

  .player{
    width: 100%;
    height: 22rem;
    /*border: 1px solid #000;*/
    box-sizing: border-box;
    background-color: rgb(244,245,247);
  }

  .title{
    font-size: 1.2rem;
    font-weight: bolder;
  }

  .content{
    width: 90%;
    height: 19.5rem;
    margin: auto;
    box-sizing: border-box;
  }

  .voice{
    width: 19%;
    height: 19.5rem;
    /*border: 1px solid #000;*/
    background-color: white;
    float: left;
    box-sizing: border-box;
  }

  .context{
    width: 78%;
    height: 10rem;
    float: right;
    display: block;
    /*border: 1px solid #000;*/
    background-color: white;
    box-sizing: border-box;
  }
  .context-input{
    width: 80%;
    height: 8rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    resize: none;
    border-style: none;
  }

  .chooseSound{
    font-size: 0.5rem;
  }

  .play{
    width: 78%;
    height: 9rem;
    float: right;
    display: block;
    /*border: 1px solid #000;*/
    margin-top: 0.5rem;
    box-sizing: border-box;
    background-color: white;
  }
  .play .button{
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    background-color: white;
  }
  .play .button img{
    width: 5rem;
    height: 5rem;
  }

  .range{
    width: 60%;
    height: 4rem;
    margin: 0 auto;
  }

  .range p{
    font-size: 0.6rem;
    line-height: 1.8rem;
  }

  .range-vol{
    width: 100%;
  }
  .range-sp{
    width: 100%;
  }

  .submit{
    color: mediumblue;
    text-decoration: underline;
    font-size: 0.5rem;
    float: right;
    position: relative;
    top:-3rem;
  }
  .res{
    float: right;
    font-size: 0.35rem;
  }
</style>
