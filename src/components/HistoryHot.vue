<template>
  <div class="serschHistoryHot">
    <div class="history-hot" v-show="isShowHistory">
      <div class="header">
        <h1>历史搜索</h1>
        <van-icon name="delete" @click="clearHistory" />
      </div>
      <van-tag
        plain
        type="primary"
        v-for="(item, index) in historyList"
        @click="tagClick(item)"
        :key="index"
        >{{ item }}</van-tag
      >
    </div>
    <div class="history-hot">
      <div class="header">
        <h1>热门搜索</h1>
      </div>
      <van-tag
        plain
        type="primary"
        v-for="item in hotList"
        :key="item.id"
        @click="tagClick(item.keyword)"
        >{{ item.keyword }}</van-tag
      >
    </div>
  </div>
</template>

<script>
import { ClearHistoyAPI } from "@/API";
export default {
  data() {
    return {
      isShowHistory: true,
    };
  },
  props: ["hotList", "historyList"],
  methods: {
    tagClick(val) {
      this.$emit("tagClick", val);
    },
    async clearHistory() {
      let res = await ClearHistoyAPI();
      console.log(res);
      if (res.errno == 0) {
        this.$toast.success("删除成功");
        this.isShowHistory = false;
      } else {
        this.$toast.fail("删除失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.history-hot {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    h1 {
      font-size: 20px !important;
    }
  }
  .van-tag {
    margin-right: 5px;
  }
}
</style>
