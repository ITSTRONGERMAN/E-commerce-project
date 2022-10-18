<template>
  <van-goods-action>
    <van-goods-action-icon
      :icon="isCollection ? 'star' : 'star-o'"
      :text="isCollection ? '已收藏' : '未收藏'"
      :color="isCollection ? 'red' : '#333'"
      @click="onCollect"
    />
    <van-goods-action-icon
      icon="cart-o"
      text="购物车"
      :badge="cartCount"
      @click="goToCart"
    />
    <van-goods-action-button
      type="warning"
      text="加入购物车"
      @click="addToCart"
    />
    <van-goods-action-button type="danger" text="立即购买" @click="onBuy" />
  </van-goods-action>
</template>

<script>
export default {
  data() {
    return {
      isCollection: false,
    };
  },
  props: ["cartCount"],
  methods: {
    onCollect() {
      this.isCollection = !this.isCollection;
    },
    onBuy() {
      this.$toast.fail("功能未开放");
    },
    addToCart() {
      this.$emit("addToCart");
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped>
.van-goods-action {
  z-index: 9999;
}
</style>
