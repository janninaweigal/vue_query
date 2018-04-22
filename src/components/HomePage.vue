<template>
  <div class="homepage">
    <h1>录取通知系统</h1>
    <form v-on:submit="formSubmit">
        <div class="form-group">
            <label>姓名：</label>
            <input type="text" v-model="name" class="form-control" placeholder="姓名">
        </div>
        <div class="form-group">
            <label>考生号：</label>
            <input type="text" v-model="studentId" class="form-control" placeholder="考生号">
        </div>
        <button type="submit" class="btn">查询</button>
    </form>
    <div v-bind:class="intervalid==null?'noneTime':'timeBox'">
       <div class="loader">
        <div class="loader-inner">
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
        </div>
      </div>
      <span v-html="intervalid==null?'':'查询中 '+count+'秒'" class="time"></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "homepage",
  data() {
    return {
      name: "",
      studentId: "",
      intervalid: null,
      count: Math.floor(Math.random() * 5000 / 1000)
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();
      if (
        this.name != "" &&
        (this.studentId != "" &&
          !isNaN(Number(this.studentId)) &&
          this.studentId.length == 10)
      ) {
        var that = this;
        axios
          .post("http://localhost:888/api/homepage", {
            "name": this.name,
            "studentId": this.studentId
          })
          .then(function(response) {
            that.data = response.data;
            if (that.data != null) {
              if (that.data.code == "QM8888") {
                that.intervalid = setInterval(that.countDown, 1000);
              } else {
                alert("出现错误了！");
              }
            } else {
              alert("未找到数据，请重新检查姓名和考生号！");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        alert("请重新输入！");
      }
    },
    //倒计时
    countDown: function() {
      if (this.count == 0) {
        clearInterval(this.intervalid);
        setTimeout(() => {
          this.$router.push({
            name: "Success",
            params: { data: this.data.data }
          });
        });
      }
      this.count = --this.count;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noneTime {
  display: none;
}
.homepage {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
.homepage .form-group {
  width: 100%;
  margin-bottom: 15px;
  text-align: left;
}
.homepage .form-group label {
  display: inline-block;
  max-width: 100%;
  font-weight: 700;
  margin-bottom: 5px;
}
.homepage .form-group .form-control {
  display: block;
  width: 100%;
  height: 34px;
  box-sizing: border-box;
  padding: 20px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.homepage .btn {
  width: 100%;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  color: #fff;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #1c911c;
  border-color: #4cae4c;
}

/* 倒计时 */
.homepage .timeBox {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}
.homepage .timeBox .time {
  display: block;
  overflow: hidden;
  width: 100px;
  line-height: 100px;
  opacity: 0.5;
  color: #fff;
  margin: 150px auto;
}

.loader-inner {
  bottom: 0;
  height: 60px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}

.loader-line-wrap {
  -webkit-animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)
    infinite;
  animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  width: 100px;
}
.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.loader-line-wrap:nth-child(1) {
  -webkit-animation-delay: -50ms;
  animation-delay: -50ms;
}
.loader-line-wrap:nth-child(2) {
  -webkit-animation-delay: -100ms;
  animation-delay: -100ms;
}
.loader-line-wrap:nth-child(3) {
  -webkit-animation-delay: -150ms;
  animation-delay: -150ms;
}
.loader-line-wrap:nth-child(4) {
  -webkit-animation-delay: -200ms;
  animation-delay: -200ms;
}
.loader-line-wrap:nth-child(5) {
  -webkit-animation-delay: -250ms;
  animation-delay: -250ms;
}

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(60, 80%, 60%);
  height: 76px;
  width: 76px;
  top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(120, 80%, 60%);
  height: 62px;
  width: 62px;
  top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(180, 80%, 60%);
  height: 48px;
  width: 48px;
  top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(240, 80%, 60%);
  height: 34px;
  width: 34px;
  top: 35px;
}

@-webkit-keyframes spin {
  0%,
  15% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0%,
  15% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
