<template>
  <ul>
    <li v-for="item in goodInfo" :key="item.id" @click="goGoodsDetail(item.id)">
      <img
        :src="item.list_pic_url"
        style="display: block"
        width="100%"
        alt=""
      />
      <div class="van-ellipsis">{{ item.name }}</div>
      <div class="price">{{ item.retail_price | RMBfilter }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["goodInfo"],
  methods: {
    goGoodsDetail(id) {
      this.$router.push({
        name: "goodsdetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  padding: 10px 2%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 49%;
    margin-bottom: 10px;
    background: #fff;
    text-align: center;
    line-height: 30px;
    .price {
      color: darkred;
      font-size: 16px;
    }
    .van-ellipsis{
      font-size: 18px;
    }
  }
}
</style>
