<template>
  <div class="home">
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      disabled
      @click="goSearch"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ff6700">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img :src="item.image_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { GetHomePageInfoAPI } from "@/API";
export default {
  name: "Home",
  data() {
    return {
      bannerList: [],
    };
  },
  components: {},
  created() {
    this.getBannerList();
  },
  methods: {
    async getBannerList() {
      let { data: res } = await GetHomePageInfoAPI();
      this.bannerList = res.banner;
    },
    goSearch() {
      this.$router.push("/home/searchpopup");
    },
  },
};
</script>
<style scoped lang="less">
.my-swipe .van-swipe-item {
  img {
    width: 100%;
  }
}
.slide-enter,
.slide-leave-to {
  right: -100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: right 0.3s;
}
.slide-enter-to,
.slide-leave {
  right: 0;
}
</style>
