<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#2068b0"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="info">{{isManage == 1?"员工个人信息":"个人信息"}}</el-menu-item>
      <el-submenu index="log">
        <template slot="title">工作记录</template>
        <el-menu-item index="log-dLog">日志</el-menu-item>
        <el-menu-item index="log-wLog">周志</el-menu-item>
        <el-menu-item index="log-mLog">月至</el-menu-item>
      </el-submenu>
      <el-menu-item index="reissue">签到打卡</el-menu-item>
      <!-- <el-menu-item index="4">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>-->
    </el-menu>
    <div class="child" :style="clientHeight">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        activeIndex:"info",
        isManage:1,
        userId:"",
        clientHeight:""
    };
  },
  created(){
    this.isManage = this.$route.query.isManage;
    this.userId = parseInt(this.$route.query.id);
    // console.log(this.$route.query.id);
    // console.log(this.$route.query.isManage)
  },
  mounted(){
    this.clientHeight =   `height:${document.documentElement.clientHeight-60}px`
  },
  methods: {
    handleSelect(key, keyPath) {
        // console.log(keyPath);
      switch(keyPath[0]){
          case "info":
                this.$router.push({path:'/Info',query:{isManage:this.isManage,id:this.userId}})
                break;
                case "log":
                this.$router.push({path:'/log',query:{date:keyPath[1],isManage:this.isManage,id:this.userId}})
                break;
                default:
                this.$router.push({path:'/ClockIn',query:{isManage:this.isManage,id:this.userId}})
      }
    }
  }
};
</script>
<style>
.child{
  background:#b1ccea;
  /* 
  background-size: 100% 100%; */
  /* padding-bottom: 100px; */
}
</style>