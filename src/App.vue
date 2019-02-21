<template>
  <div id="app">
    <router-view :name="pagename"></router-view>
    <router-view name="main" class="bottomBar"></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'App',
    data(){
      return{
        pagename:'one',
        bus:new Vue()
      }
    },
    methods:{
      changeItem(value){

      }
    },
    beforeMount(){
      this.bus.$on('changeBu',(value)=>{
        if (value === 0){
          this.pagename = 'one'
        } else if(value === 1){
          this.pagename = 'two'
        } else if(value === 2){
          this.pagename = 'three'
        } else if(value === 3){
          this.pagename = 'four'
        }

      })
    }

  }
</script>

<style lang="scss">
#app {

}
</style>
