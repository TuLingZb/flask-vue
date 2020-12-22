<template>
  <!-- <div class="app-container"> -->
  <el-card :body-style="{}" shadow="always" class="card">
    <div class="search" style="padding: 5px 0px">
      <div class="filter-container" style="margin-top:-10px;padding:0px;">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-right: 10px;" @click="handleFilter">
          搜索
        </el-button>
        <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px;margin-right: 10px;" class="filter-item">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px;margin-right: 10px;">
          <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
        </el-select>
        <el-select v-model="listQuery.sort" style="width: 140px;margin-right: 10px;" class="filter-item" @change="handleFilter">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </div>
      <el-divider>
      </el-divider>
      <div class="" style="height:40px;padding:0px;">
        <el-button class="filter-item" type="primary" icon="el-icon-circle-plus" style="margin-right: 10px;" @click="handleCreate">
          新增
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" style="margin-right: 10px;margin-left: 0px;" @click="handleDownload">
          导出
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-upload2" style="margin-right: 10px;margin-left: 0px;" @click="dialogExcelVisible = true">
          导入
        </el-button>
        <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
          reviewer
        </el-checkbox> -->
      </div>
    </div>

    <el-table ref="multipleTable" :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 98%;" max-height=" 80%" @sort-change="sortChange" element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
      <el-table-column min-width='100px' type="selection" align="center"></el-table-column>
      <el-table-column v-if="true" label="id" prop="id" sortable="custom" width="110px" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就诊年龄" prop="age" sortable="custom" align="center" width="180px">
        <template slot-scope="{row}">
          <span>{{ row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="病理完整信息" width="500px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.pathological_information }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进展" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.process }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分型" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Typing }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分级" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Class }}</span>
        </template>
      </el-table-column>
      <el-table-column label="病理免疫组化" width="300px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.pathological_immunohistochemistry }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TNM" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tnm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.period }}</span>
        </template>
      </el-table-column>
      <el-table-column label="亚型/部位" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Subtype }}</span>
        </template>
      </el-table-column>

      <el-table-column label="抽血日期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.collected_date | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手术日期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operation_date | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="术前肿瘤治疗情况（射频、TACE等）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.preoperative_tumor_treatment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主诉" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Chief_complaint }}</span>
        </template>
      </el-table-column>
      <el-table-column label="饮酒（包括频度、种类、量）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.drinking }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高血压" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hypertension }}</span>
        </template>
      </el-table-column>
      <el-table-column label="糖尿病" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.diabetes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="吸烟史" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.smoking }}</span>
        </template>
      </el-table-column>
      <el-table-column label="既往肿瘤病史(若有，注明肿瘤类型)" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.history_of_cancer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统疾病" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.systemic_diseases }}</span>
        </template>
      </el-table-column>
      <el-table-column label="家族史" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.family_history }}</span>
        </template>
      </el-table-column>
      <el-table-column label="抗病毒治疗" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.antiviral_therapy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高血脂(TC、TG、LDL-C、HDL-C)" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.blood_lipids }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生化指标" width="500px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.biochemical_indicators }}</span>
        </template>
      </el-table-column>
      <el-table-column label="淋巴细胞" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.lymphocyte }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中性粒细胞" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Neutrophils }}</span>
        </template>
      </el-table-column>
      <el-table-column label="术前AFP" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.after_AEP }}</span>
        </template>
      </el-table-column>
      <el-table-column label="术前CEA" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.after_CEA }}</span>
        </template>
      </el-table-column>
      <el-table-column label="术前CA19-9" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.after_CA19_9 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HBV-DNA" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.HBV_DNA }}</span>
        </template>
      </el-table-column>
      <el-table-column label="乙肝表面抗原" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hepatitis_B_surface_antigen }}</span>
        </template>
      </el-table-column>
      <el-table-column label="表面抗体" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.surface_antibody }}</span>
        </template>
      </el-table-column>
      <el-table-column label="e抗原" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.E_antigen }}</span>
        </template>
      </el-table-column>
      <el-table-column label="e抗体" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.E_antibody }}</span>
        </template>
      </el-table-column>
      <el-table-column label="核心抗体" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.core_antibody }}</span>
        </template>
      </el-table-column>
      <el-table-column label="丙肝" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hcv }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HCV-Ab" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.HCV_Ab }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HCV-RNA" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.HCV_RNA }}</span>
        </template>
      </el-table-column>
      <el-table-column label="甲状腺+" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.thyroid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总胆红素" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.total_bilirubin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="白蛋白" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.albumin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="凝血酶原时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prothrombin_time | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="肝性脑病" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hepatic_encephalopathy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Child-Pugh" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Child_Pugh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="腹水" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ascites }}</span>
        </template>
      </el-table-column>
      <el-table-column label="术后化疗" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Postoperative_chemotherapy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发现复发时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Recurrence_time | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="靶向药物治疗（注明药物）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Targeted_drug_therapy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="体内放疗（放射性粒子植入）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Postoperative_chemotherapy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="射频治疗" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Radiofrequency_therapy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手术治疗" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.surgical_treatment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="死亡时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Time_of_death | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="术后异常" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Postoperative_abnormalities }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存活时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.survival_time | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="术前肠镜" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Preoperative_colonoscopy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="肠镜病理" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Colonoscopy_pathology }}</span>
        </template>
      </el-table-column>
      <el-table-column label="肝转移" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Liver_metastasis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个数" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大径（最大径和）（mm）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.max_diameter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小（mm）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.diameter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子灶" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sub_stove }}</span>
        </template>
      </el-table-column>
      <el-table-column label="肉眼癌栓" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Macroscopic_tumor_thrombus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="癌栓位置" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Location_of_tumor_thrombus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包膜" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.envelope }}</span>
        </template>
      </el-table-column>
      <el-table-column label="坏死" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.necrosis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="肝外侵犯（写明部位）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Extrahepatic_nvasion }}</span>
        </template>
      </el-table-column>
      <el-table-column label="镜下包膜有无突破" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Capsule_breakthrough }}</span>
        </template>
      </el-table-column>
      <el-table-column label="镜下多灶性生长" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Multifocal_growth_under_microscope }}</span>
        </template>
      </el-table-column>
      <el-table-column label="镜下子灶" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Mirror_sub_stove }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微血管癌栓" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Microvascular_tumor_thrombus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="肝硬化" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cirrhosis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="肝炎" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hepatitis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BCLC" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.BCLC }}</span>
        </template>
      </el-table-column>
      <el-table-column label="UICC" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.UICC }}</span>
        </template>
      </el-table-column>
      <el-table-column label="术后TACE（注明治疗次数）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Postoperative_TACE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="术后抗病毒治疗（注明药物）" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Antiviral_therapy_after_operation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PSA" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.PSA }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Lauren分类" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Lauren_classification }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remarks }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Title" min-width="400px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.sequence_id }}</span>
          <el-tag>{{ row.sequence_id | typeFilter }}</el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="操作人" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author.username }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Imp" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row,$index}">
          <el-button type="primary" class="el-icon-edit" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" class="el-icon-document" type="primary" @click="handleModifyStatus(row,'published')">
            详情
          </el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <disease-info ref="unfixedthead" :dataForm="temp" :dialogStatus="dialogStatus" @getList="getList" @resetTemp="resetTemp" />
    </el-dialog>
    <el-drawer title="样本信息详情" :with-header="false" :visible.sync="sample_information" direction="rtl" size="60%">
      <!-- <el-container style="padding:0px;"> -->
      <el-header style="text-align: left; font-size: 20px;vertical-align:middle">
        <!-- <i class="el-icon-list" style="margin-right: 15px"></i> -->
        <svg-icon icon-class="table" style="margin-right: 15px" />
        <span style="">样本信息详情</span>
      </el-header>
      <el-divider>
      </el-divider>
      <el-row>
        <el-col :span="24">
          <div class="" style="margin:20px 25px">样本信息</div>
        </el-col>
        <my-forms v-bind:current_list="current_list" />
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="" style="margin:20px 25px">患病详情</div>
        </el-col>
        <my-forms v-bind:current_list="current_list" />
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="" style="margin:20px 25px">病人信息</div>
        </el-col>
        <my-forms v-bind:current_list="current_list" />
      </el-row>
      <!-- </el-container> -->
    </el-drawer>
    <el-dialog :visible.sync="dialogExcelVisible">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </el-dialog>
  </el-card>
</template>


<script>
import {
  fetchList,
  createArticle,
  updateArticle,
  deleteArticle,
  fetchArticle,
  importExcel,
} from "@/api/disease";
// import myForm from "@/views/table/inline-edit-table";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import role from "mock/role";
import request from "@/utils/request";
// import FixedThead from "./dynamic-table/components/FixedThead";
// import FixedTheadCopy from "./dynamic-table/components/FixedTheadCopy";
import MyForms from "../components/MyForms";
// import DiseaseForm from "./components/DiseaseForm";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import DiseaseInfo from "../components/DiseaseInfo";

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
  components: { Pagination, MyForms, UploadExcelComponent, DiseaseInfo },
  directives: { waves }, //todo directives
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
  data() {
    var checkAge = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      }
    };
    return {
      tableData: [],
      tableHeader: [],
      current_list: [],
      sample_information: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      //搜索字段
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
      //表单字段初始值
      temp: {
        id: "",
        age: "",
        pathological_information: "",
        process: "",
        Typing: "",
        Class: "",
        pathological_immunohistochemistry: "",
        tnm: "",
        period: "",
        period: "",
        operationed: "",
        collected_date: "",
        operation_date: "",
        preoperative_tumor_treatment: "",
        disease_type: "",
        disease_type: "",
        hypertension: "",
        diabetes: "",
        smoking: "",
        history_of_cancer: "",
        systemic_diseases: "",
        family_history: "",
        antiviral_therapy: "",
        blood_lipids: "",
        biochemical_indicators: "",
        lymphocyte: "",
        Neutrophils: "",
        after_AEP: "",
        after_CEA: "",
        after_CA19_9: "",
        HBV_DNA: "",
        hepatitis_B_surface_antigen: "",
        surface_antibody: "",
        E_antigen: "",
        E_antibody: "",
        core_antibody: "",
        hcv: "",
        HCV_Ab: "",
        HCV_RNA: "",
        thyroid: "",
        total_bilirubin: "",
        albumin: "",
        prothrombin_time: "",
        hepatic_encephalopathy: "",
        ascites: "",
        Child_Pugh: "",
        Postoperative_chemotherapy: "",
        Recurrence_time: "",
        Targeted_drug_therapy: "",
        internal: "",
        Radiofrequency_therapy: "",
        surgical_treatment: "",
        Time_of_death: "",
        Postoperative_abnormalities: "",
        survival_time: "",
        Preoperative_colonoscopy: "",
        Colonoscopy_pathology: "",
        Liver_metastasis: "",
        number: "",
        max_diameter: "",
        diameter: "",
        sub_stove: "",
        Macroscopic_tumor_thrombus: "",
        Location_of_tumor_thrombus: "",
        envelope: "",
        necrosis: "",
        Extrahepatic_nvasion: "",
        Capsule_breakthrough: "",
        Multifocal_growth_under_microscope: "",
        Mirror_sub_stove: "",
        Microvascular_tumor_thrombus: "",
        cirrhosis: "",
        hepatitis: "",
        BCLC: "",
        UICC: "",
        Postoperative_TACE: "",
        Antiviral_therapy_after_operation: "",
        PSA: "",
        Lauren_classification: "",
        remarks: "",
        treatment: "",
        timestamp: "",
        deleted: "",
      },
      dialogFormVisible: false,
      dialogExcelVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        age: [
          {
            validator: checkAge,
            trigger: "blur",
          },
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
      this.dialogFormVisible = false;
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      fetchDisease(row.sequence_id).then((response) => {
        console.log("响应完成", response.data);
        this.current_list = response.data;
        console.log("传递给子组件", this.current_list);
        this.sample_information = true;
        // this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
      // this.$message({
      //   message: "操作Success",
      //   type: "error",
      // });
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
        id: 0,
        collected_date: new Date(),
        age: 0,
        disease_type: " ",
        type: " ",
        TNM: " ",
        period: " ",
        pathological_immunohistochemistry: " ",
        operation_date: new Date(),
        pathological_information: " ",
        Typing: " ",
        hypertension: "ssss",
        diabetes: " ",
        history_of_cancer: " ",
        systemic_diseases: " ",
        family_history: " ",
        antiviral_therapy: " ",
        preoperative_tumor_treatment: " ",
        blood_lipids: " ",
        biochemical_indicators: " ",
        lymphocyte: " ",
        Neutrophils: " ",
        after_AEP: " ",
        after_CEA: "",
        after_CA19_9: " ",
        HBV_DNA: " ",
        hepatitis_B_surface_antigen: " ",
        surface_antibody: " ",
        E_antigen: " ",
        E_antibody: " ",
        core_antibody: " ",
        smoking: " ",
        treatment: " ",
        timestamp: new Date(),
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.unfixedthead.reset();
      });
    },
    createData() {
      // this.$refs["dataForm"].validate((valid) => {
      //   console.log("dsadsa", valid);
      //   if (valid) {
      createArticle(this.temp).then(() => {
        this.list.unshift(this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: "Success",
          message: "Created Successfully",
          type: "success",
          duration: 2000,
        });
        this.getList();
      });
      // } else {
      //   console.log("shibai");
      //   this.$message({
      //     // title: "Fail",
      //     message: "表单数据类型错误",
      //     type: "warning",
      //     duration: 2000,
      //   });
      // }
      // });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.collected_date = new Date(this.temp.collected_date);
      this.temp.operation_date = new Date(this.temp.operation_date);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.unfixedthead.refreshValue();
      });
    },
    updateData() {
      // this.$refs["dataForm"].validate((valid) => {
      // if (valid) {
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
      // }
      // });
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
          deleteArticle(row.id)
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
          // this.$swal("取消led", "The post is safe :)", "error");
          this.$notify({
            title: "取消",
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
    beforeUpload(file) {
      //上传文件之前的检查文件是否大于1M
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      //文件解析成功后获取文件数据
      this.dialogExcelVisible = false;
      this.$notify({
        title: "导入中",
        message: "导入需等待一段时间",
        type: "warning",
        duration: 2000,
      });
      this.tableData = results;
      this.tableHeader = header;
      console.log("excelshuj", results);
      let data = { data: this.tableData, header: this.tableHeader };
      importExcel(data).then(() => {
        // this.list.unshift(this.temp);
        // this.dialogFormVisible = false;
        this.$notify({
          title: "Success",
          message: "Import Successfully",
          type: "success",
          duration: 2000,
        });
        this.getList();
      });
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
