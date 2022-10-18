<template>
  <div class="cart">
    <Tips></Tips>
    <van-empty description="当前购物车为空" v-if="cartList.length == 0" />
    <van-checkbox-group v-model="result" :disabled="isEditing" v-else>
      <van-checkbox
        v-for="cart in cartList"
        :name="cart.goods_id"
        :key="cart.goods_id"
        @click="changeCheck(cart)"
        :disabled="isEditing"
      >
        <van-swipe-cell>
          <van-card
            :num="cart.number"
            :price="cart.retail_price"
            :title="cart.goods_name"
            :thumb="cart.list_pic_url"
          />
          <van-stepper
            v-model="cart.number"
            async-change
            @change="onstepperChange(cart)"
            v-show="isEditing"
          />
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteCart(cart.product_id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
      v-if="cartList.length != 0"
    >
      <van-checkbox
        v-model="checkAll"
        @click="checkAll = !checkAll"
        :disabled="isEditing"
      >
        全选
      </van-checkbox>
      <template #tip>
        累计共{{ cartTotal.checkedGoodsCount }}种产品,
        <span
          @click="onClickEditAddress"
          style="color: blue; text-decoration: underline"
        >
          {{ isEditing ? "点击此处修改" : "修改完成" }}
        </span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from "@/components/Tips.vue";
import {
  GetCartDataAPI,
  ChangeCheckAllAPI,
  ChangeStepperNumAPI,
  DeleteGoodsAPI,
} from "@/API";
export default {
  data() {
    return {
      result: [],
      // 购物车列表
      cartList: [],
      // 购物车数据
      cartTotal: {},
      // 步进器显示状态
      isEditing: true,
    };
  },
  created() {
    this.getCartData();
  },
  computed: {
    // 全选通关判断result长度与购物车列表是否相等来判断
    checkAll: {
      get() {
        return this.result.length == this.cartList.length ? true : false;
      },
      async set(val) {
        if (this.isEditing) return;
        let ids_arr = [];
        this.cartList.forEach((i) => {
          ids_arr.push(i.product_id);
        });
        let { data: res } = await ChangeCheckAllAPI({
          isChecked: val ? 1 : 0,
          productIds: ids_arr.join(","),
        });
        this.totalFn(res);
      },
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
      this.isEditing = !this.isEditing;
    },
    async getCartData() {
      let res = await GetCartDataAPI();
      this.totalFn(res.data);
    },
    async changeCheck(cart) {
      if (this.isEditing) return;
      let { data: res } = await ChangeCheckAllAPI({
        isChecked: cart.checked == 1 ? 0 : 1,
        productIds: cart.product_id,
      });
      this.totalFn(res);
    },
    totalFn(data) {
      this.cartList = data.cartList;
      this.cartTotal = data.cartTotal;
      this.result = [];
      this.cartList.forEach((item) => {
        if (item.checked == 1) {
          this.result.push(item.goods_id);
        }
      });
    },
    async onstepperChange(cart) {
      let res = await ChangeStepperNumAPI({
        goodsId: cart.goods_id,
        id: cart.id,
        number: cart.number,
        productId: cart.product_id,
      });
      this.totalFn(res.data);
    },
    async deleteCart(productIds) {
      let res = await DeleteGoodsAPI({
        productIds: productIds.toString(),
      });
      this.totalFn(res.data);
    },
  },
};
</script>

<style scoped>
.cart {
  padding-bottom: 125px;
}
.van-checkbox-group {
  background: #fff;
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
.van-stepper {
  text-align: right;
}
.delete-button {
  height: 100%;
}
</style>
