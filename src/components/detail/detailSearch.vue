<template>
<div>
  <div class="detailSearch">
    <div class="detailSearchImg" onclick="window.history.go(-1)">
      <img src="../../assets/mIcon/title_back_normal.png" alt="">
    </div>
    <div class="detailSearchIpt">
      <div>
        <img src="../../assets/mIcon/sousuoa4a4a4.png" alt="">
      </div>
      <input type="text" placeholder="输入商品名称" ref="search">
    </div>
    <div>
      <button class="detailSearchBtn" @click="searchByInput()">搜本店</button>
    </div>
    <div class="search-result">
      <div class="page-loadmore-wrapper" ref="wrapper">
        <ul class="good-list">
          <mt-loadmore  
            :bottom-method="loadBottom" 
            :bottom-all-loaded="bottomAllLoaded" 
            ref="loadmore" 
            @bottom-status-change="handleBottomChange" 
            :auto-fill="false"
            >
            <li class="good-item" v-for="(goodItem, index) in searchResult" :key="index">
              <div class="good-item-img">
                <img :src="'http://www.d1sc.com/' + changeData(goodItem.goods_main_photo.path,goodItem.goods_main_photo.name)">
              </div>
              <div class="good-item-info">
                <p class="good-item-title">{{goodItem.goods_name}}</p><!-- //商品标题。 -->
                <p class="good-item-price">原价：￥{{goodItem.store_price | formatMoney()}}</p><!-- 商品价格。 -->
                <p class="good-item-settlement-price">现价：￥{{goodItem.settlement_price | formatMoney()}}</p><!-- 商品打折价 -->
              </div>
            </li>
          </mt-loadmore>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      searchResult: [],
      currentPage: 0,
      bottomAllLoaded: false
    };
  },
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {
        this.currentPage++;
        this.searchByInput();
      }, 1000);
    },
    searchByInput() {
      const goodsName = this.$refs.search.value;

      if (!goodsName) {
        return;
      }

      axios
        .post(
          "/searchGoodsByNameAndStoreId.htm",
          qs.stringify({
            storeId: this.$route.params.storeId,
            currentPage: this.currentPage,
            goodsName
          })
        )
        .then(res => {
          const { data } = res;
          const { result = [] } = data;

          this.searchResult = [...this.searchResult, ...result];

          console.log(this.searchResult);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang='scss'>
.detailSearch {
  position: relative;
  height: 1.2rem;
  background: #f9f9f9;
  .detailSearchImg {
    position: absolute;
    width: 0.36rem;
    height: 0.6rem;
    top: 0.3rem;
    left: 0.45rem;
  }
  .detailSearchIpt {
    div {
      position: absolute;
      width: 0.43rem;
      height: 0.57rem;
      left: 1.27rem;
      top: 0.14rem;
      z-index: 999;
    }
    input {
      position: absolute;
      height: 0.93rem;
      border: 0;
      border-bottom: 0.03rem solid #999999;
      padding-left: 0.69rem;
      width: 6.45rem;
      background: #f9f9f9;
      left: 1.26rem;
      outline: none;
    }
  }
  .detailSearchBtn {
    position: absolute;
    height: 0.8rem;
    width: 1.52rem;
    background: #ff5800;
    color: #fff;
    font-size: 0.36rem;
    border: 0;
    border-radius: 0.1rem;
    right: 0.44rem;
    top: 0.2rem;
  }
}

.search-result {
  padding-top: 1.2rem;
}

.good-list {
  .good-item {
    border-top: 0.02rem solid #f2f2f2;
    padding: 0.3rem 0.3rem;
    display: flex;

    &-img {
      width: 2.8rem;
      height: 2.8rem;
    }

    &-title {
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 0.5rem;
      font-size: 0.34rem;
    }

    &-info {
      width: 6.12rem;
      margin: 0rem 0.3rem 0 0.24rem;
      position: relative;
    }

    &-price {
      margin-bottom: 0.15rem;
      font-size: 0.25rem;
      text-decoration: line-through;
      color: #999999;
    }
    &-settlement-price {
      margin-bottom: 0.3rem;
      font-size: 0.32rem;
      color: #e27010;
    }
  }
}
</style>
