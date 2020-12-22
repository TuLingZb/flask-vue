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
import { fetchList, createArticle, updateArticle } from "@/api/disease";
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
          title: "就诊年龄",
          field: "age",
          value: this.dataForm.sequence_id,
          props: {
            precision: 0,
            controls: false,
            placeholder: "请输入就诊年龄",
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
          title: "病理完整信息",
          field: "pathological_information",
          value: this.dataForm.pathological_information,
          col: {
            span: 20,
          },
          props: {
            type: "textarea",
            maxlength: 1000,
            "show-word-limit": true,
          },
        },
        {
          type: "input",
          title: "进展",
          field: "process",
          value: this.dataForm.process,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "分型",
          field: "Typing",
          value: this.dataForm.Typing,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "分级",
          field: "Class",
          value: this.dataForm.Class,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "病理免疫组化",
          field: "pathological_immunohistochemistry",
          value: this.dataForm.pathological_immunohistochemistry,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "TNM",
          field: "tnm",
          value: this.dataForm.tnm,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "分期",
          field: "period",
          value: this.dataForm.period,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "亚型/部位",
          field: "period",
          value: this.dataForm.period,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "术前术后",
          field: "operationed",
          value: this.dataForm.operationed,
          col: {
            span: 20,
          },
        },
        {
          type: "DatePicker",
          title: "抽血日期",
          field: "collected_date",
          value: this.dataForm.collected_date,
          col: {
            span: 20,
          },
          props: {
            type: "date",
            format: "yyyy-MM-dd",
            placeholder: "请选择日期",
            defaultValue: new Date(),
          },
        },
        {
          type: "DatePicker",
          title: "手术日期",
          field: "operation_date",
          value: this.dataForm.operation_date,
          col: {
            span: 20,
          },
          props: {
            type: "date",
            format: "yyyy-MM-dd",
            placeholder: "请选择日期",
            defaultValue: new Date(),
          },
        },
        {
          type: "input",
          title: "术前肿瘤治疗情况",
          field: "preoperative_tumor_treatment",
          value: this.dataForm.preoperative_tumor_treatment,
          col: {
            span: 20,
          },
          props: {
            placeholder: "射频、TACE等",
          },
        },
        {
          type: "input",
          title: "主诉",
          field: "disease_type",
          value: this.dataForm.Chief_complaint,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "饮酒",
          field: "drinking",
          value: this.dataForm.drinking,
          col: {
            span: 20,
          },
          props: {
            placeholder: "包括频度、种类、量",
          },
        },
        {
          type: "input",
          title: "高血压",
          field: "hypertension",
          value: this.dataForm.hypertension,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "糖尿病",
          field: "diabetes",
          value: this.dataForm.diabetes,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "吸烟史",
          field: "smoking",
          value: this.dataForm.smoking,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "既往肿瘤病史",
          field: "history_of_cancer",
          value: this.dataForm.history_of_cancer,
          col: {
            span: 20,
          },
          props: {
            placeholder: "若有，注明肿瘤类型",
          },
        },
        {
          type: "input",
          title: "系统疾病",
          field: "systemic_diseases",
          value: this.dataForm.systemic_diseases,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "家族史",
          field: "family_history",
          value: this.dataForm.family_history,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "抗病毒治疗",
          field: "antiviral_therapy",
          value: this.dataForm.antiviral_therapy,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "高血脂",
          field: "blood_lipids ",
          value: this.dataForm.blood_lipids,
          col: {
            span: 20,
          },
          props: {
            placeholder: "TC、TG、LDL-C、HDL-C",
          },
        },
        {
          type: "input",
          title: "生化指标",
          field: "biochemical_indicators",
          value: this.dataForm.biochemical_indicators,
          col: {
            span: 20,
          },
          rops: {
            type: "textarea",
            maxlength: 1000,
            "show-word-limit": true,
          },
        },
        {
          type: "input",
          title: "淋巴细胞",
          field: "lymphocyte",
          value: this.dataForm.lymphocyte,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "中性粒细胞",
          field: "Neutrophils",
          value: this.dataForm.Neutrophils,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "术前AFP",
          field: "after_AEP",
          value: this.dataForm.after_AEP,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "术前CEA",
          field: "after_CEA",
          value: this.dataForm.after_CEA,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "术前CA19-9",
          field: "after_CA19_9",
          value: this.dataForm.after_CA19_9,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "HBV-DNA",
          field: "HBV_DNA",
          value: this.dataForm.HBV_DNA,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "乙肝表面抗原",
          field: "hepatitis_B_surface_antigen",
          value: this.dataForm.hepatitis_B_surface_antigen,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "表面抗体",
          field: "surface_antibody",
          value: this.dataForm.surface_antibody,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "e抗原",
          field: "E_antigen",
          value: this.dataForm.E_antigen,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "e抗体",
          field: "E_antibody",
          value: this.dataForm.E_antibody,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "核心抗体",
          field: "core_antibody",
          value: this.dataForm.core_antibody,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "丙肝",
          field: "hcv",
          value: this.dataForm.hcv,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "HCV-Ab",
          field: "HCV_Ab",
          value: this.dataForm.HCV_Ab,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "HCV-RNA",
          field: "HCV_RNA",
          value: this.dataForm.HCV_RNA,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "甲状腺+",
          field: "thyroid",
          value: this.dataForm.thyroid,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "总胆红素",
          field: "total_bilirubin",
          value: this.dataForm.total_bilirubin,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "白蛋白",
          field: "albumin",
          value: this.dataForm.albumin,
          col: {
            span: 20,
          },
        },
        {
          type: "DatePicker",
          title: "凝血酶原时间",
          field: "prothrombin_time",
          value: this.dataForm.prothrombin_time,
          col: {
            span: 20,
          },
          props: {
            type: "date",
            format: "yyyy-MM-dd",
            placeholder: "请选择日期",
            defaultValue: new Date(),
          },
        },
        {
          type: "input",
          title: "肝性脑病",
          field: "hepatic_encephalopathy",
          value: this.dataForm.hepatic_encephalopathy,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "腹水",
          field: "ascites",
          value: this.dataForm.ascites,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "Child-Pugh",
          field: "Child_Pugh",
          value: this.dataForm.Child_Pugh,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "术后化疗",
          field: "Postoperative_chemotherapy",
          value: this.dataForm.Postoperative_chemotherapy,
          col: {
            span: 20,
          },
        },
        {
          type: "DatePicker",
          title: "发现复发时间",
          field: "Recurrence_time",
          value: this.dataForm.Recurrence_time,
          col: {
            span: 20,
          },
          props: {
            type: "date",
            format: "yyyy-MM-dd",
            placeholder: "请选择日期",
            defaultValue: new Date(),
          },
        },
        {
          type: "input",
          title: "靶向药物治疗",
          field: "Targeted_drug_therapy",
          value: this.dataForm.Targeted_drug_therapy,
          col: {
            span: 20,
          },
          props: {
            placeholder: "注明药物",
          },
        },
        {
          type: "input",
          title: "体内放疗",
          field: "internal",
          value: this.dataForm.internal,
          col: {
            span: 20,
          },
          props: {
            placeholder: "放射性粒子植入",
          },
        },
        {
          type: "input",
          title: "射频治疗",
          field: "Radiofrequency_therapy",
          value: this.dataForm.Radiofrequency_therapy,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "手术治疗",
          field: "surgical_treatment",
          value: this.dataForm.surgical_treatment,
          col: {
            span: 20,
          },
        },
        {
          type: "DatePicker",
          title: "死亡时间",
          field: "Time_of_death",
          value: this.dataForm.Time_of_death,
          col: {
            span: 20,
          },
          props: {
            type: "date",
            format: "yyyy-MM-dd",
            placeholder: "请选择日期",
            defaultValue: new Date(),
          },
        },
        {
          type: "input",
          title: "术后异常",
          field: "Postoperative_abnormalities",
          value: this.dataForm.Postoperative_abnormalities,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "存活时间（M）",
          field: "survival_time",
          value: this.dataForm.survival_time,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "术前肠镜",
          field: "Preoperative_colonoscopy",
          value: this.dataForm.Preoperative_colonoscopy,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "肠镜病理",
          field: "Colonoscopy_pathology",
          value: this.dataForm.Colonoscopy_pathology,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "肝转移",
          field: "Liver_metastasis",
          value: this.dataForm.Liver_metastasis,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "个数",
          field: "number",
          value: this.dataForm.number,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "最大径（mm）",
          field: "max_diameter",
          value: this.dataForm.max_diameter,
          col: {
            span: 20,
          },
          props: {
            placeholder: "最大径和",
          },
        },
        {
          type: "input",
          title: "大小（mm）",
          field: "diameter",
          value: this.dataForm.diameter,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "子灶",
          field: "sub_stove",
          value: this.dataForm.sub_stove,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "肉眼癌栓",
          field: "Macroscopic_tumor_thrombus",
          value: this.dataForm.Macroscopic_tumor_thrombus,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "癌栓位置",
          field: "Location_of_tumor_thrombus",
          value: this.dataForm.Location_of_tumor_thrombus,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "包膜",
          field: "envelope",
          value: this.dataForm.envelope,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "坏死",
          field: "necrosis",
          value: this.dataForm.necrosis,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "肝外侵犯",
          field: "Extrahepatic_nvasion",
          value: this.dataForm.Extrahepatic_nvasion,
          col: {
            span: 20,
          },
          props: {
            placeholder: "写明部位",
          },
        },
        {
          type: "input",
          title: "镜下包膜有无突破",
          field: "Capsule_breakthrough",
          value: this.dataForm.Capsule_breakthrough,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "镜下多灶性生长",
          field: "Multifocal_growth_under_microscope",
          value: this.dataForm.Multifocal_growth_under_microscope,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "镜下子灶",
          field: "Mirror_sub_stove",
          value: this.dataForm.Mirror_sub_stove,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "微血管癌栓",
          field: "Microvascular_tumor_thrombus",
          value: this.dataForm.Microvascular_tumor_thrombus,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "肝硬化",
          field: "cirrhosis",
          value: this.dataForm.cirrhosis,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "肝炎",
          field: "hepatitis",
          value: this.dataForm.hepatitis,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "BCLC",
          field: "BCLC",
          value: this.dataForm.BCLC,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "UICC",
          field: "UICC",
          value: this.dataForm.UICC,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "术后TACE",
          field: "Postoperative_TACE",
          value: this.dataForm.Postoperative_TACE,
          col: {
            span: 20,
          },
          props: {
            placeholder: "注明治疗次数",
          },
        },
        {
          type: "input",
          title: "术后抗病毒治疗",
          field: "Antiviral_therapy_after_operation",
          value: this.dataForm.Antiviral_therapy_after_operation,
          col: {
            span: 20,
          },
          props: {
            placeholder: "注明药物",
          },
        },
        {
          type: "input",
          title: "PSA",
          field: "PSA",
          value: this.dataForm.PSA,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "Lauren分类",
          field: "Lauren_classification",
          value: this.dataForm.Lauren_classification,
          col: {
            span: 20,
          },
        },
        {
          type: "input",
          title: "备注",
          field: "remarks",
          value: this.dataForm.remarks,
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
