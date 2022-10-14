<template>
  <div class="search">
    <van-search
      v-model="searchValue"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    onSearch(val) {
    alert('开始搜索')
    },
    onCancel() {
     this.$router.back()
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
  background: rgba(0, 0, 0, 0.5);
}
</style>
