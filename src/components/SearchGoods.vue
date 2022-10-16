<template>
  <div class="searchgoods">
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item
        v-model="priceSort"
        :options="priceOption"
        title="价格"
        @change="orderChange"
      />
      <van-dropdown-item
        :options="filterCategory"
        title="分类"
        v-model="classificationVal"
        @change="classificationChange"
      />
    </van-dropdown-menu>
    <Goods :goodInfo="goodsList" v-show="goodsList.length != 0"></Goods>
    <van-empty
      image="search"
      description="搜索内容为空"
      v-show="goodsList.length == 0"
    ></van-empty>
  </div>
</template>

<script>
import Goods from "./Goods.vue";
export default {
  data() {
    return {
      priceSort: "desc",
      classificationVal: "",
      priceOption: [
        { text: "升序", value: "asc" },
        { text: "降序", value: "desc" },
      ],
    };
  },
  components: {
    Goods,
  },
  beforeUpdate() {
    this.filterCategory.forEach((item) => {
      if (item.checked) {
        this.classificationVal = item.value;
      }
    });
  },
  props: ["goodsList", "filterCategory"],
  methods: {
    // 把分类选项传给父组件
    classificationChange(val) {
      this.$emit("classificationChange", val);
    },
    // 把排序选项传给父组件
    orderChange(val) {
      this.$emit("orderChange", val);
    },
  },
};
</script>

<style scoped>
.searchgoods {
  background: #f1f1f1;
}
</style>
