<template>
  <div id="app1">
    <form-create v-model="fApi" :rule="rule" :option="options"></form-create>
    <el-button @click="dialogFormVisible = false">
      取消
    </el-button>
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
} from "@/api/patient";
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
          type: "input",
          title: "姓名",
          field: "name",
          value: this.dataForm.name,
          col: {
            span: 20,
          },
          validate: [
            { required: true, message: "请输入姓名", trigger: "blur" },
          ],
        },
        {
          type: "input",
          title: "病历号",
          field: "case_number",
          value: this.dataForm.case_number,
          col: {
            span: 20,
          },
        },
        {
          type: "select",
          field: "sex",
          title: "性别",
          value: this.dataForm.sex,
          options: [
            { value: "男", label: "男", disabled: false },
            { value: "女", label: "女", disabled: false },
          ],
          props: {
            multiple: false,
            placeholder: "选择",
            autocomplete: "on",
          },
          col: {
            span: 7,
          },
          validate: [
            { required: true, message: "请选择性别", trigger: "blur" },
          ],
        },
        {
          type: "DatePicker",
          title: "出生日期",
          field: "date",
          value: this.dataForm.date,
          props: {
            type: "date",
            format: "yyyy-MM-dd",
            placeholder: "请选择活动日期",
            defaultValue: new Date(),
          },
          col: {
            span: 12,
            offset: 1,
          },
        },
        {
          type: "input",
          title: "家庭地址",
          field: "address",
          value: this.dataForm.address,
          props: {
            type: "textarea",
            maxlength: 255,
            "show-word-limit": true,
          },
          col: {
            span: 20,
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
        date: new Date(),
        name: "",
        case_number: "",
        address: "",
        sex: "男",
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
