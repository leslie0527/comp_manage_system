<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="info">{{isManage == 1?"员工个人信息":"个人信息"}}</el-menu-item>
      <el-submenu index="log">
        <template slot="title">日志</template>
        <el-menu-item index="log-dLog">日志</el-menu-item>
        <el-menu-item index="log-wLog">周志</el-menu-item>
        <el-menu-item index="log-mLog">月至</el-menu-item>
      </el-submenu>
      <el-menu-item index="reissue">签到打卡</el-menu-item>
      <!-- <el-menu-item index="4">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>-->
    </el-menu>
    <div class="child">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        activeIndex:"info",
        isManage:1
    };
  },
  created(){
    this.isManage = this.$route.query.isManage;
    console.log(this.$route.query.isManage)
  },
  methods: {
    handleSelect(key, keyPath) {
        // console.log(keyPath);
      switch(keyPath[0]){
          case "info":
                this.$router.push({path:'/Info',query:{isManage:this.isManage}})
                break;
                case "log":
                this.$router.push({path:'/log',query:{date:keyPath[1]}})
                break;
                default:
                this.$router.push('/')
      }
    }
  }
};
</script>
<style>
</style>