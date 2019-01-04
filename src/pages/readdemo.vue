<template>
    <div>
      <!--<tts-player></tts-player>-->
      <title-image></title-image>
      <neuhub-player></neuhub-player>
      <choose-msg></choose-msg>
    </div>

</template>

<script>
  import titleImage from '../components/titleImage'
  import TTSplayer from '../components/TTSplayer'
  import neuhubPlayer from '../components/neuhubPlayer'
  import chooseMsg from '../components/chooseMsg'


    export default {
        name: "readdemo",
      components:{
        'tts-player':TTSplayer,
        'neuhub-player':neuhubPlayer,
        'title-image':titleImage,
        'choose-msg':chooseMsg
      }
    }
</script>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
</style>
