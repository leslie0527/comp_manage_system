<template>
  <div>
    <div @click="qiandao" style="width:100px;height:100px;border-radius:50%;background:#3477f6;margin:auto;border:10px solid rgba(99,100,240,1);text-align:center;line-height:100px;color:white;font-size:24px;">
      签到
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="500">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="500" v-if="!isManage">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
            >{{ scope.row.memberId.username==null?'未命名':scope.row.memberId.username }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="500" v-else>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
            >{{ scope.row.memberId}}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      userId: "",
      tableData: []
    };
  },
  created() {
    console.log(new Date());
    this.userId = parseInt(this.$route.query.id);
    this.isManage = parseInt(this.$route.query.isManage);
    if (this.isManage) {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            query{
              memberDiary{
                search{
                  create_time
                  memberId {
                    username
                  }
                }
              }
            }
          `
          // Parameters
        })
        .then(data => {
          // console.log(this.form);
          console.log(data.data.memberDiary.search);
          this.tableData = data.data.memberDiary.search;
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
              memberSignIn {
                search(memberId: $id) {
                  create_time
                  memberId {
                    username
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
          // console.log(this.form);
          console.log(data.data.memberSignIn.search);
          this.tableData = data.data.memberSignIn.search;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    qiandao() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: Int) {
              memberSignIn {
                create(memberId: $id) {
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
          alert('签到成功');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.is-selected {
  color: #1989fa;
}
</style>