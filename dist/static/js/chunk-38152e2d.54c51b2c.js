(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38152e2d"],{1265:function(e,t,i){"use strict";var n=i("a70b"),a=i.n(n);a.a},"4c60":function(e,t,i){},"64fb":function(e,t,i){"use strict";var n=i("9f2a"),a=i.n(n);a.a},"852b":function(e,t,i){"use strict";var n=i("4c60"),a=i.n(n);a.a},9342:function(e,t,i){"use strict";i.d(t,"e",(function(){return a})),i.d(t,"c",(function(){return l})),i.d(t,"g",(function(){return s})),i.d(t,"d",(function(){return r})),i.d(t,"a",(function(){return o})),i.d(t,"h",(function(){return c})),i.d(t,"f",(function(){return d})),i.d(t,"b",(function(){return u}));var n=i("b775");function a(e){return Object(n["a"])({url:"/vue-element-admin/result/list",method:"get",params:e})}function l(e){return Object(n["a"])({url:"/vue-element-admin/result/detail",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/vue-element-admin/result/upload",method:"post",data:e})}function r(){return Object(n["a"])({url:"/vue-element-admin/result/coverage",method:"get"})}function o(e){return Object(n["a"])({url:"/vue-element-admin/result/create",method:"post",data:e})}function c(e){return Object(n["a"])({url:"/vue-element-admin/result/update",method:"put",data:e})}function d(e){return Object(n["a"])({url:"/vue-element-admin/result/remove",method:"put",data:e})}function u(e){return Object(n["a"])({url:"/vue-element-admin/result/delete/".concat(e),method:"delete"})}},"9f2a":function(e,t,i){},a70b:function(e,t,i){},a819:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-card",{staticClass:"card",attrs:{"body-style":{},shadow:"always"}},[i("div",{staticClass:"search",staticStyle:{padding:"5px 0px"}},[i("div",{staticClass:"filter-container",staticStyle:{"margin-top":"-10px",padding:"0px"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" 搜索 ")]),i("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-right":"10px"},attrs:{placeholder:"Sequence ID"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.sequence_id,callback:function(t){e.$set(e.listQuery,"sequence_id",t)},expression:"listQuery.sequence_id"}}),i("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-right":"10px"},attrs:{placeholder:"GaoLab ID"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.gao_lab_id,callback:function(t){e.$set(e.listQuery,"gao_lab_id",t)},expression:"listQuery.gao_lab_id"}}),i("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-right":"10px"},attrs:{placeholder:"Sample ID"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.sample_id,callback:function(t){e.$set(e.listQuery,"sample_id",t)},expression:"listQuery.sample_id"}}),i("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-right":"10px"},attrs:{placeholder:"说明"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.introduction,callback:function(t){e.$set(e.listQuery,"introduction",t)},expression:"listQuery.introduction"}}),i("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-right":"10px"},attrs:{placeholder:"样品来源"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.sample_origin,callback:function(t){e.$set(e.listQuery,"sample_origin",t)},expression:"listQuery.sample_origin"}}),i("el-select",{staticClass:"filter-item",staticStyle:{width:"105px","margin-right":"10px"},attrs:{placeholder:"疾病类型",clearable:""},model:{value:e.listQuery.importance,callback:function(t){e.$set(e.listQuery,"importance",t)},expression:"listQuery.importance"}},e._l(e.importanceOptions,(function(e){return i("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),i("el-divider"),i("div",{staticStyle:{height:"40px",padding:"0px"}},[i("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-circle-plus"},on:{click:e.handleCreate}},[e._v(" 新增 ")]),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px","margin-left":"0px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-upload2"},on:{click:function(t){e.dialogExcelVisible=!0}}},[e._v(" 导入 ")])],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"multipleTable",staticStyle:{width:"98%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"","max-height":" 80%","element-loading-text":"拼命加载中"},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{"min-width":"100px",type:"selection",align:"center"}}),i("el-table-column",{attrs:{label:"测序批次",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[Array.isArray(n.results)?i("div",e._l(n.results,(function(t){return i("p",[e._v(e._s(t)+" ")])})),0):i("span",[e._v(e._s(n.results))])]}}])}),i("el-table-column",{attrs:{label:"SequenceID",prop:"sequence_id",sortable:"custom","sort-orders":["ascending","descending"],align:"center",width:"180px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.sequence_id))])]}}])}),i("el-table-column",{attrs:{label:"SampleID",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.sample_id))])]}}])}),i("el-table-column",{attrs:{label:"说明",width:"300px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.introduction))])]}}])}),i("el-table-column",{attrs:{label:"疾病类型",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.disease_type))])]}}])}),i("el-table-column",{attrs:{label:"样品来源",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.sample_origin))])]}}])}),i("el-table-column",{attrs:{label:"样品来源(省份)",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.sample_origin_province))])]}}])}),i("el-table-column",{attrs:{label:"采样日期",width:"150px",align:"center",prop:"collected_date",sortable:"custom","sort-orders":["ascending","descending"]},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(e._f("parseTime")(n.collected_date,"{y}-{m}-{d}")))])]}}])}),i("el-table-column",{attrs:{label:"抽血日期",width:"150px",align:"center",prop:"blood_date",sortable:"custom","sort-orders":["ascending","descending"]},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(e._f("parseTime")(n.blood_date,"{y}-{m}-{d}")))])]}}])}),i("el-table-column",{attrs:{label:"GaoLabID",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.gao_lab_id))])]}}])}),i("el-table-column",{attrs:{label:"实验特殊操作备注（样本过滤、浓缩、建库…)",width:"300px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.special_operation))])]}}])}),i("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row,a=t.$index;return[i("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(n)}}},[e._v(" 编辑 ")]),i("el-button",{staticClass:"el-icon-document",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.handleModifyStatus(n,"published")}}},[e._v(" 详情 ")]),i("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(n,a)}}},[e._v(" 删除 ")])]}}])})],1),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),i("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("sample-origin",{ref:"sampleorigin",attrs:{dataForm:e.temp,dialogStatus:e.dialogStatus},on:{getList:e.getList,resetTemp:e.resetTemp}})],1),i("el-drawer",{attrs:{title:"样本信息详情","with-header":!1,visible:e.sample_information,direction:"rtl",size:"60%"},on:{"update:visible":function(t){e.sample_information=t}}},[i("el-header",{staticStyle:{"text-align":"left","font-size":"20px","vertical-align":"middle"}},[i("svg-icon",{staticStyle:{"margin-right":"15px"},attrs:{"icon-class":"table"}}),i("span",{},[e._v("样本信息详情")])],1),i("el-divider"),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("样本信息")])]),i("my-forms",{attrs:{current_id:e.current_id,editAble:!1,deleteAble:!0}})],1),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("患病详情")])]),i("disease-detail",{attrs:{current_id:e.disease_detail_ids,editAble:!1,deleteAble:!1}})],1),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("测序结果详情")])]),i("result-detail",{attrs:{current_id:e.patient_detail_ids,editAble:!1,deleteAble:!1}})],1)],1),i("el-dialog",{attrs:{visible:e.dialogExcelVisible},on:{"update:visible":function(t){e.dialogExcelVisible=t}}},[i("upload-excel-component",{attrs:{"on-success":e.handleSuccess,"before-upload":e.beforeUpload}})],1)],1)},a=[],l=(i("c740"),i("d81d"),i("13d5"),i("a434"),i("a9e3"),i("8ba4"),i("d3b7"),i("2423")),s=i("6724"),r=(i("ed08"),i("333d")),o=(i("b775"),i("750d")),c=i("6e9d"),d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-card",{staticClass:"card",staticStyle:{"backgroud-color":"gray"},attrs:{"body-style":{},shadow:"always"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"multipleTable",staticStyle:{width:"98%"},attrs:{data:e.current_list,border:"",fit:"","highlight-current-row":"","max-height":" 80%","element-loading-text":"拼命加载中"},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{"min-width":"100px",type:"selection",align:"center"}}),i("el-table-column",{attrs:{label:"id",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.id))])]}}],null,!1,3036381737)}),i("el-table-column",{attrs:{label:"测序批次",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.batch))])]}}])}),i("el-table-column",{attrs:{label:"SequenceID",prop:"id",sortable:"custom",align:"center",width:"180px","class-name":e.getSortClass("id")},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.sequence_id))])]}}])}),i("el-table-column",{attrs:{label:"NAME",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.name_1))])]}}])}),i("el-table-column",{attrs:{label:"Input",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.data_quality_input))])]}}])}),i("el-table-column",{attrs:{label:"bam",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.data_quality_bam))])]}}])}),i("el-table-column",{attrs:{label:"bam/Input(%)",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(Number(100*n.data_quality_bam_input).toFixed(2)))])]}}])}),i("el-table-column",{attrs:{label:"uniq.bam",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.data_Quality_uniq_bam))])]}}])}),i("el-table-column",{attrs:{label:"uniq.nodup.bam",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.data_Quality_uniq_nodup_bam))])]}}])}),i("el-table-column",{attrs:{label:"uniq.nodup.bam/Input(%)",width:"180px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(Number(100*n.data_Quality_uniq_nodup_bam_input).toFixed(2)))])]}}])}),i("el-table-column",{attrs:{label:"Coverage(%)",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(Number(100*n.coverage).toFixed(2)))])]}}])}),i("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row,a=t.$index;return[i("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary",size:"mini",disabled:e.editAble},on:{click:function(t){return e.handleUpdate(n)}}},[e._v(" 编辑 ")]),i("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger",disabled:e.deleteAble},on:{click:function(t){return e.handleDelete(n,a)}}},[e._v(" 删除 ")])]}}])})],1)],1)},u=[],p=i("9342"),m={name:"",props:["current_id","editAble","deleteAble"],data:function(){return{tableKey:0,current_list:[],listLoading:!1,showReviewer:!1,temp:{batch:"",collected_date:new Date,introduction:"",sample_origin:"",sequence_id:"",id:""},listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],downloadLoading:!1,multipleSelection:[]}},watch:{current_id:function(e,t){console.log("读取id",this.current_id),this.getList()}},mounted:function(){var e=this;this.$nextTick((function(){e.getList()}))},methods:{getList:function(){var e=this;this.listLoading=!0,Object(p["c"])({ids:this.current_id.patient_id}).then((function(t){console.log(t.data),e.current_list=t.data.items,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.sample_information=!0,this.$message({message:"操作Success",type:"error"}),e.status=t},sortChange:function(e){var t=e.prop,i=e.order;"id"===t&&this.sortByID(i)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:Number(new Date),title:"",status:"published",type:""}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.temp.author_id=1,e.temp.timestamp=new Date,createArticle(e.temp).then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})})))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var i=Object.assign({},e.temp);i.timestamp=new Date,updateArticle(i).then((function(){var t=e.list.findIndex((function(t){return t.id===e.temp.id}));e.current_list.splice(t,1,e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),e.getList()}))}}))},handleDelete:function(e,t){var i=this;this.$confirm("是否移除 [ "+e.id+" ]","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then((function(){Object(p["f"])({result_id:e.id}).then((function(e){i.$message({type:"success",message:"移除成功!"}),i.current_list.splice(t,1)})).catch((function(e){console.log("疾病信息移除error",e),i.$message({message:"移除失败",type:"error"})}))})).catch((function(){i.$message({type:"info",message:"移除取消"})}))},handleDownload:function(){var e=this;this.multipleSelection.length?(this.downloadLoading=!0,Promise.all([i.e("chunk-c492c6a6"),i.e("chunk-2d0cc0b6")]).then(i.bind(null,"4bf8")).then((function(t){var i=["Id","Title","Author","Readings","Date"],n=["id","title","author","pageviews","display_time"],a=e.multipleSelection;console.log("选择的列表",a);var l=e.formatJson(n,a);t.export_json_to_excel({header:i,data:l,filename:"测试"}),e.$refs.multipleTable.clearSelection(),e.downloadLoading=!1}))):this.$message({message:"Please select at least one item",type:"warning"})},handleSelectionChange:function(e){this.multipleSelection=e},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"}}},f=m,h=(i("64fb"),i("2877")),g=Object(h["a"])(f,d,u,!1,null,"a0232270",null),_=g.exports,b=i("3796"),y=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-upload",{staticClass:"upload-demo",attrs:{action:"","http-request":e.handleUpload,"auto-upload":!0,accept:".xlsx, .xls","before-upload":e.beforeAvatarUpload,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"before-remove":e.beforeRemove,"on-exceed":e.handleExceed,"file-list":e.fileList}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传xlsx/xls文件")])],1)},v=[],w=(i("99af"),i("b0c0"),i("ed07")),x={props:{beforeUpload:Function,onSuccess:Function},data:function(){return{fileList:[]}},methods:{handleRemove:function(e,t){console.log(e,t)},handlePreview:function(e){console.log(e)},handleExceed:function(e,t){this.$message.warning("当前限制选择 3 个文件，本次选择了 ".concat(e.length," 个文件，共选择了 ").concat(e.length+t.length," 个文件"))},beforeRemove:function(e,t){return this.$confirm("确定移除 ".concat(e.name,"？"))},handleUpload:function(e){var t=this,i=e.file,n=new FormData;n.append("file",i),Object(w["a"])(n).then((function(){t.$notify({title:"上传成功",message:"文件已成功上传",type:"success",duration:2e3}),t.onSuccess()})).catch((function(e){console.log("错误",e),t.$notify({title:"失败",message:"上传失败",type:"fail",duration:2e3})}))},beforeAvatarUpload:function(e){if(!this.beforeUpload){var t=e.size/1024/1024<2;return t||this.$message.error("上传头像图片大小不能超过 2MB!"),t}this.beforeUpload()}}},S=x,k=Object(h["a"])(S,y,v,!1,null,null,null),$=k.exports,C=i("110f"),D=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],F=D.reduce((function(e,t){return e[t.key]=t.display_name,e}),{}),O={name:"ComplexTable",components:{Pagination:r["a"],MyForms:o["a"],UploadExcelComponent:b["a"],SampleOrigin:C["a"],UploadComponent:$,DiseaseDetail:c["a"],ResultDetail:_},directives:{waves:s["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return F[e]}},data:function(){return{disease_detail_ids:[],patient_detail_ids:[],current_id:[],sample_information:!1,tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,sequence_id:void 0,gao_lab_id:void 0,introduction:void 0,sample_origin:void 0,type:void 0,sort:{sequence_id:"descending"}},importanceOptions:[1,2,3],calendarTypeOptions:D,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{batch:[],collected_date:new Date,introduction:"",sample_origin:"",sequence_id:"",id:"",sample_origin_province:""},dialogFormVisible:!1,dialogExcelVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"新建"},dialogPvVisible:!1,pvData:[],rules:{sequence_id:[{required:!0,message:"SequenceID is required",trigger:"blur"}],collected_date:[{type:"date",required:!1,message:"collected_date is required",trigger:"change"}],batch:[{required:!0,message:"batch is required",trigger:"blur"}]},downloadLoading:!1,multipleSelection:[],tableData:[],tableHeader:[]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.dialogFormVisible=!1,this.listLoading=!0,Object(l["g"])(this.listQuery).then((function(t){e.list=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){var i=this;Object(l["d"])({id:e.sequence_id}).then((function(t){var n=t.data;i.disease_detail_ids={diseease_id:n.diseease_id,parent_id:e.sequence_id},i.patient_detail_ids={patient_id:n.patient_id,parent_id:e.sequence_id},i.current_id=[e.sequence_id],i.sample_information=!0})),e.status=t},sortChange:function(e){console.log("排序字段",e),this.$refs.multipleTable&&this.$refs.multipleTable.clearSort();var t=e.prop,i=e.order;this.listQuery.sort={},this.listQuery.sort[t]=i,this.handleFilter()},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:Number(new Date),title:"",status:"published",type:""}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs.sampleorigin.reset()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.temp.author_id=1,e.temp.timestamp=new Date,Object(l["a"])(e.temp).then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})})))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs.sampleorigin.refreshValue()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var i=Object.assign({},e.temp);i.timestamp=new Date,Object(l["i"])(i).then((function(){var t=e.list.findIndex((function(t){return t.id===e.temp.id}));e.list.splice(t,1,e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),e.getList()}))}}))},handleDelete:function(e,t){var i=this;this.$swal({text:"是否删除 [ "+e.sequence_id+" ]",type:"warning",showCancelButton:!0,icon:"warning",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"删除",cancelButtonText:"取消"}).then((function(n){n.value?Object(l["b"])(e.sequence_id).then((function(e){i.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3}),i.list.splice(t,1),i.getList()})).catch((function(e){console.log(e.response.data),i.$notify({title:"Failed",message:"Delete failed",type:"error",duration:2e3})})):i.$notify({title:"取消",message:"Delete canceled",type:"warning",duration:2e3})}))},handleDownload:function(){var e=this;this.multipleSelection.length?(this.downloadLoading=!0,Promise.all([i.e("chunk-c492c6a6"),i.e("chunk-2d0cc0b6")]).then(i.bind(null,"4bf8")).then((function(t){var i=["Id","Title","Author","Readings","Date"],n=["id","title","author","pageviews","display_time"],a=e.multipleSelection;console.log("选择的列表",a);var l=e.formatJson(n,a);t.export_json_to_excel({header:i,data:l,filename:"测试"}),e.$refs.multipleTable.clearSelection(),e.downloadLoading=!1}))):this.$message({message:"Please select at least one item",type:"warning"})},handleSelectionChange:function(e){this.multipleSelection=e},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort.key;return t==="+".concat(e)?"ascending":"descending"},beforeUpload:function(e){var t=e.size/1024/1024<1;return t?(this.$notify({title:"导入中",message:"导入需等待一小段时间",type:"warning",duration:2e3}),!0):(this.$message({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1)},handleSuccess:function(e){var t=this;this.dialogExcelVisible=!1,this.downloadLoading=!0;var i=new FormData;i.append("file",e),Object(l["j"])(i).then((function(){t.downloadLoading=!1,t.$notify({title:"上传成功",message:"文件已上传成功^-^",type:"success",duration:2e3}),t.getList()})).catch((function(e){console.log("错误",e),t.downloadLoading=!1,t.$notify({title:"失败",message:"文件上传失败-|-",type:"fail",duration:2e3})}))}}},L=O,q=(i("1265"),i("852b"),Object(h["a"])(L,n,a,!1,null,"0e6cfff6",null));t["default"]=q.exports}}]);