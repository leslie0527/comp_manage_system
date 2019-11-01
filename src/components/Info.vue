<template>
  <div>
    <el-main v-if="isManage">
      <el-table :data="tableData">
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="numbered" label="编号" width="100">
          <template slot-scope="scope">{{tableData[scope.$index].numbered==null?"暂无编号":tableData[scope.$index].numbered}}</template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100">
          <template slot-scope="scope">{{tableData[scope.$index].sex==20?"女":"男"}}</template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100">
          <template slot-scope="scope">{{tableData[scope.$index].state==20?"离职":"在职"}}</template>
        </el-table-column>
        <el-table-column prop="memberWages.basic" label="工资">
          <template slot-scope="scope">{{tableData[scope.$index].memberWages==null?"暂无工资记录":tableData[scope.$index].memberWages[0].basic}}</template>
          <!-- <el-select v-model="dep" placeholder="请选择所属部门">
            <el-option
              v-for="item in depOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
        </el-table-column>
        <el-table-column prop="memberWages.basic" label="部门">
          <template slot-scope="scope">{{tableData[scope.$index].departmentId==null?"暂未分配部门":tableData[scope.$index].departmentId.name}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" @click="editPerson(scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-form ref="form" :model="form" label-width="80px" v-else>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="员工编号">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio label="在职"></el-radio>
          <el-radio label="离职"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-radio-group v-model="form.dep">
          <el-radio :label="item.id" v-for="(item,key) in depArr" v-bind:key="key">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交个人信息</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="员工信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="员工姓名" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" label-width="120px">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="工资" label-width="120px">
          <el-input v-model="form.basic" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-select v-model="form.state" placeholder="请选择员工状态">
            <el-option label="在职" value="在职"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" label-width="120px">
          <el-select v-model="form.dep" placeholder="请选择员工所属部门">
            <el-option :value="item.id" v-for="(item,key) in depArr" v-bind:key="key" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      isManage: false,
      userId: "",
      dialogFormVisible: false,
      depArr: {},
      // imageUrl: '',
      form: {
        id:"",
        name: "王小虎",
        num: "NO.1",
        sex: "男",
        state: "在职",
        dep: "销售",
        imageUrl: "",
        quitTime: "2099-12-31",
        numbered: "",
        basic:""
      },
      tableData: [],
      dep: "销售",
      depOptions: [
        { value: "销售", label: "销售" },
        { value: "技术", label: "技术" },
        { value: "人事", label: "人事" }
      ]
    };
  },
  created() {
    this.isManage = parseInt(this.$route.query.isManage);
    this.userId = parseInt(this.$route.query.id);
    console.log(this.userId);
    this.$apollo
      .mutate({
        // Query
        mutation: gql`
          query($id: Int) {
            memberInfo {
              detail(id: $id) {
                imgPath
                quitTime
                numbered
                state
                sex
                name
                departmentId {
                  name
                  id
                }
              }
            }
          }
        `,
        // Parameters
        variables: {
          id: this.userId
        }
      })
      .then(data => {
        // console.log(data);
        this.form.imageUrl = data.data.memberInfo.detail.imgPath;
        this.form.name = data.data.memberInfo.detail.name;
        this.form.id = data.data.memberInfo.detail.id;
        this.form.num = data.data.memberInfo.detail.numbered;
        this.form.sex = data.data.memberInfo.detail.sex == 10 ? "男" : "女";
        this.form.state =
          data.data.memberInfo.detail.state == 10 ? "在职" : "离职";
        this.form.dep = data.data.memberInfo.detail.departmentId.id;
        this.form.numbered = data.data.memberInfo.detail.numbered;
      })
      .catch(error => {
        console.log(error);
      });
    //   console.log(!this.isManage);
    this.$apollo
      .mutate({
        // Query
        mutation: gql`
          query {
            department {
              search(name: "", page: 1) {
                name
                id
              }
            }
          }
        `
        // Parameters
      })
      .then(data => {
        console.log(data.data.department.search);
        // console.log(data.data.department.search);
        this.depArr = data.data.department.search;
      })
      .catch(error => {
        console.log(error);
      });
    this.$apollo
      .mutate({
        // Query
        mutation: gql`
          query {
            memberInfo {
              search {
                id
                imgPath
                quitTime
                numbered
                state
                sex
                name
                departmentId {
                  id
                  name
                }
                memberWages {
                  id
                  basic
                }
              }
            }
          }
        `
        // Parameters
      })
      .then(data => {
        console.log(data.data.memberInfo.search);
        this.tableData = data.data.memberInfo.search;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onSubmit() {
      // console.log(document.getElementsByClassName("avatar")[0].to)
      console.log(this.form);
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $id: Int!
              $imgPath: String
              $quitTime: String
              $numbered: Int
              $state: String
              $sex: String
              $name: String
              $departmentId: Int
              $memberId: Int
            ) {
              memberInfo {
                update(
                  id: $id
                  imgPath: $imgPath
                  quitTime: $quitTime
                  numbered: $numbered
                  state: $state
                  sex: $sex
                  name: $name
                  departmentId: $departmentId
                  memberId: $memberId
                ) {
                  id
                }
              }
            }
          `,
          // Parameters
          variables: {
            id: this.userId,
            imgPath: this.form.imageUrl,
            quitTime: this.form.quitTime,
            numbered: this.form.numbered,
            state: this.form.state == "在职" ? 10 : 20,
            sex: this.form.sex == "男" ? 10 : 20,
            name: this.form.name,
            departmentId: this.form.dep,
            memberId: 10
          }
        })
        .then(data => {
          // console.log(this.form);
          console.log(data);
          alert('您的信息已提交成功');
          // this.$router.push({ path: "/info", query: { isManage: 0,id:data.data.member.login.id } });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // handleClick(row) {
    //     console.log(row);
    //   },
    editPerson(row) {
      console.log(row);
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleAvatarSuccess(res, file) {
      this.cutImageBase64(file.raw, 400, 0);
      console.log(file);
      // this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    cutImageBase64(m_this, wid, quality) {
      var file = m_this;
      var URL = window.URL || window.webkitURL;
      var blob = URL.createObjectURL(file);
      var base64;
      var img = new Image();
      img.src = blob;
      let self = this;
      img.onload = function() {
        var that = this;
        //生成比例
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = wid || w;
        h = w / scale;
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // $(canvas).attr({
        //   width: w,
        //   height: h
        // });
        // document.getElementById("canvas").width = w;
        // document.getElementById("canvas").height = h;
        ctx.drawImage(that, 0, 0, w, h);
        // 生成base64
        base64 = canvas.toDataURL("image/jpeg", quality || 0.4);
        console.log(base64);
        console.log(self.form);
        self.form.imageUrl = base64;
        //这里可以直接将base64放在img的src上，直接就能显示图片了，这里压缩后图片的大小大概是5M压缩到了几十KB
      };
    },
    update(){
      console.log(this.form);
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $id: Int!
              $imgPath: String
              $quitTime: String
              $numbered: Int
              $state: String
              $sex: String
              $name: String
              $departmentId: Int
              $memberId: Int
            ) {
              memberInfo {
                update(
                  id: $id
                  imgPath: $imgPath
                  quitTime: $quitTime
                  numbered: $numbered
                  state: $state
                  sex: $sex
                  name: $name
                  departmentId: $departmentId
                  memberId: $memberId
                ) {
                  id
                }
              }
            }
          `,
          // Parameters
          variables: {
            id: this.userId,
            imgPath: this.form.imageUrl,
            quitTime: this.form.quitTime,
            numbered: this.form.numbered,
            state: this.form.state == "在职" ? 10 : 20,
            sex: this.form.sex == "男" ? 10 : 20,
            name: this.form.name,
            departmentId: this.form.dep,
            memberId: 10
          }
        })
        .then(data => {
          // console.log(this.form);
          console.log(data);
          alert("信息修改成功")
          // this.$router.push({ path: "/info", query: { isManage: 0,id:data.data.member.login.id } });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>