<template>
  <div class="search">
    <van-search
      v-model="searchValue"
      show-action
      :placeholder="placeholder"
      @search="onSearch"
      @cancel="onCancel"
    />
    <HistoryHot
      :historyList="historyKeywordList"
      :hotList="hotKeywordList"
    ></HistoryHot>
  </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot.vue";
import { GetSearchPropUpDataAPI } from "@/API";
export default {
  data() {
    return {
      searchValue: "",
      placeholder: "",
      isShowBlock: 1,
      hotKeywordList: [],
      historyKeywordList: [],
    };
  },
  created() {
    this.getSearchPropUpData();
  },
  components: {
    HistoryHot,
  },
  methods: {
    async getSearchPropUpData() {
      let { data: res } = await GetSearchPropUpDataAPI();
      this.placeholder = res.defaultKeyword.keyword;
      this.hotKeywordList = res.hotKeywordList;
      this.historyKeywordList = res.historyKeywordList;
      console.log(res);
    },
    onSearch(val) {
      alert("开始搜索");
    },
    onCancel() {
      this.$router.back();
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
}
</style>
