<template>
  <div class="serschHistoryHot">
    <div class="history-hot">
      <div class="header">
        <h1>历史搜索</h1>
        <van-icon name="delete" />
      </div>
      <van-tag
        plain
        type="primary"
        v-for="(item, index) in historyList"
        :key="index"
        >{{item}}</van-tag
      >
    </div>
    <div class="history-hot">
      <div class="header">
        <h1>热门搜索</h1>
        <van-icon name="delete" />
      </div>
      <van-tag plain type="primary" v-for="(item) in hotList" :key="item.id">{{item.keyword}}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotList", "historyList"],
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
