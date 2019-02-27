<template>
  <div class="menu">
    <span v-for="(item,index) in menuTitles" :class="{active:selectIndex === index}" @click="clickMenu(index)">{{item}}</span>
  </div>
</template>

<script>
  export default {
    name: "activitySegment",
    data() {
      return {
        menuTitles: ['行程说明', '费用说明', '用户须知'],
        selectIndex:0
      }
    },
    methods: {
      clickMenu(index){
        this.selectIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/style/common.scss';
  .menu{
    display: flex;
    justify-content: space-around;
    padding-top: 13px;
    padding-bottom: 10px;
    width: 100%;
    >span{
      text-align: center;
      font-size: 14px;
      &.active{
        color: $main_color;
      }
      &.active::after{
        display: block;
        content: '';
        height: 2px;
        background: $main_color;
        margin-top: 5px;
      }
    }
  }
</style>
