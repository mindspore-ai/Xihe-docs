<script setup lang="ts">

import logoImg from '@/assets/logo.png';

</script>

<template>
  <div class="header">
    <a class="header-logo" href="https://xihe.mindspore.cn">
      <img :src="logoImg" alt="" srcset="" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 1472px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;

  &-logo {
    position: fixed;
    left: 63px;
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      vertical-align: top;
      height: 100%;
    }
  }

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    margin-left: 96px;

    .header-center {
      width: 48%;
      // background-color: red;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .header-input {
        width: 100%;
        position: relative;
        .search-icon {
          font-size: 24px;
          color: #979797;
          position: absolute;
          top: 6px;
        }
        .empty-icon {
          font-size: 24px;
          color: #979797;
          position: absolute;
          top: 6px;
          right: 0;
          cursor: pointer;
        }
        .search-input {
          max-width: 100%;
          color: #999;
          font-size: 14px;
          border: none;
          border-bottom: 1px solid #999;
          padding-left: 30px;
        }
      }
      .search-wrap {
        width: 100%;
        margin: 0 auto;
        position: absolute;
        top: 58px;
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.05);

        .search-result {
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          background-color: #eaebed;
          opacity: 0.98;
          &-items {
            .result-items-title {
              font-size: 12px;
              color: #555;
              font-weight: 500;
              padding: 15px 32px 6px;
              border-bottom: 1px solid #e5e5e5;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .search-result-num {
                display: flex;
                // align-items: center;
                .right-icon {
                  font-size: 16px;
                  vertical-align: middle;
                  margin-left: 6px;
                  cursor: pointer;
                }
              }
            }
            .result-items-item {
              // color: #555;
              &:hover {
                .model-list {
                  background-color: inherit;
                }
              }
              .result-item-list {
                height: 38px;
                line-height: 38px;
                font-size: 14px;
                color: #555;
                padding: 0 32px;
                cursor: pointer;

                &:hover {
                  background-color: #e5e5e5;
                }
              }
              .model-list {
                background-color: #e5e5e5;
              }
            }
          }
        }
        .no-result {
          width: 100%;
          font-size: 12px;
          font-weight: 900;
          color: #555;
          background-color: #fff;
          padding: 15px 32px;
          box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.05);
        }
      }
    }
    .header-right {
      width: 400px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .header-search {
        position: relative;
        margin-right: 30px;
        .search-icon {
          width: 24px;
          height: 24px;
          font-size: 24px;
          color: #979797;
          position: absolute;
          top: 6px;
          left: 16px;
        }

        .header-right-input {
          font-size: 14px;
          color: #999;
          border: 1px #999 solid !important;
          padding-left: 48px;
        }
      }

      .header-tool {
        height: 100%;
        display: flex;
        align-items: center;

        .loading {
          font-size: 18px;
          color: #ffffff;
          background-color: #0f1927;
        }

        .user {
          color: #ffffff;
          height: 100%;

          &-login {
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;

            &-icon {
              color: #ffffff;
              width: 24px;
              height: 24px;
            }
          }

          &-info {
            height: 100%;
            cursor: pointer;

            &-avatar {
              display: flex;
              align-items: center;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
.vice-header {
  display: flex;
  align-items: center;
  max-width: 1472px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
  position: relative;

  .header-logo {
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      cursor: pointer;
      vertical-align: top;
      height: 100%;
      width: 100%;
    }
  }
  .search-header {
    // width: calc(100% - 86px);
    width: 48%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .header-input {
      width: 100%;
      position: relative;
      .search-icon {
        font-size: 24px;
        color: #979797;
        position: absolute;
        top: 6px;
      }
      .empty-icon {
        font-size: 24px;
        color: #979797;
        position: absolute;
        top: 6px;
        right: 0;
        cursor: pointer;
      }
      .search-input {
        max-width: 100%;
        color: #999;
        font-size: 14px;
        border: none;
        border-bottom: 1px solid #999;
        padding-left: 30px;
      }
    }

    .search-wrap {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      top: 80px;
      box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.05);

      .search-result {
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #eaebed;
        opacity: 0.98;
        &-items {
          .result-items-title {
            font-size: 12px;
            color: #555;
            font-weight: 500;
            padding: 15px 32px 6px;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .search-result-num {
              display: flex;
              // align-items: center;
              .right-icon {
                font-size: 16px;
                vertical-align: middle;
                margin-left: 6px;
                cursor: pointer;
              }
            }
          }
          .result-items-item {
            // color: #555;
            &:hover {
              .model-list {
                background-color: inherit;
              }
            }
            .result-item-list {
              height: 38px;
              line-height: 38px;
              font-size: 14px;
              color: #555;
              padding: 0 32px;
              cursor: pointer;

              &:hover {
                background-color: #e5e5e5;
              }
            }
            .model-list {
              background-color: #e5e5e5;
            }
          }
        }
      }
      .no-result {
        width: 100%;
        font-size: 12px;
        font-weight: 900;
        color: #555;
        background-color: #fff;
        padding: 15px 32px;
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
