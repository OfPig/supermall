<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-img">
        <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {dateFtt} from "common/utils";

export default {
  name: "DetailComment",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000)
      return dateFtt(date,'yyyy/MM/dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.info-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 5px solid #f2f5f8;
}

.header-more {
  padding-right: 10px;
}

.info-user {
  line-height: 45px;
  /* 让元素垂直中心对齐 */
  display: flex;
  align-items: center;
  padding: 10px;
}

.info-user img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, .1);
}

.info-user span {
  margin-left: 10px;
  vertical-align: center;
}

.info-detail {
  padding: 10px;
}

.info-detail p {
  line-height: 25px;
}

.info-other {
  display: flex;
  padding-top: 10px;
}

.date {
  margin-right: 10px;
}

.info-img img {
  height: 100px;
  width: 100px;
  padding: 10px;
}
</style>
