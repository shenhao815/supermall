/*混入*/
import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const imgLoadMixin = {
  data() {
    return {
      imgLoadListener: null
    }
  },
  created() {
  },
  mounted() {
    // 此处this.$refs.scroll.refresh不加()是因为，
    // 如果加上，则代表传的该函数的返回值，而不是该函数本身
    const refresh = debounce(this.$refs.scroll.refresh, 30)
    this.imgLoadListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.imgLoadListener)
    console.log('混入内容打印测试');
  },
  deactivated() {
    this.$bus.$off('itemImgLoad', this.imgLoadListener)
  }

}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    clickBack() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 300
      // 2.决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
  }
}
