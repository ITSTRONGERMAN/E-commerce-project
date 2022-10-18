<template>
  <div class="cart">
    <Tips></Tips>
    <van-checkbox-group v-model="result">
      <van-checkbox
        v-for="cart in cartList"
        :name="cart.goods_id"
        :key="cart.goods_id"
      >
        <van-card
          :num="cart.number"
          :price="cart.retail_price"
          :title="cart.goods_name"
          :thumb="cart.list_pic_url"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="cartTotal.goodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkAll">全选</van-checkbox>
      <template #tip>
        累计共{{ cartTotal.goodsCount }}种产品,
        <span
          @click="onClickEditAddress"
          style="color: blue; text-decoration: underline"
        >
          点击修改
        </span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from "@/components/Tips.vue";
import { GetCartDataAPI } from "@/API";
export default {
  data() {
    return {
      result: [],
      // 购物车列表
      cartList: [],
      // 购物车数据
      cartTotal: {},
    };
  },
  created() {
    this.getCartData();
  },
  computed: {
    // 全选通关判断result长度与购物车列表是否相等来判断
    checkAll() {
      return this.result.length == this.cartList.length ? true : false;
    },
  },
  components: {
    Tips,
  },
  methods: {
    onSubmit() {
      console.log(123);
    },
    onClickEditAddress() {
      console.log(123);
    },
    async getCartData() {
      let res = await GetCartDataAPI();
      let { cartList, cartTotal } = res.data;
      this.cartList = cartList;
      this.cartTotal = cartTotal;
      this.cartList.forEach((item) => {
        if (item.checked == 1) {
          this.result.push(item.goods_id);
        }
      });
    },
  },
};
</script>

<style scoped>
.van-checkbox-group {
  background: #fff;
  padding-bottom: 20px;
}
/deep/.van-checkbox__label {
  flex: 1;
}
.van-checkbox {
  border-bottom: 1px solid #eee;
  padding: 10px 15px;
}
.van-submit-bar {
  bottom: 50px;
}
</style>
