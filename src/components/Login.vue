<template>
  <div class="body" :style="{height:clientHeight}">
    <p class="header">葵阳公司人员管理系统</p>
    <div class="dialog">
      <div class="dialog-header">
        <p style="margin-left:10px;">登陆</p>
      </div>
      <p style="color:white">用户名</p>
      <!-- <input class="input" type="text" name="username" id="username"> -->
      <el-input v-model="inputName" placeholder="请输入用户名称"></el-input>
      <p style="color:white">用户密码</p>
      <el-input v-model="inputPwd" placeholder="请输入用户密码"></el-input>
      <div>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button @click="onReg">注册</el-button>
      </div>
    </div>
    <!-- <p>{{hello}}</p> -->
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      clientHeight: "",
      inputName: "",
      inputPwd: ""
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}px`;
    // this.$router.push('./Index');
  },
  created() {},
  methods: {
    onSubmit() {
      // console.log(this.form);
      // this.$router.push({ path: "/info", query: { isManage: 0 } });
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            query($username:String,$password:String){
              member {
                login(username: $username, password: $password) {
                  id
                  username
                  password
                  create_time
                  update_time
                }
              }
            }
          `,
          // Parameters
          variables: {
            username: this.inputName,
            password: this.inputPwd
          }
        })
        .then(data => {
          // console.log(this.form);
          console.log(data);
          this.$router.push({ path: "/info", query: { isManage: 0,id:data.data.member.login.id } });
        })
        .catch(error => {
          console.log(error);
        });
    },
    onReg() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation {
              member {
                register(username: $username, password: $password) {
                  id
                  username
                  password
                  create_time
                  update_time
                }
              }
            }
          `,
          // Parameters
          variables: {
            username: this.inputName,
            password: this.inputPwd
          }
        })
        .then(data => {
          // console.log(this.form);
          console.log(data);
          // this.$router.push({ path: "/info", query: { isManage: 0 } });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.body {
  background: url("../assets/img/timg.jpg") no-repeat fixed;
  width: 100%;
  height: 500px;
  /* filter:blur(2px) */
  padding: 1px;
  box-sizing: border-box;
  /* z-index:1; */
  position: relative;
}
.body:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(2px);
  z-index: 1;
}
.header {
  z-index: 21;
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  font-size: 60px;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  height: 100px;
  line-height: 100px;
}
.dialog {
  position: absolute;
  left: 30%;
  top: 30%;
  /*transform: translate(-50%,-50%);*/
  width: 400px;
  height: 300px;
  text-align: center;
  border-radius: 10px;
  background: inherit;
  z-index: 11;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.5);
  padding: 6px;
  padding-top: 30px;
}
.dialog-header {
  /* filter: blur(2px); */
  background: rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  text-align: start;
}
</style>