<template>
  <div id="app">
    <img src="./assets/logo.png" class="headImg" alt="天津市大学软件学院">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media screen and (max-width: 406px) {
    .headImg{
      width:100%;
    }
  }
</style>
