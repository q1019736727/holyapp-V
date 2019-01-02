<template>
  <div>
    <x-header :left-options="{showBack: false}" :title="title"></x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    name: "topheader",
    components: {
      XHeader
    },
    data(){
      return{
        title:'首页'
      }
    },
    beforeMount(){

    }
  }
</script>

<style scoped>

</style>
