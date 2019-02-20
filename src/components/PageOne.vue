<template>
  <div>
    <swiper :options="swiperOption" @someSwiperEvent="callback">
      <swiper-slide v-for="item in imgList">
        <img :src="item.imgUrl">
      </swiper-slide>
    </swiper>
  </div>

</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "PageOne",
    data() {
      return {
        imgList: [],
        swiperOption: {
          autoplay: 3000,
          speed: 1000,
          loop: true, // 循环模式选项
        }
      }
    },
    created() {
      this.$http.get('http://127.0.0.1:3000/api/bannerCon/bannerShow', {
        params:{
          deviceType:2,
          projectId:6,
          imgType:0,
          pixel: 750
        }
      })
        .then(res => {
         console.log(res)
          this.imgList = res.data.rows
        })
    },
    methods: {
      callback(value) {
        alert(value)
      }
    },
    mounted: function () {

    },
    computed: {},
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 300px;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      object-fit: cover;

    }
  }
</style>
