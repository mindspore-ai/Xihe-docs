<script setup lang="ts">
import logoImg from '@/assets/logo-footer.png';
</script>
<template>
  <div class="footer">
    <div class="footer-logo">
      <img :src="logoImg" alt="" srcset="" />
    </div>
    <div class="footer-content">
      <div class="above">
        <span class="text">品牌</span>
        <div class="division"></div>
        <a href="https://www.mindspore.cn/privacy" target="_blank" class="text"
          >隐私政策</a
        >
        <div class="division"></div>
        <a href="https://www.mindspore.cn/legal" target="_blank" class="text"
          >法律声明</a
        >
      </div>
      <div class="below">
        <span>版权所有</span>
        <span>©&nbsp;2022&nbsp;MindSpore</span>
        <span>&nbsp;保留一切权利</span>
      </div>
    </div>
    <div class="footer-QRcode"></div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1472px;
  margin: 0 auto;
  height: 200px;
  padding: 16px 16px;
  background-color: rgba(25, 26, 32, 1);
  color: rgba(255, 255, 255, 1);

  &-logo {
    display: flex;
    align-items: center;
    height: 64px;
    cursor: pointer;
    img {
      vertical-align: top;
      height: 100%;
    }
  }

  .above {
    width: 202px;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    margin: 0 auto;
    .text {
      color: rgba(255, 255, 255, 1);
      height: 26px;
      line-height: 26px;
    }

    .division {
      width: 1px;
      height: 20px;
      background-color: rgba(255, 255, 255, 1);
      margin-top: 2px;
    }
  }

  .below {
    display: flex;
    font-size: 12px;
    margin-top: 21px;
  }
}
</style>
