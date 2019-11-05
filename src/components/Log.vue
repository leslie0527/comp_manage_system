<template>
  <div class="body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="历史记录" name="first">
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="title" label="标题" width="200"></el-table-column>
            <el-table-column prop="content" label="内容" width="500"></el-table-column>
            <el-table-column prop="create_time" label="时间" width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="200">
              <template slot-scope="scope">
                {{tableData[scope.$index].type==null?"暂无类型定义":tableData[scope.$index].type==10?"日志":tableData[scope.$index].type==20?"周志":"月志"}}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="editPerson(scope.row)" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-tab-pane>
      <el-tab-pane
        :label="date == 'log-dLog'?'创建日志':date == 'log-wLog'?'创建周志':'创建月至'"
        name="second"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item :label="date == 'log-dLog'?'日志名称':date == 'log-wLog'?'周志名称':'月至名称'">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="date == 'log-dLog'?'日志内容':date == 'log-wLog'?'周志内容':'月至内容'">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <p>{{dialogData.content}}</p>
      <p style="text-align:right">发布时间：{{dialogData.create_time}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      activeName: "second",
      userId: "",
      date: "",
      isManage: "",
      dialogData: {},
      dialogVisible: false,
      form: {
        name: "",
        date1: "",
        date2: "",
        desc: ""
      },
      tableData: []
    };
  },
  created() {
    this.date = this.$route.query.date;
    // console.log(this.date);
    this.userId = parseInt(this.$route.query.id);
    this.isManage = parseInt(this.$route.query.isManage);
    if (this.isManage) {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            query {
              memberDiary {
                search {
                  id
                  title
                  content
                  type
                  memberId {
                    id
                    username
                  }
                }
              }
            }
          `,
          // Parameters
        })
        .then(data => {
          // console.log(this.form);
          console.log(data);
          this.tableData = data.data.memberDiary.search;
          // alert("添加成功")
          // this.$router.push({ path: "/info", query: { isManage: 0,id:data.data.member.login.id } });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            query($id: Int) {
              memberDiary {
                search(memberId: $id) {
                  title
                  content
                  type
                  create_time
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
          // console.log(this.form);
          console.log(data);
          this.tableData = data.data.memberDiary.search;
          // alert("添加成功")
          // this.$router.push({ path: "/info", query: { isManage: 0,id:data.data.member.login.id } });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    $route(to, from) {
      this.date = this.$route.query.date;
    }
  },
  methods: {
    onSubmit() {
      if (this.form.name == "") {
        alert("请填写标题");
        return;
      } else if (this.form.desc == "") {
        alert("请填写内容");
        return;
      } else if (this.form.date1 == "" || this.form.date2 == "") {
        alert("请输入发布时间");
        return;
      }
      // console.log(this.form);
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $title: String
              $content: String
              $type: String
              $memberId: Int
            ) {
              memberDiary {
                create(
                  title: $title
                  content: $content
                  type: $type
                  memberId: $memberId
                ) {
                  memberId {
                    id
                  }
                }
              }
            }
          `,
          // Parameters
          variables: {
            title: this.form.name,
            content: this.form.desc,
            type:
              this.date == "log-dLog"
                ? "10"
                : this.date == "log-wLog"
                ? "20"
                : "30",
            memberId: this.userId
          }
        })
        .then(data => {
          // console.log(this.form);
          console.log(data);
          alert("添加成功");
          // this.$router.push({ path: "/info", query: { isManage: 0,id:data.data.member.login.id } });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    editPerson(row) {
      console.log(row);
      this.dialogData = row;
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style>
.body {
  padding: 10px;
}
.el-form-item__label,.el-tabs__item{
  color: #000;
}
</style>