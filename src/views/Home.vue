<template>
  <div class="home">
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ff6700">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img :src="item.image_url" alt="">
      </van-swipe-item>
    </van-swipe>
    <h1>Home</h1>
  </div>
</template>

<script>
import { GetHomePageInfo } from "@/API";
export default {
  name: "Home",
  data() {
    return {
      searchValue: "",
      bannerList: [],
    };
  },
  components: {},
  async created() {
    let { data: res } = await GetHomePageInfo();
    this.bannerList=res.banner
  },
};
</script>
<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 150px;
  img{
    width: 100%;
    object-fit: cover;
  }
}
</style>
