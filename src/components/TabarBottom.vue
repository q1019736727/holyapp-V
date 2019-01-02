<template>
    <div>
      <tabbar @on-index-change="changeItem">
        <tabbar-item selected>
          <img slot="icon" src="">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item>
          <img slot="icon" src="">
          <span slot="label">管家</span>
        </tabbar-item>
        <tabbar-item>
          <img slot="icon" src="">
          <span slot="label">发现</span>
        </tabbar-item>
        <tabbar-item >
          <img slot="icon" src="">
          <span slot="label">商城</span>
        </tabbar-item>
      </tabbar>
    </div>
</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'

  export default {
    name: "TabarBottom",
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    data(){
      return{}

    },
    methods:{
      changeItem(value){
        this.$parent.bus.$emit('changeBu',value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  div{
    background: #f7f7fa;
    position: fixed;

  }

</style>
