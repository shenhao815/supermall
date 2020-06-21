<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" ref="nav"
                  @titleClick="titleClick"/>
  <scroll class="content" ref="scroll"
          :probe-type="3"
          @scroll="contentScroll">
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
    <detail-goods-info class="detail-goods" :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="param" :paramInfo="paramInfo"/>
    <detail-comment-info ref='comment' :comment-infos="commentInfos" />
  </scroll>
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
  import {debounce} from "../../common/utils";
  export default {
    name: "Detail",
    components: {
      DetailParamInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailCommentInfo
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfos: [],
        themeTopYs: [],
        getThemeTopYFunc: null,
        currentTitleIndex: null
      }
    },
    created() {
      this.iid = this.$route.params.tradeItemId
      this.getDetail()
      this.getThemeTopYFunc = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      },100);
    },
    methods: {
      getDetail(){
        getDetail(this.iid).then(res => {
          console.log(res);
          const data = res.result
          this.topImages = data.topImages;
          this.goods = new Goods(data.itemInfo,data.itemServices.columns,data.shopInfo.services)
          this.shop = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          if (data.rateInfo.list.length >= 0) {
            this.commentInfos = data.rateInfo.list
          }

          /*
          注意$nextTick的用法
          this.$nextTick(() => {
            // 根据最新的数据，对应的DOM是已经被渲染出来
            // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
            // offsetTop值不对的时候，都是因为图片的问题
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs);
          });*/
        })
      },
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopYFunc()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          if ((this.currentTitleIndex !== i) &&(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentTitleIndex = i
            this.$refs.nav.currentIndex = this.currentTitleIndex
          }
        }
      }
    }
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background: #ffffff;
  }
  .content {
    height: calc(100% - 44px);
    background: #fff;
  }
  .detail-nav{
    position: relative;
    background: #fff;
    z-index: 11;
  }
</style>
