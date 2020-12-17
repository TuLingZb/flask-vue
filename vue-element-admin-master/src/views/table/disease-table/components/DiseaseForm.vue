<template>
  <el-form :inline="true" ref="dataForm" :model="temp" :rules="rules" label-width="110px" class="demo-ruleForm" size="medium">
    <el-form-item label="疾病类型" prop="disease_type">
      <el-input v-model.number="temp.disease_type" maxlength="20" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="就诊年龄" prop="age">
      <el-input v-model="temp.age" maxlength="20" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="抽血日期" prop="collected_date">
      <el-date-picker v-model="temp.collected_date" type="date" placeholder="Please pick a date" style="width:195px" />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-input v-model="temp.type" maxlength="20" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="TNM" prop="tnm">
      <el-input v-model="temp.tnm" maxlength="20" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="分期" prop="period">
      <el-input v-model="temp.period" maxlength="20" show-word-limit />
    </el-form-item>
    <el-form-item label="病理免疫组化" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.pathological_immunohistochemistry" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="手术日期" prop="pathological_immunohistochemistry">
      <el-date-picker v-model="temp.operation_date" type="date" placeholder="Please pick a date" style="width:195px" />
    </el-form-item>
    <el-form-item label="病理完整信息" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.pathological_information" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="分型" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.Typing" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="高血压" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.hypertension" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="糖尿病" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.diabetes" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="既往肿瘤病史" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.history_of_cancer" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px" placeholder="若有,请注明肿瘤类型"></el-input>
    </el-form-item>
    <el-form-item label="系统疾病" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.systemic_diseases" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>

    <el-form-item label="家族史" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.family_history" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="抗病毒治疗" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.antiviral_therapy" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="术前肿瘤治疗情况" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.preoperative_tumor_treatment" type="textarea" :autosize="{ minRows: 4, maxRows: 5}" maxlength="100" show-word-limit style="width:195px" placeholder="射频、TACE等"></el-input>
    </el-form-item>
    <el-form-item label="高血脂" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.blood_lipids" type="textarea" :autosize="{ minRows: 4, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="生化指标" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.biochemical_indicators" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="淋巴细胞" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.lymphocyte" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="中性粒细胞" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.Neutrophils" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="术前AFP" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.after_AEP" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="术前CEA" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.after_CEA" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="术前CA19-9" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.after_CA19_9" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="HBV-DNA" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.HBV_DNA" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="乙肝表面抗原" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.hepatitis_B_surface_antigen" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="表面抗体" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.surface_antibody" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="e抗原" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.E_antigen" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="e抗体" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.E_antibody" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="核心抗体" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.core_antibody" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="吸烟" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.smoking" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
    <el-form-item label="治疗情况" prop="pathological_immunohistochemistry">
      <el-input v-model="temp.treatment" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="100" show-word-limit style="width:195px"></el-input>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  components: {},
  props: {
    // 这个 prop 属性接收父组件传递进来的值
    formData: Object,
  },
  data() {
    return {
      temp: {
        collected_date: new Date(),
        age: "",
        disease_type: "",
        type: "",
        TNM: "",
        period: "",
        pathological_immunohistochemistry: "",
        operation_date: "",
        pathological_information: "",
        Typing: "",
        hypertension: "",
        diabetes: "",
        history_of_cancer: "",
        systemic_diseases: "",
        family_history: "",
        antiviral_therapy: "",
        preoperative_tumor_treatment: "",
        blood_lipids: "TC: \nTG: \nLDL-C: \nHDL-C:",
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
        smoking: "",
        treatment: "",
        timestamp: "",
      },
      dialogFormVisible: false,
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
    };
  },
  mounted() {
    // props 是单向数据流，通过触发 update 事件绑定 formData，
    // 将 data 里的 form 指向父组件通过 formData 绑定的那个对象
    // 父组件在绑定 formData 的时候，需要加上 .sync
    this.$emit("update:formData", this.temp);
  },
};
</script>