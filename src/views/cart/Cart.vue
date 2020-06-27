<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}}) </div>
    </nav-bar>
    <cart-list />

    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 语法一
    //...mapGetters(['cartLength','cartList'])
    // 语法二，目的是为了可以自定义名称
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>


<style>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }


</style>
