<template>
  <div class="searchtips">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in searchTipsList"
        :key="index"
        :title="item"
        @click="cellClick(item)"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
    };
  },
  props: ["searchTipsList"],
  methods: {
    onLoad() {},
    cellClick(val) {
      this.$emit("cellClick", val);
    },
  },
};
</script>

<style></style>
