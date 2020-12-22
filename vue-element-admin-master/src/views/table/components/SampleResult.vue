<template>
  <div id="app1">
    <form-create v-model="fApi" :rule="rule" :option="options"></form-create>
    <!-- <el-button @click="dialogFormVisible = false">
      取消
    </el-button> -->
    <el-button @click=reset()>
      重置
    </el-button>
    <el-button type="primary" @click="dialogStatus==='create'?createDataOne():updateDataOne()">
      提交
    </el-button>
  </div>

</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle,
  deleteArticle,
  fetchArticle,
} from "@/api/result";
export default {
  props: ["dialogStatus", "dataForm"],
  data() {
    return {
      fApi: {},
      options: {
        submitBtn: false,
        // mounted: {},
        onReload: function ($f) {
          //$f.reload()
          console.log($f);
        },
        mounted: function ($f) {
          console.log($f);
        },
      },
      rule: [
        {
          type: "hidden",
          field: "id",
          value: this.dataForm.id,
        },
        {
          type: "InputNumber",
          title: "Sequence ID",
          field: "sequence_id",
          value: this.dataForm.sequence_id,
          props: {
            precision: 0,
            controls: false,
            placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 20,
          },
          validate: [
            { required: true, message: "请输入测序编号", trigger: "blur" },
          ],
        },
        {
          type: "input",
          title: "测序批次",
          field: "batch",
          value: this.dataForm.batch,
          col: {
            span: 12,
          },
        },
        {
          type: "input",
          title: "NAME",
          field: "name_1",
          value: this.dataForm.name_1,
          col: {
            span: 12,
          },
        },
        {
          type: "InputNumber",
          title: "Input",
          field: "data_quality_input",
          value: this.dataForm.data_quality_input,
          props: {
            precision: 0,
            controls: false,
            // placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 12,
          },
        },
        {
          type: "InputNumber",
          title: "bam",
          field: "data_quality_bam",
          value: this.dataForm.data_quality_bam,
          props: {
            precision: 0,
            controls: false,
            // placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 12,
          },
        },
        {
          type: "InputNumber",
          title: "bam/Input(%)",
          field: "data_quality_bam_input",
          value: this.dataForm.data_quality_bam_input,
          props: {
            precision: 0,
            controls: false,
            precision: 2,
            // placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 12,
          },
        },
        {
          type: "InputNumber",
          title: "uniq.bam",
          field: "data_Quality_uniq_bam",
          value: this.dataForm.data_Quality_uniq_bam,
          props: {
            precision: 0,
            controls: false,
            // placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 12,
          },
        },
        {
          type: "InputNumber",
          title: "uniq.nodup.bam",
          field: "data_Quality_uniq_nodup_bam",
          value: this.dataForm.data_Quality_uniq_nodup_bam,
          props: {
            precision: 0,
            controls: false,
            // placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 12,
          },
        },
        {
          type: "InputNumber",
          title: "uniq/Input(%)",
          field: "data_Quality_uniq_nodup_bam_input",
          value: this.dataForm.data_Quality_uniq_nodup_bam_input,
          props: {
            precision: 0,
            controls: false,
            precision: 2,
            // placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 12,
          },
        },
        {
          type: "InputNumber",
          title: "Coverage(%)",
          field: "coverage",
          value: this.dataForm.coverage,
          props: {
            precision: 0,
            controls: false,
            precision: 2,
            // placeholder: "请输入测序编号",
            // disabled: true,
          },
          col: {
            span: 12,
          },
        },
      ],
    };
  },
  // mounted() {
  //   this.resetForm();
  // },
  methods: {
    resetForm() {
      this.fApi = this.dataForm;
    },
    submit() {
      this.fApi.submit((formData, $f) => {
        alert(JSON.stringify(formData));
      });
    },
    //重置表单值
    reset() {
      var $f = this.fApi;
      console.log("初始化表单", $f);
      // this.$emit("resetTemp");
      var temp = {
        id: 0,
        name_1: "",
        data_quality_input: "",
        data_quality_bam: "",
        data_quality_bam_input: "",
        data_Quality_uniq_bam: "",
        data_Quality_uniq_nodup_bam: "",
        data_Quality_uniq_nodup_bam_input: "",
        coverage: "",
        sequence_id: "",
        batch: "",
      };
      $f.setValue(temp);
      $f.refresh(true); //清空组件缓存
    },
    //刷新表单
    refreshValue() {
      var $f = this.fApi;
      console.log("刷新值", $f);
      $f.setValue(this.dataForm);
      $f.reload();
    },
    //销毁表单
    destroyForm() {
      console.log("销毁");
      this.fApi.destroy();
      // this.fApi.reload();
    },
    createDataOne() {
      this.fApi.submit((formData, $f) => {
        // alert(JSON.stringify(formData));
        // this.temp = JSON.stringify(formData);
        formData.author_id = 1; //todo 暂时写死，需要获取当前用户的id
        formData.timestamp = new Date();
        createArticle(formData).then(() => {
          this.$emit("getList");
          this.$notify({
            title: "Success",
            message: "Created Successfully",
            type: "success",
            duration: 2000,
          });
          // $f.destroy();
          // this.getList();
        });
      });
    },
    updateDataOne() {
      this.fApi.submit((formData, $f) => {
        const tempData = Object.assign({}, formData);
        tempData.date = new Date(tempData.date);
        console.log("aaa", tempData);
        tempData.timestamp = new Date(); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        // console.log("时间", tempData.timestamp, this.temp.timestamp);
        updateArticle(tempData).then(() => {
          // const index = this.list.findIndex((v) => v.id === this.dataForm.id);
          // this.list.splice(index, 1, this.temp);
          // this.dialogFormVisible = false;
          this.$emit("getList");
          this.$notify({
            title: "Success",
            message: "Update Successfully",
            type: "success",
            duration: 2000,
          });
          // this.getList();
        });
      });
    },
  },
};
</script>
<style scoped>
.el-input__inner {
  height: 36px;
  line-height: 36px;
  width: 100px;
}
</style>
