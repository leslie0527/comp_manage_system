<template>
  <div class="body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="date == 'log-dLog'?'历史日志':date == 'log-wLog'?'历史周志':'历史月至'" name="first">
              <el-main>
      <el-table :data="tableData">
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="data" label="内容" width="800"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
      </el-table>
    </el-main>
      </el-tab-pane>
      <el-tab-pane :label="date == 'log-dLog'?'创建日志':date == 'log-wLog'?'创建周志':'创建月至'" name="second">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      date:"",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData:[{
          title:"asda",
          data:"adsadsadasda",
          time:"1667.450.."
      }]
    };
  },
  created() {
    this.date = this.$route.query.date;
    // console.log(this.date);
  },
  watch:{
    $route(to,from){
      this.date = this.$route.query.date;
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.body {
  padding: 10px;
}
</style>