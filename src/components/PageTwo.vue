<template>
    <div>
      two
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "PageTwo",
    created(){
      axios.get('http://127.0.0.1:3000/api/v1.0/communityActCon/homePageList', {
      }).then(function (response) {
        console.log(response);
      })
    }
  }
</script>

<style scoped>

</style>
