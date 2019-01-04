import Vue from 'Vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //定义状态
  state:{
    transMsg : '输入文字后点击下方按钮即可合成语音'
  }
})

export default store
