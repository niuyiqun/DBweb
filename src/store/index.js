import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import vuexI18n from 'vuex-i18n';

Vue.use(Vuex)

const state = {
  name:'helloVuex',
  lab2Result:[],
  lab3Student: [],
  lab3Teacher: [],
  lab3Course: [],
  lab5CourseSelection:[]
}

const mutations={
  changeLab2Result(state,result){
    state.lab2Result = result
  },
  changeLab3Student(state,result){
    state.lab3Student = result
  },
  changeLab3Teacher(state,result){
    state.lab3Teacher = result
  },
  changeLab3Course(state,result){
    state.lab3Course = result
  },
  changeLab5CourseSelection(state,result){
    state.lab5CourseSelection = result
  },



}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    i18n: vuexI18n.store
  },
  getters,
  state,
  mutations,

})

export default store
