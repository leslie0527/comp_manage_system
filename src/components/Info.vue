<template>
  <div>
    <el-main v-if="isManage">
      <el-table :data="tableData">
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="num" label="编号" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="state" label="状态" width="100"></el-table-column>
        <el-table-column prop="dep" label="所属部门">
          <!-- <el-select v-model="dep" placeholder="请选择所属部门">
            <el-option
              v-for="item in depOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
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
          <el-radio label="销售"></el-radio>
          <el-radio label="技术"></el-radio>
          <el-radio label="人事"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交个人信息</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="员工姓名" label-width="120px">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="员工编号" label-width="120px">
      <el-input v-model="form.num" autocomplete="off"></el-input>
    </el-form-item>
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
        <el-option label="销售" value="销售"></el-option>
        <el-option label="技术" value="技术"></el-option>
        <el-option label="人事" value="人事"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isManage: false,
      dialogFormVisible: false,
      form: {
        name: "王小虎",
        num: "NO.1",
        sex: "男",
        state: "在职",
        dep: "销售"
      },
      tableData: [
        {
          name: "王小虎",
          num: "NO.1",
          sex: "男",
          state: "在职",
          dep: "销售"
        },
        {
          name: "王小虎",
          num: "NO.1",
          sex: "男",
          state: "在职",
          dep: "销售"
        },
        {
          name: "王小虎",
          num: "NO.1",
          sex: "男",
          state: "在职",
          dep: "销售"
        }
      ],
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
    //   console.log(!this.isManage);
  },
  methods: {
    onSubmit() {},
    // handleClick(row) {
    //     console.log(row);
    //   },
      editPerson(row){
        console.log(row);
        this.dialogFormVisible = !this.dialogFormVisible
      }
  }
};
</script>
<style>
</style>