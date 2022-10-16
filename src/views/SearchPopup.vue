<template>
  <div class="search">
    <van-search
      v-model="searchValue"
      show-action
      :placeholder="placeholder"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    />
    <HistoryHot
      :historyList="historyKeywordList"
      :hotList="hotKeywordList"
      v-show="isShowBlock == 1"
      @tagClick="tagClick"
    ></HistoryHot>
    <SearchTips
      :searchTipsList="searchTipsList"
      v-show="isShowBlock == 2"
      @cellClick="cellClick"
    ></SearchTips>
    <SearchGoods
      v-show="isShowBlock == 3"
      :goodsList="goodsList"
      :filterCategory="filterCategory"
      @classificationChange="classificationChange"
      @orderChange="orderChange"
    ></SearchGoods>
  </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot.vue";
import SearchTips from "@/components/SearchTips.vue";
import SearchGoods from "@/components/SearchGoods.vue";
import {
  GetSearchPropUpDataAPI,
  GetSearchTipsApI,
  GetGoodsListAPI,
} from "@/API";
export default {
  data() {
    return {
      //双向绑定搜索框值
      searchValue: "",
      placeholder: "",
      // 控制搜索提示等的显示
      isShowBlock: 1,
      // 热门商品词条列表
      hotKeywordList: [],
      // 历史词条列表
      historyKeywordList: [],
      // 搜索提示列表
      searchTipsList: [],
      // 商品信息列表
      goodsList: [],
      // 商品分类下拉列表
      filterCategory: [],
      // 默认搜索方式
      sort: "id",
      // 价格排序
      order: "desc",
      // 分类列表id
      classificationId: 0,
    };
  },
  created() {
    this.getSearchPropUpData();
  },
  components: {
    HistoryHot,
    SearchTips,
    SearchGoods,
  },
  methods: {
    // 获取搜索弹出框数据
    async getSearchPropUpData() {
      let { data: res } = await GetSearchPropUpDataAPI();
      this.placeholder = res.defaultKeyword.keyword;
      this.hotKeywordList = res.hotKeywordList;
      this.historyKeywordList = res.historyKeywordList;
    },
    // 获取商品列表数据
    async getGoodsList(val) {
      let { data: res } = await GetGoodsListAPI({
        keyword: val,
        page: 1,
        siz: 20,
        order: this.order,
        categoryId: this.classificationId,
        sort: this.sort,
      });
      this.goodsList = res.data;
      let newStr = JSON.parse(
        JSON.stringify(res.filterCategory)
          .replace(/name/g, "text")
          .replace(/id/g, "value")
      );
      this.filterCategory = newStr;
    },
    // 搜索
    onSearch() {
      this.isShowBlock = 3;
      this.getGoodsList(this.searchValue);
    },
    // 搜索框取消按钮
    onCancel() {
      this.$router.back();
    },
    // 输入
    async onInput() {
      this.isShowBlock = 2;
      let { data: res } = await GetSearchTipsApI({ keyword: this.searchValue });
      this.searchTipsList = res;
    },
    // 分类
    classificationChange(val) {
      this.classificationId = val;
      this.getGoodsList(this.searchValue);
    },
    // 价格排序
    orderChange(val) {
      this.order = val;
      this.sort = "price";
      this.getGoodsList(this.searchValue);
    },
    // 历史热门标签
    tagClick(val) {
      this.isShowBlock = 3;
      this.searchValue = val;
      this.getGoodsList(val);
    },
    // 搜索提示
    cellClick(val) {
      this.tagClick(val);
    },
  },
};
</script>

<style>
.search {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: #efefef;
  z-index: 12;
}
</style>
