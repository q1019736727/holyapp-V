<template>
  <div class="my">
    <section class="header">

    </section>
    <section class="menuList">
      <li class="menuList-item" v-for="(item,index) in menuLists" @click="saveStorage(index)">
        <div class="itemLeft">
          <img :src="item[1]" alt="">
          <span>{{item[0]}}</span>
        </div>
      </li>
    </section>
  </div>
</template>

<script>
  export default {
    name: "PageFour",
    data() {
      return {
        menuLists: [
          ['我的订单', 'static/my/my_bill.png'],
          ['社区活动', 'static/my/_ico_homepage_community.png'],
          ['我的房产', 'static/my/my_house.png'],
          ['推广全域生活赚现金红包', 'static/my/my_popularize.png'],
          ['邀请加入', 'static/my/my_recommend_register.png'],
          ['账号绑定', 'static/my/4561535458021_.pic.jpg'],
          ['我的购物', 'static/my/my_precinct_shopping.png'],
          ['我的分销', 'static/my/ico_home_distribution.png'],
          ['意见反馈', 'static/my/my_feedback.png'],
          ['设置', 'static/my/my_set.png'],
        ],
      }
    },
    mounted(){
    },
    methods:{
      saveStorage(value){
        sessionStorage.setItem('userId',value)
        this.$vux.toast.text('储存成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my{
    padding-bottom: 51px;
    .menuList{
      &-item{
        line-height: 50px;
        &::after{
          display: block;
          content: '';
          left: 0;
          top: 0;
          height: 1px;
          background: #eee;
        }
        &:nth-child(3)::after,&:nth-child(6)::after,&:nth-child(8)::after{
          height: 5px;
        }
        .itemLeft{
          display: flex;
          justify-content: start;
          align-items: center;
          >img{
            width: 23px;
            margin-left: 10px;
          }
          >span{
            color: #333;
            padding-left: 10px;
            font-size: 13px;
          }
        }

      }
    }
  }
</style>
