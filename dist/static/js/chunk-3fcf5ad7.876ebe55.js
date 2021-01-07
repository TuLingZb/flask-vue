(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fcf5ad7"],{"7de8":function(e,t,a){},"8ee6":function(e,t,a){"use strict";var n=a("7de8"),l=a.n(n);l.a},"9d09":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticClass:"card",attrs:{"body-style":{},shadow:"always"}},[a("div",{staticClass:"search",staticStyle:{padding:"5px 0px"}},[a("div",{staticClass:"filter-container",staticStyle:{"margin-top":"-10px",padding:"0px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" 搜索 ")]),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"测序ID"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.sequence_id,callback:function(t){e.$set(e.listQuery,"sequence_id",t)},expression:"listQuery.sequence_id"}}),a("el-select",{staticClass:"filter-item",staticStyle:{width:"90px","margin-right":"10px"},attrs:{placeholder:"疾病类型",clearable:""},model:{value:e.listQuery.disease_type,callback:function(t){e.$set(e.listQuery,"disease_type",t)},expression:"listQuery.disease_type"}},e._l(e.diseaseTypeOptions,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),a("el-divider"),a("div",{staticStyle:{height:"40px",padding:"0px"}},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-circle-plus"},on:{click:e.handleCreate}},[e._v(" 新增 ")]),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px","margin-left":"0px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v(" 导出 ")]),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px","margin-left":"0px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-upload2"},on:{click:function(t){e.dialogExcelVisible=!0}}},[e._v(" 导入 ")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"multipleTable",staticStyle:{width:"98%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"","max-height":" 80%","element-loading-text":"拼命加载中"},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{"min-width":"100px",type:"selection",align:"center"}}),e._e(),a("el-table-column",{attrs:{label:"测序ID",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[Array.isArray(n.sequences)?a("div",e._l(n.sequences,(function(t){return a("p",[e._v(e._s(t)+" ")])})),0):a("span",[e._v(e._s(n.sequences))])]}}])}),a("el-table-column",{attrs:{label:"疾病类型",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.disease_type))])]}}])}),a("el-table-column",{attrs:{label:"就诊年龄",prop:"age",sortable:"custom",align:"center",width:"180px","sort-orders":["ascending","descending"]},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.age))])]}}])}),a("el-table-column",{attrs:{label:"病理完整信息",width:"500px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.pathological_information))])]}}])}),a("el-table-column",{attrs:{label:"进展",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.process))])]}}])}),a("el-table-column",{attrs:{label:"分型",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Typing))])]}}])}),a("el-table-column",{attrs:{label:"分级",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Class))])]}}])}),a("el-table-column",{attrs:{label:"病理免疫组化",width:"300px",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.pathological_immunohistochemistry))])]}}])}),a("el-table-column",{attrs:{label:"TNM",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.tnm))])]}}])}),a("el-table-column",{attrs:{label:"分期",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.period))])]}}])}),a("el-table-column",{attrs:{label:"亚型/部位",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Subtype))])]}}])}),a("el-table-column",{attrs:{label:"抽血日期",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e._f("parseTime")(n.collected_date,"{y}-{m}-{d}")))])]}}])}),a("el-table-column",{attrs:{label:"手术日期",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e._f("parseTime")(n.operation_date,"{y}-{m}-{d}")))])]}}])}),a("el-table-column",{attrs:{label:"术前肿瘤治疗情况（射频、TACE等）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.preoperative_tumor_treatment))])]}}])}),a("el-table-column",{attrs:{label:"主诉",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Chief_complaint))])]}}])}),a("el-table-column",{attrs:{label:"饮酒（包括频度、种类、量）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.drinking))])]}}])}),a("el-table-column",{attrs:{label:"高血压",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.hypertension))])]}}])}),a("el-table-column",{attrs:{label:"糖尿病",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.diabetes))])]}}])}),a("el-table-column",{attrs:{label:"吸烟史",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.smoking))])]}}])}),a("el-table-column",{attrs:{label:"既往肿瘤病史(若有，注明肿瘤类型)",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.history_of_cancer))])]}}])}),a("el-table-column",{attrs:{label:"系统疾病",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.systemic_diseases))])]}}])}),a("el-table-column",{attrs:{label:"家族史",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.family_history))])]}}])}),a("el-table-column",{attrs:{label:"抗病毒治疗",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.antiviral_therapy))])]}}])}),a("el-table-column",{attrs:{label:"高血脂(TC、TG、LDL-C、HDL-C)",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.blood_lipids))])]}}])}),a("el-table-column",{attrs:{label:"生化指标",width:"500px",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.biochemical_indicators))])]}}])}),a("el-table-column",{attrs:{label:"淋巴细胞",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.lymphocyte))])]}}])}),a("el-table-column",{attrs:{label:"中性粒细胞",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Neutrophils))])]}}])}),a("el-table-column",{attrs:{label:"术前AFP",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.after_AEP))])]}}])}),a("el-table-column",{attrs:{label:"术前CEA",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.after_CEA))])]}}])}),a("el-table-column",{attrs:{label:"术前CA19-9",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.after_CA19_9))])]}}])}),a("el-table-column",{attrs:{label:"HBV-DNA",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.HBV_DNA))])]}}])}),a("el-table-column",{attrs:{label:"乙肝表面抗原",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.hepatitis_B_surface_antigen))])]}}])}),a("el-table-column",{attrs:{label:"表面抗体",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.surface_antibody))])]}}])}),a("el-table-column",{attrs:{label:"e抗原",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.E_antigen))])]}}])}),a("el-table-column",{attrs:{label:"e抗体",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.E_antibody))])]}}])}),a("el-table-column",{attrs:{label:"核心抗体",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.core_antibody))])]}}])}),a("el-table-column",{attrs:{label:"丙肝",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.hcv))])]}}])}),a("el-table-column",{attrs:{label:"HCV-Ab",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.HCV_Ab))])]}}])}),a("el-table-column",{attrs:{label:"HCV-RNA",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.HCV_RNA))])]}}])}),a("el-table-column",{attrs:{label:"甲状腺+",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.thyroid))])]}}])}),a("el-table-column",{attrs:{label:"总胆红素",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.total_bilirubin))])]}}])}),a("el-table-column",{attrs:{label:"白蛋白",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.albumin))])]}}])}),a("el-table-column",{attrs:{label:"凝血酶原时间",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e._f("parseTime")(n.prothrombin_time,"{y}-{m}-{d}")))])]}}])}),a("el-table-column",{attrs:{label:"肝性脑病",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.hepatic_encephalopathy))])]}}])}),a("el-table-column",{attrs:{label:"Child-Pugh",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Child_Pugh))])]}}])}),a("el-table-column",{attrs:{label:"腹水",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.ascites))])]}}])}),a("el-table-column",{attrs:{label:"术后化疗",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Postoperative_chemotherapy))])]}}])}),a("el-table-column",{attrs:{label:"发现复发时间",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e._f("parseTime")(n.Recurrence_time,"{y}-{m}-{d}")))])]}}])}),a("el-table-column",{attrs:{label:"靶向药物治疗（注明药物）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Targeted_drug_therapy))])]}}])}),a("el-table-column",{attrs:{label:"体内放疗（放射性粒子植入）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Postoperative_chemotherapy))])]}}])}),a("el-table-column",{attrs:{label:"射频治疗",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Radiofrequency_therapy))])]}}])}),a("el-table-column",{attrs:{label:"手术治疗",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.surgical_treatment))])]}}])}),a("el-table-column",{attrs:{label:"死亡时间",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e._f("parseTime")(n.Time_of_death,"{y}-{m}-{d}")))])]}}])}),a("el-table-column",{attrs:{label:"术后异常",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Postoperative_abnormalities))])]}}])}),a("el-table-column",{attrs:{label:"存活时间",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e._f("parseTime")(n.survival_time,"{y}-{m}-{d}")))])]}}])}),a("el-table-column",{attrs:{label:"术前肠镜",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Preoperative_colonoscopy))])]}}])}),a("el-table-column",{attrs:{label:"肠镜病理",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Colonoscopy_pathology))])]}}])}),a("el-table-column",{attrs:{label:"肝转移",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Liver_metastasis))])]}}])}),a("el-table-column",{attrs:{label:"个数",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.number))])]}}])}),a("el-table-column",{attrs:{label:"最大径（最大径和）（mm）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.max_diameter))])]}}])}),a("el-table-column",{attrs:{label:"大小（mm）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.diameter))])]}}])}),a("el-table-column",{attrs:{label:"子灶",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.sub_stove))])]}}])}),a("el-table-column",{attrs:{label:"肉眼癌栓",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Macroscopic_tumor_thrombus))])]}}])}),a("el-table-column",{attrs:{label:"癌栓位置",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Location_of_tumor_thrombus))])]}}])}),a("el-table-column",{attrs:{label:"包膜",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.envelope))])]}}])}),a("el-table-column",{attrs:{label:"坏死",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.necrosis))])]}}])}),a("el-table-column",{attrs:{label:"肝外侵犯（写明部位）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Extrahepatic_nvasion))])]}}])}),a("el-table-column",{attrs:{label:"镜下包膜有无突破",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Capsule_breakthrough))])]}}])}),a("el-table-column",{attrs:{label:"镜下多灶性生长",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Multifocal_growth_under_microscope))])]}}])}),a("el-table-column",{attrs:{label:"镜下子灶",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Mirror_sub_stove))])]}}])}),a("el-table-column",{attrs:{label:"微血管癌栓",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Microvascular_tumor_thrombus))])]}}])}),a("el-table-column",{attrs:{label:"肝硬化",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.cirrhosis))])]}}])}),a("el-table-column",{attrs:{label:"肝炎",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.hepatitis))])]}}])}),a("el-table-column",{attrs:{label:"BCLC",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.BCLC))])]}}])}),a("el-table-column",{attrs:{label:"UICC",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.UICC))])]}}])}),a("el-table-column",{attrs:{label:"术后TACE（注明治疗次数）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Postoperative_TACE))])]}}])}),a("el-table-column",{attrs:{label:"术后抗病毒治疗（注明药物）",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Antiviral_therapy_after_operation))])]}}])}),a("el-table-column",{attrs:{label:"PSA",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.PSA))])]}}])}),a("el-table-column",{attrs:{label:"Lauren分类",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.Lauren_classification))])]}}])}),a("el-table-column",{attrs:{label:"备注",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.remarks))])]}}])}),a("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row,l=t.$index;return[a("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(n)}}},[e._v(" 编辑 ")]),a("el-button",{staticClass:"el-icon-document",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.handleModifyStatus(n,"published")}}},[e._v(" 详情 ")]),a("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(n,l)}}},[e._v(" 删除 ")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("disease-info",{ref:"unfixedthead",attrs:{dataForm:e.temp,dialogStatus:e.dialogStatus},on:{getList:e.getList,resetTemp:e.resetTemp}})],1),a("el-drawer",{attrs:{title:"样本信息详情","with-header":!1,visible:e.sample_information,direction:"rtl",size:"60%"},on:{"update:visible":function(t){e.sample_information=t}}},[a("el-header",{staticStyle:{"text-align":"left","font-size":"20px","vertical-align":"middle"}},[a("svg-icon",{staticStyle:{"margin-right":"15px"},attrs:{"icon-class":"table"}}),a("span",{},[e._v("样本信息详情")])],1),a("el-divider"),a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{margin:"20px 25px"}},[e._v("患病详情")])]),a("disease-detail",{attrs:{current_id:e.current_id,editAble:!1,deleteAble:!0}})],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{margin:"20px 25px"}},[e._v("样本信息")])]),a("my-forms",{attrs:{current_id:e.sequences,editAble:!1,deleteAble:!1}})],1)],1),a("el-dialog",{attrs:{visible:e.dialogExcelVisible},on:{"update:visible":function(t){e.dialogExcelVisible=t}}},[a("upload-excel-component",{attrs:{"on-success":e.handleSuccess,"before-upload":e.beforeUpload}})],1)],1)},l=[],i=(a("c740"),a("d81d"),a("13d5"),a("a434"),a("b0c0"),a("a9e3"),a("8ba4"),a("d3b7"),a("ade3")),s=a("1838"),r=a("2423"),o=a("6724"),c=(a("ed08"),a("333d")),u=(a("b775"),a("750d")),d=a("3796"),p=a("f65f"),_=a("6e9d"),f=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],b=f.reduce((function(e,t){return e[t.key]=t.display_name,e}),{}),m={name:"ComplexTable",components:{Pagination:c["a"],MyForms:u["a"],UploadExcelComponent:d["a"],DiseaseInfo:p["a"],DiseaseDetail:_["a"]},directives:{waves:o["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return b[e]}},data:function(){var e,t=function(e,t,a){Number.isInteger(t)||a(new Error("请输入数字值"))};return{sequences:[],tableData:[],tableHeader:[],current_id:[],sample_information:!1,tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,disease_type:void 0,sequence_id:void 0,sort:{}},importanceOptions:[1,2,3],calendarTypeOptions:f,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],diseaseTypeOptions:[],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:(e={id:0,sequences:[],disease_type:"",age:"",pathological_information:"",process:"",Typing:"",Class:"",pathological_immunohistochemistry:"",tnm:"",period:""},Object(i["a"])(e,"period",""),Object(i["a"])(e,"operationed",""),Object(i["a"])(e,"collected_date",""),Object(i["a"])(e,"operation_date",""),Object(i["a"])(e,"preoperative_tumor_treatment",""),Object(i["a"])(e,"disease_type",""),Object(i["a"])(e,"disease_type",""),Object(i["a"])(e,"hypertension",""),Object(i["a"])(e,"diabetes",""),Object(i["a"])(e,"smoking",""),Object(i["a"])(e,"history_of_cancer",""),Object(i["a"])(e,"systemic_diseases",""),Object(i["a"])(e,"family_history",""),Object(i["a"])(e,"antiviral_therapy",""),Object(i["a"])(e,"blood_lipids",""),Object(i["a"])(e,"biochemical_indicators",""),Object(i["a"])(e,"lymphocyte",""),Object(i["a"])(e,"Neutrophils",""),Object(i["a"])(e,"after_AEP",""),Object(i["a"])(e,"after_CEA",""),Object(i["a"])(e,"after_CA19_9",""),Object(i["a"])(e,"HBV_DNA",""),Object(i["a"])(e,"hepatitis_B_surface_antigen",""),Object(i["a"])(e,"surface_antibody",""),Object(i["a"])(e,"E_antigen",""),Object(i["a"])(e,"E_antibody",""),Object(i["a"])(e,"core_antibody",""),Object(i["a"])(e,"hcv",""),Object(i["a"])(e,"HCV_Ab",""),Object(i["a"])(e,"HCV_RNA",""),Object(i["a"])(e,"thyroid",""),Object(i["a"])(e,"total_bilirubin",""),Object(i["a"])(e,"albumin",""),Object(i["a"])(e,"prothrombin_time",""),Object(i["a"])(e,"hepatic_encephalopathy",""),Object(i["a"])(e,"ascites",""),Object(i["a"])(e,"Child_Pugh",""),Object(i["a"])(e,"Postoperative_chemotherapy",""),Object(i["a"])(e,"Recurrence_time",""),Object(i["a"])(e,"Targeted_drug_therapy",""),Object(i["a"])(e,"internal",""),Object(i["a"])(e,"Radiofrequency_therapy",""),Object(i["a"])(e,"surgical_treatment",""),Object(i["a"])(e,"Time_of_death",""),Object(i["a"])(e,"Postoperative_abnormalities",""),Object(i["a"])(e,"survival_time",""),Object(i["a"])(e,"Preoperative_colonoscopy",""),Object(i["a"])(e,"Colonoscopy_pathology",""),Object(i["a"])(e,"Liver_metastasis",""),Object(i["a"])(e,"number",""),Object(i["a"])(e,"max_diameter",""),Object(i["a"])(e,"diameter",""),Object(i["a"])(e,"sub_stove",""),Object(i["a"])(e,"Macroscopic_tumor_thrombus",""),Object(i["a"])(e,"Location_of_tumor_thrombus",""),Object(i["a"])(e,"envelope",""),Object(i["a"])(e,"necrosis",""),Object(i["a"])(e,"Extrahepatic_nvasion",""),Object(i["a"])(e,"Capsule_breakthrough",""),Object(i["a"])(e,"Multifocal_growth_under_microscope",""),Object(i["a"])(e,"Mirror_sub_stove",""),Object(i["a"])(e,"Microvascular_tumor_thrombus",""),Object(i["a"])(e,"cirrhosis",""),Object(i["a"])(e,"hepatitis",""),Object(i["a"])(e,"BCLC",""),Object(i["a"])(e,"UICC",""),Object(i["a"])(e,"Postoperative_TACE",""),Object(i["a"])(e,"Antiviral_therapy_after_operation",""),Object(i["a"])(e,"PSA",""),Object(i["a"])(e,"Lauren_classification",""),Object(i["a"])(e,"remarks",""),Object(i["a"])(e,"treatment",""),Object(i["a"])(e,"timestamp",""),Object(i["a"])(e,"deleted",""),e),dialogFormVisible:!1,dialogExcelVisible:!1,excelProcess:0,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{age:[{validator:t,trigger:"blur"}]},downloadLoading:!1,multipleSelection:[]}},created:function(){this.getList(),this.getOptions()},methods:{getList:function(){var e=this;this.dialogFormVisible=!1,this.listLoading=!0,Object(s["f"])(this.listQuery).then((function(t){e.list=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},getOptions:function(){var e=this;Object(r["f"])().then((function(t){e.diseaseTypeOptions=t.data.map((function(e){return e.name}))}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){var a=this;Object(s["d"])({id:e.id}).then((function(t){a.sequences=t.data.sequences,a.current_id={diseease_id:[e.id]},console.log("传递给子组件",a.current_id,a.sequences),a.sample_information=!0,setTimeout((function(){a.listLoading=!1}),1500)})),e.status=t},sortChange:function(e){this.$refs.multipleTable&&this.$refs.multipleTable.clearSort();var t=e.prop,a=e.order;this.listQuery.sort={},this.listQuery.sort[t]=a,this.handleFilter()},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){var e;this.temp=(e={id:0,disease_type:"",collected_date:new Date,age:0},Object(i["a"])(e,"disease_type"," "),Object(i["a"])(e,"type"," "),Object(i["a"])(e,"TNM"," "),Object(i["a"])(e,"period"," "),Object(i["a"])(e,"pathological_immunohistochemistry"," "),Object(i["a"])(e,"operation_date",new Date),Object(i["a"])(e,"pathological_information"," "),Object(i["a"])(e,"Typing"," "),Object(i["a"])(e,"hypertension","ssss"),Object(i["a"])(e,"diabetes"," "),Object(i["a"])(e,"history_of_cancer"," "),Object(i["a"])(e,"systemic_diseases"," "),Object(i["a"])(e,"family_history"," "),Object(i["a"])(e,"antiviral_therapy"," "),Object(i["a"])(e,"preoperative_tumor_treatment"," "),Object(i["a"])(e,"blood_lipids"," "),Object(i["a"])(e,"biochemical_indicators"," "),Object(i["a"])(e,"lymphocyte"," "),Object(i["a"])(e,"Neutrophils"," "),Object(i["a"])(e,"after_AEP"," "),Object(i["a"])(e,"after_CEA",""),Object(i["a"])(e,"after_CA19_9"," "),Object(i["a"])(e,"HBV_DNA"," "),Object(i["a"])(e,"hepatitis_B_surface_antigen"," "),Object(i["a"])(e,"surface_antibody"," "),Object(i["a"])(e,"E_antigen"," "),Object(i["a"])(e,"E_antibody"," "),Object(i["a"])(e,"core_antibody"," "),Object(i["a"])(e,"smoking"," "),Object(i["a"])(e,"treatment"," "),Object(i["a"])(e,"timestamp",new Date),e)},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs.unfixedthead.reset()}))},createData:function(){var e=this;Object(s["a"])(this.temp).then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3}),e.getList()}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.collected_date=new Date(this.temp.collected_date),this.temp.operation_date=new Date(this.temp.operation_date),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs.unfixedthead.refreshValue()}))},updateData:function(){var e=this,t=Object.assign({},this.temp);t.timestamp=new Date,Object(s["h"])(t).then((function(){var t=e.list.findIndex((function(t){return t.id===e.temp.id}));e.list.splice(t,1,e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),e.getList()}))},handleDelete:function(e,t){var a=this;this.$swal({text:"是否删除 [ "+e.disease_type+" ]",type:"warning",showCancelButton:!0,icon:"warning",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"删除",cancelButtonText:"取消"}).then((function(n){n.value?Object(s["b"])(e.id).then((function(e){a.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3}),a.list.splice(t,1),a.getList()})).catch((function(e){console.log(e.response.data),a.$notify({title:"Failed",message:"Delete failed",type:"error",duration:2e3})})):a.$notify({title:"取消",message:"Delete canceled",type:"warning",duration:2e3})}))},handleFetchPv:function(e){var t=this;fetchPv(e).then((function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0}))},handleDownload:function(){var e=this;this.multipleSelection.length?(this.downloadLoading=!0,Promise.all([a.e("chunk-224816de"),a.e("chunk-2d0cc0b6")]).then(a.bind(null,"4bf8")).then((function(t){var a=["Id","Title","Author","Readings","Date"],n=["id","title","author","pageviews","display_time"],l=e.multipleSelection;console.log("选择的列表",l);var i=e.formatJson(n,l);t.export_json_to_excel({header:a,data:i,filename:"测试"}),e.$refs.multipleTable.clearSelection(),e.downloadLoading=!1}))):this.$message({message:"Please select at least one item",type:"warning"})},handleSelectionChange:function(e){this.multipleSelection=e},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"},beforeUpload:function(e){var t=e.size/1024/1024<1;return t?(this.$notify({title:"导入中",message:"导入需等待一小段时间",type:"warning",duration:2e3}),!0):(this.$message({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1)},handleSuccess:function(e){var t=this;this.dialogExcelVisible=!1,this.downloadLoading=!0;var a=new FormData;a.append("file",e),console.log("kiahs"),Object(s["c"])(a).then((function(){t.downloadLoading=!1,t.$notify({title:"上传成功",message:"文件已上传成功^-^",type:"success",duration:2e3}),t.getList()})).catch((function(e){console.log("错误",e),t.downloadLoading=!1,t.$notify({title:"失败",message:"文件上传失败-|-",type:"fail",duration:2e3})}))}}},h=m,v=(a("8ee6"),a("2877")),y=Object(v["a"])(h,n,l,!1,null,"69c0e6d4",null);t["default"]=y.exports}}]);