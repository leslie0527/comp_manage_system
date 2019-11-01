<template>
  <div class="body" :style="{height:clientHeight}">
    <p class="title">管理员登陆界面</p>
    <div class="form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="管理员账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input v-model="form.userpwd"></el-input>
        </el-form-item>
        <el-button type="info" @click="onSubmit">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      clientHeight: "",
      userId:null,
      form: {
        username: "",
        userpwd: ""
      }
    };
  },
  created() {
    this.clientHeight = `${document.documentElement.clientHeight}px`;
  },
  methods:{
      onSubmit(){
          console.log(this.form);
                if (this.form.username == ""||this.form.userpwd == "") {
        this.$alert("请输入用户名或密码", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            // this.$message({
            //   type: "info",
            //   message: `action: ${action}`
            // });
          }
        });
        return;
      }
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
            username: this.form.username,
            password: this.form.password
          }
        })
        .then(data => {
          // console.log(this.form);
          console.log(data);
          if(data.data.member.login.id == 1){
              this.$router.push({path:"/info",query:{isManage:1,id:data.data.member.login.id}})
          }else{
            alert('非管理员不能登陆');
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
  }
};
</script>
<style>
.body {
  width: 100%;
  background: #333;
}
.title {
  color: white;
  font-size: 60px;
}
.form {
  width: 500px;
  height: 300px;
  background: #003371;
  border-radius: 10px;
  margin-left: 50%;
  margin-top: 10%;
  box-shadow: 10px 10px 10px #222;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.el-form-item__label{
    color:white;
}
</style>