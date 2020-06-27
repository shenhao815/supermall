<template>
  <div class="CartBottomBar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">合计:{{toTalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { mapGetters } from "vuex";
  export default {
    name: "CartBottomBar",
    data() {
      return {};
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => (item.checked = false));
        } else {
          this.cartList.forEach(item => (item.checked = true));
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show("请选择购买的商品", 2000);
        }
      }
    },
    computed: {
      ...mapGetters(["cartList"]),
      toTalPrice() {
        return (
          "￥" +
          this.cartList
            .filter(item => {
              return item.checked;
            })
            .reduce((preValue, item) => {
              // return
              return preValue + item.price * item.count;
            }, 0)
            .toFixed(2)
        );
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        // return !this.cartList.filter(item => !item.checked).length;
        if (this.cartList.length === 0) return false;
        // return !this.cartList.find(item => item.checked);
        let isChecked = false;
        for (let item of this.cartList) {
          if (!item.checked) {
            return false;
          }
        }
        return true;
      },

    }
  };
</script>
<style scoped>
  .CartBottomBar {
    position: relative;
    display: flex;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    background: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }
  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background: red;
    color: #fff;
    text-align: center;
  }
</style>
