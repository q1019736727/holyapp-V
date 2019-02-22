<template>
    <div class="menu">
      <span v-for="(title,index) in menuList">
        <img :src="'../../../static/'+imgList[index]" alt="">
        {{title}}
      </span>
    </div>
</template>

<script>
    export default {
      name: "menu",
      data(){
        return{
          menuList:['物业保修','在线缴费','访客邀请','投诉建议'],
          imgList:['home_repair@3x.png','home_paycost@3x.png','home_invitation@3x.png','home_advice@3x.png']
        }
      }
    }
</script>

<style lang="scss" scoped>
  .menu{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0;
    span{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      img{
        width: 45px;
        margin-bottom: 5px;
      }
    }
  }
</style>
