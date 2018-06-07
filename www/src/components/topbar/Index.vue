<template>
<div id="topbar">
  <el-menu theme="dark" :default-active="'2'" mode="horizontal" id="sc-menu">
    <el-menu-item index="1">手机页面生成工具</el-menu-item>
  </el-menu>
</div>

</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style>
#topbar {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
}
.el-menu-item:hover{
  border-bottom:none !important;
}
</style>
