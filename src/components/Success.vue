<template>
  <div class="success">
    <h1 v-bind:class="data.success?'successTitle':'errorTitle'">{{data.success?'恭喜你,你被录取了':'不好意思,你落榜了'}}</h1>
    <div class="container">
      <img :src="data.imgSrc" alt="头像" class="userImg">
      <div class="displayBox">
        <h3>姓名：{{data.name}}</h3>
        <span>学号：<strong class="text">{{data.studentId}}</strong></span>
        <span>分数：<strong class="text">{{data.score}}</strong></span>
        <span>电话号码：<strong class="text">{{data.phone}}</strong></span>
        <span>学校：<strong class="text">{{data.school}}</strong></span>
        <span>地址：<strong class="text">{{data.address}}</strong></span>
      </div>
      <button class="btn" @click="fanhui">返回继续查成绩</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'success',
  data () {
    return {
      data:{}
    }
  },
  methods:{
    fanhui:function(){
      this.$router.push({name: 'HomePage'});
    }
  },
  created:function(){
    var obj=sessionStorage.getItem("studentInfo");
    if(JSON.stringify(this.$route.params) == "{}"&&obj!=null){
      this.data=JSON.parse(obj);
      return;
    }
    if(JSON.stringify(this.$route.params) == "{}"){
      this.data={};
    }else{
      this.data=this.$route.params.data;
      var json={};
      // for(var i=0;i<this.data.length;i++){
      //   json.name=this.data.name;
      // }
     for (const key in this.data) {
       if (!json.hasOwnProperty(key)) {
         json[key]=this.data[key];
       }
     }
    sessionStorage.setItem("studentInfo",JSON.stringify(json));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .noneInfo{
    display:none;
  }
  .success{
    width:100%;
    margin:0px auto;
  }
  .success .successTitle{
    color:red;
  }
  .success .errorTitle{
    color:#000;
  }
  .success .container{
    width:100%;
    display: flex;
    flex-direction:row;
    justify-content:space-around;
    align-items: center;
    flex-wrap:wrap;
  }
  .success .container .userImg{
    width:30%;
  }
  .success .container .displayBox{
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
  }
  .success .container .displayBox .text{
    color:#5cb85c;
  }
  .success .container .btn {
      margin:10px 30px;
      width:100%;
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
      background-color: #5cb85c;
      border-color: #4cae4c;
    }
    
</style>
