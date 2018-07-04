<template>
  <div>
    <div class="search">
      <div class="search1">
        <router-link to="/"><div class="left-arrow">
          <img src="../../assets/mIcon/title_back_normal.png">
        </div></router-link>
      </div>
      <div class="search1">
        <p>商品</p>
      </div>
      
      <!-- <div class="search1">
        <div class="bottom-arrow">
          <img src="../../assets/mIcon/bottom-arrow.png">
        </div>
      </div> -->

      <div class="search1">
        <input type="text" ref="search" placeholder="请输入要搜索的商品名称">
      </div>
      <div class="search1">
      <button type="submit" class="mint-button11" @click="searchByInput(-1)">搜索</button>
      </div>
    </div>
    <div class="maskLayer">
      <div class="page-loadmore-wrapper" ref="wrapper">

        <ul class="detailMoreTabTitle" v-bind="MoreTab()" v-show="ISshow">
            <li class="li1 a" @click="orderFn('goods_salenum', true)">人气</li>
            <li class="li2" @click="orderFn('store_price',true)">价格
                <!-- <div class="sx-arrow-up" @click="orderFn('store_price',true)"></div>
                <div class="sx-arrow-down" @click="orderFn('store_price',false)"></div> -->
            </li>
            <li class="li3" @click="orderFn('goods_salenum',true)">销量</li>
            <li class="li4" @click="orderFn('addTime','yes')">时间</li>
        </ul>

        <mt-loadmore
          :bottom-method="loadBottom" 
          :bottom-all-loaded="bottomAllLoaded" 
          ref="loadmore" 
          @bottom-status-change="handleBottomChange" 
          :auto-fill="false"
          >
          <ul class="good-list" ref="wrapper">
            <li class="good-item" v-for="(goodItem, index) in List" :key="index" @click="goto_detail(goodItem.id)">
              <div class="good-item-img">
                <img :src="'http://www.d1sc.com/' + changeData(goodItem.goods_main_photo.path,goodItem.goods_main_photo.name)">
              </div>
              <p class="good-item-title">{{goodItem.goods_name}}</p>
              <div class="detailMoreTabMainSpan">
                  <span>￥{{goodItem.store_price | formatMoney()}}</span>
                  <span>销量：{{goodItem.goods_salenum}}</span>
              </div>
            </li>
          </ul>
        </mt-loadmore>
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
      saleRankList: [],
      searchResult: [],
      bottomAllLoaded: false,
      currentPage: 0,
      //=======
      letter:'',       //默认不排序
      original:false,   //默认从小到大排列
      ISshow:false,
      id: "", //跳转详情页id
    };
  },
  //通过计算属性过滤数据
    computed:{
        List: function(){
            var _this = this;
            var arrByZM = [];//声明一个空数组来存放数据
            for (var i=0;i<this.saleRankList.length;i++){
                    arrByZM.push(this.saleRankList[i]);
                    console.log(this.saleRankList[i]);
                    //向空数组中添加数据
            }
            //逻辑-->升序降序排列  false: 默认从小到大  true：默认从大到小
            //判断，如果要letter不为空，说明要进行排序
            if(this.letter != ''){
                arrByZM.sort(function( a , b){
                    if(_this.original){
                        return b[_this.letter] - a[_this.letter];
                    }else{
                        return a[_this.letter] - b[_this.letter];
                    }
                });
            }
            //一定要记得返回筛选后的数据
            return arrByZM;
        }
    },
  methods: {
    orderFn(letter,original){
          this.letter = letter;       //排序字段 price or sales 
          this.original = original;   //排序方式  up or down
      },
    goto_detail(id) {
      //跳转到详情页
      console.log(id);
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: { id: id }
      });
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      console.log(1);
      setTimeout(() => {
        console.log(2);
        this.currentPage++;
        this.searchByInput();
        this.$refs.loadmore.onBottomLoaded();
      }, 1000);
    },
    searchByInput() {
        this.ISshow = true;
      const goodsName = this.$refs.search.value;
      if (!goodsName) {
        return;
      }
      axios
        .post(
          "/searchGoodsByName.htm",
          qs.stringify({
            goodsName,
            currentPage: this.currentPage
          })
        )
        .then(res => {
          console.log(res);
          const { data } = res;
          const { result = [] } = data;
          this.searchResult = [...this.searchResult, ...result];
          this.saleRankList = this.searchResult;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    MoreTab() {
      $(".detailMoreTabTitle li").click(function() {
        $(".detailMoreTabTitle li").removeClass("active"); 
        $(this).addClass("active");
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  height: 1.78rem;
  position: relative;
  .search1 {
    p {
      font-size: 0.43rem;
      position: absolute;
      left: 1.26rem;
      top: 0.6rem;
    }
    .left-arrow {
      height: 0.6rem;
      width: 0.37rem;
      left: 0.36rem;
      position: absolute;
      top: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .bottom-arrow {
      position: absolute;
      height: 0.34rem;
      width: 0.32rem;
      left: 2.8rem;
      top: 0.8rem;
    }
    input {
      outline: none;
      position: absolute;
      width: 5.69rem;
      padding: 0.25rem 0 0.32rem 0.24rem;
      border-radius: 3%;
      border: 0;
      font-size: 0.34rem;
      color: #959595;
      background: #e9e9e9;
      right: 1.8rem;
      height: 0.46rem;
      top: 0.4rem;
    }
    .mint-button11 {
      position: absolute;
      width: 1.2rem;
      height: 0.92rem;
      background: #f97d23;
      padding: 0;
      right: 0.3rem;
      top: 0.45rem;
      font-size: 0.34rem;
      border: 0;
      outline: none;
      color: #fff;
      border-radius: 12%;
    }
  }
}
.maskLayer {
  width: 10.8rem;
  height: 13.6rem;
  background: #f7f7f7;
  position: relative;
  
 .detailMoreTabTitle {
    height: 1.34rem;
    :nth-child(2) {
      position: relative;
      .sx-arrow-up {
        border-style: dashed dashed solid dashed;
        border-color: transparent transparent #251716 transparent;
        border-width: 0.2rem;
        width: 0;
        height: 0;
        position: absolute;
        top: 0.25rem;
        right: 0.4rem;
      }
      .sx-arrow-down {
        border-style: solid dashed dashed dashed;
        border-width: 0.2rem;
        border-color: #251716 transparent transparent transparent;
        width: 0;
        height: 0;
        position: absolute;
        top: 0.7rem;
        right: 0.4rem;
      }
    }
    li {
      height: 1.34rem;
      text-align: center;
      line-height: 1.34rem;
      font-size: 0.44rem;
      width: 2.7rem;
      float: left;
    }
  }



.good-list {
    .good-item {
      width: 5.22rem;
      height: 7.71rem;
      border: 0.01rem solid #e5e5e5;
      float: left;
      margin: 0.06rem;
      border-radius: 0.1rem;
      .good-item-img {
        height: 5.29rem;
        width: 5.22rem;
        margin-bottom: 0.36rem;
        img {
          border-radius: 0.1rem 0.1rem 0 0;
        }
      }
      p {
        font-size: 0.34rem;
        padding: 0 0.19rem 0 0.44rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .detailMoreTabMainSpan {
        position: relative;
        margin-top: 0.28rem;
        :nth-child(1) {
          font-size: 0.47rem;
          margin-left: 0.44rem;
          color: #fe0002;
        }
        :nth-child(2) {
          font-size: 0.29rem;
          color: #777777;
          right: 0.4rem;
          position: absolute;
        }
      }
    }
  }

  .good-list {
    .good-item {
      width: 5.22rem;
      height: 7.71rem;
      border: 0.01rem solid #e5e5e5;
      float: left;
      margin: 0.06rem;
      border-radius: 0.1rem;
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
    }
  }
}
.active {
  color: red;
}

</style>
