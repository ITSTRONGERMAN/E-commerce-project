<template>
  <div class="gooddetail">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <Tips></Tips>
    <div class="info">
      <div class="title">
        {{ goodInfo.name }}
      </div>
      <div class="goods_brief">
        {{ goodInfo.goods_brief }}
      </div>
      <div class="price">
        {{ goodInfo.retail_price | RMBfilter }}
      </div>
    </div>
    <van-cell title="展示弹出层" center @click="isSkuShow = true">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <div class="attribute">
      <h3>商品参数</h3>
      <ul>
        <li v-for="(item, index) in attribute" :key="index">
          <div class="l">{{ item.name }}:</div>
          <div class="r">{{ item.value }}</div>
        </li>
      </ul>
    </div>
    <div class="goods_desc" v-html="goods_desc"></div>
    <GoodActive @addToCart="addToCart" :cartCount="cartCount"></GoodActive>
    <div class="title">相关产品</div>
    <van-sku
      v-model="isSkuShow"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      ref="sku"
    />
    <Goods :goodInfo="retaliveGoodList"></Goods>
  </div>
</template>

<script>
import {
  GetGoodsDetailAPI,
  GetRelativeGoodsAPI,
  GetCartCountAPI,
  AddCartAPI,
} from "@/API";
import Tips from "@/components/Tips.vue";
import GoodActive from "@/components/GoodActive.vue";
import Goods from "@/components/Goods.vue";
export default {
  data() {
    return {
      // 控制sku组件的显示与隐藏
      isSkuShow: false,
      sku: {
        hide_stock: false,
        tree: [],
        price: 0,
        stock_num: 0,
      },
      goods: {
        picture: "",
      },
      /*------------------------------------ */
      // 轮播图数据
      gallery: [],
      // 商品信息
      goodInfo: {},
      // 商品参数
      attribute: [],
      // 商品信息
      goods_desc: "",
      // 相关产品信息
      retaliveGoodList: [],
      // 购物车数量
      cartCount: 0,
      productList: [],
    };
  },
  components: {
    Tips,
    GoodActive,
    Goods,
  },
  name: "GoodesDetail",
  created() {
    this.getGoodsDetail();
    this.getRelativeGoods();
    this.getCartCount();
  },
  watch: {
    "$route.query.id"() {
      this.getGoodsDetail();
      this.getRelativeGoods();
      this.getCartCount();
    },
  },
  methods: {
    // 获取商品详情
    async getGoodsDetail() {
      let id = this.$route.query.id;
      let { data: res } = await GetGoodsDetailAPI({ id });
      this.gallery = res.gallery;
      this.goodInfo = res.info;
      this.attribute = res.attribute;
      this.goods_desc = res.info.goods_desc;
      this.goods.picture = res.info.list_pic_url;
      this.sku.stock_num = res.info.goods_number;
      this.sku.price = res.info.retail_price;
      this.productList = res.productList;
    },
    // 相关产品
    async getRelativeGoods() {
      let id = this.$route.query.id;
      let { data: res } = await GetRelativeGoodsAPI({ id });
      this.retaliveGoodList = res.goodsList;
    },
    // 购物车数量
    async getCartCount() {
      let { data: res } = await GetCartCountAPI();
      this.cartCount = res.cartTotal.goodsCount;
    },
    async addToCart() {
      if (this.isSkuShow) {
        let cartCount = this.$refs.sku.getSkuData().selectedNum;
        let res = await AddCartAPI({
          goodsId: this.$route.query.id,
          productId: this.productList[0].id,
          number: cartCount,
        });
        if (res.errno == 0) {
          this.$toast.success("加入购物车成功");
          setTimeout(() => {
            this.isSkuShow = false;
            this.getCartCount();
          }, 1000);
        } else {
          this.$toast.fail("加入购物车失败");
        }
      } else {
        this.isSkuShow = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.gooddetail {
  padding-bottom: 50px;
}
.my-swipe {
  height: 400px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.info {
  background-color: #fff;
  text-align: center;
  line-height: 40px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .title {
    font-size: 20px;
  }
  .goods_brief {
    font-size: 14px;
  }
  .price {
    color: darkred;
    font-size: 16px;
  }
}
.attribute {
  margin-top: 20px;
  background: #fff;
  padding: 10px 2%;
  h3 {
    font-size: 16px;
    line-height: 50px;
  }
  ul li {
    display: flex;
    background: #efeffe;
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
    border-radius: 6px;
    .l {
      flex: 3;
      text-align: right;
      margin-right: 10px;
      font-size: 14px;
      color: #333;
    }
    .r {
      flex: 7;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
/deep/.goods_desc {
  img {
    width: 100%;
  }
}
.title {
  font-size: 16px;
  text-align: center;
}
</style>
