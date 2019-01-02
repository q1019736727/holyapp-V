<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
    
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
      name: "PageOne",
      data() {
        return {
          swiperOption: {
            // some swiper options/callbacks
            // 所有的参数同 swiper 官方 api 参数
            // ...
          }
        }
      },
      methods:{
        callback(){

        }
      },
      mounted:function () {
        this.swiper.slideTo(0, 1000, false)

      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
      },
      components: {
        swiper,
        swiperSlide
      }
    }
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 300px;
  }
</style>
