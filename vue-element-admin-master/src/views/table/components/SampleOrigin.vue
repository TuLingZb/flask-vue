<template>
  <el-card :body-style="{}" shadow="always" class="card" style="backgroud-color:gray">
    <el-table ref="multipleTable" :key="tableKey" v-loading="false" :data="current_list" border fit highlight-current-row style="width: 98%;" max-height=" 80%" @sort-change="sortChange" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column min-width='100px' type="selection" align="center"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column label="SequenceID" prop="id" sortable="custom" align="center" width="180px" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.sequence_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测序批次" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收样日期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.collected_date | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="GaoLabID" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gao_lab_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.introduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="样品来源" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sample_origin }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Title" min-width="400px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.sequence_id }}</span>
          <el-tag>{{ row.sequence_id | typeFilter }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作人" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author.username }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- </el-container> -->
</template>

<script>
import {
  fetchArticle,
  fetchPv,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/api/article";
// import myForm from "@/views/table/inline-edit-table";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import role from "mock/role";
import request from "@/utils/request";
// import FixedThead from "./dynamic-table/components/FixedThead";
// import FixedTheadCopy from "./dynamic-table/components/FixedTheadCopy";
// import MyForms from "./components/MyForms";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  props: ["current_list"],
  data() {
    return {
      sample_information: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        batch: "",
        collected_date: new Date(),
        introduction: "",
        sample_origin: "",
        sequence_id: "",
        id: "",
        // status: "published",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        sequence_id: [
          {
            required: true,
            message: "SequenceID is required",
            trigger: "blur",
          },
        ],
        collected_date: [
          {
            type: "date",
            required: false,
            message: "collected_date is required",
            trigger: "change",
          },
        ],
        batch: [
          { required: true, message: "batch is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      console.log("获取数据");
      this.listLoading = true;
      // fetchArticle(this.sequence_id).then((response) => {
      //   console.log(response.data);
      //   this.list = response.data.items;
      //   // this.total = response.data.total;

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false;
      //   }, 1.5 * 1000);
      // });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.sample_information = true;
      this.$message({
        message: "操作Success",
        type: "error",
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: Number(new Date()),
        title: "",
        status: "published",
        type: "",
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.author_id = 1; //todo 暂时写死，需要获取当前用户的id
          this.temp.timestamp = new Date();
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
            // this.getList();
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);

          tempData.timestamp = new Date(); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // console.log("时间", tempData.timestamp, this.temp.timestamp);
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
            this.getList();
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$swal({
        // title: "Are you sure?",
        text: "是否删除 [ " + row.sequence_id + " ]",
        type: "warning",
        showCancelButton: true,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "删除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.value) {
          // const path = `/vue-element-admin/sequences/delete/${row.sequence_id}`;
          deleteArticle(row.sequence_id)
            .then((response) => {
              // handle success
              // this.$swal(
              //   "Deleted",
              //   "You successfully deleted this post",
              //   "success"
              // );
              this.$notify({
                title: "Success",
                message: "Delete Successfully",
                type: "success",
                duration: 2000,
              });
              this.list.splice(index, 1);
              // this.$toasted.success('Successed delete the post.', { icon: 'fingerprint' })
              this.getList(); //重新查询列表
            })
            .catch((error) => {
              // handle error
              console.log(error.response.data);
              this.$notify({
                title: "Failed",
                message: "Delete failed",
                type: "error",
                duration: 2000,
              });
            });
        } else {
          // this.$swal("Cancelled", "The post is safe :)", "error");
          this.$notify({
            title: "Canceled",
            message: "Delete canceled",
            type: "warning",
            duration: 2000,
          });
        }
      });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    // handleDownload() {
    //   this.downloadLoading = true;
    //   import("@/vendor/Export2Excel").then((excel) => {
    //     const tHeader = ["timestamp", "title", "type", "importance", "status"];
    //     const filterVal = [
    //       "timestamp",
    //       "title",
    //       "type",
    //       "importance",
    //       "status",
    //     ];
    //     const data = this.formatJson(filterVal);
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: "table-list",
    //     });
    //     this.downloadLoading = false;
    //   });
    // },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
          const filterVal = [
            "id",
            "title",
            "author",
            "pageviews",
            "display_time",
          ];
          const list = this.multipleSelection;
          console.log("选择的列表", list);
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "测试",
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "Please select at least one item",
          type: "warning",
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // formatJson(filterVal) {
    //   return this.list.map((v) =>
    //     filterVal.map((j) => {
    //       if (j === "timestamp") {
    //         return parseTime(v[j]);
    //       } else {
    //         return v[j];
    //       }
    //     })
    //   );
    // },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
<style lang="scss" scoped>
.el-card {
  width: 98%;
  margin: 15px;
  // height: 90%;
  // background-color: #d4e5f7;
}
.el-divider--horizontal {
  margin: -5px 0px 4px 0px;
  width: 98%;
  background: 0 0;
  border-top: 1px dashed #e8eaec;
}
.el-form-item label:after {
  content: "";
  display: inline-block;
  width: 100%;
}

.el-form-item__label {
  text-align: justify;
  height: 50px;
}

.el-form-item.is-required .el-form-item__label:before {
  content: none !important;
}
.sweetAlert {
  width: 70px;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: rgb(43, 145, 185);
  line-height: 60px;
}
</style>
