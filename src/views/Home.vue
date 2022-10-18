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
    <transition name="van-fade">
      <div class="shadow" v-show="$store.state.shadow"></div>
    </transition>

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
      this.$store.commit("changeShadow", true);
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
.shadow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}
</style>
