(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ddc34644"],{7546:function(e,t,i){},b296:function(e,t,i){"use strict";var a=i("7546"),n=i.n(a);n.a},b580:function(e,t,i){"use strict";var a=i("d91f"),n=i.n(a);n.a},d91f:function(e,t,i){},e3f8:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-card",{staticClass:"card",attrs:{"body-style":{},shadow:"always"}},[i("div",{staticClass:"search",staticStyle:{padding:"5px 0px"}},[i("div",{staticClass:"filter-container",staticStyle:{"margin-top":"-10px",padding:"0px"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" 搜索 ")]),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"姓名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}}),i("el-select",{staticClass:"filter-item",staticStyle:{width:"90px","margin-right":"10px"},attrs:{placeholder:"性别",clearable:""},model:{value:e.listQuery.sex,callback:function(t){e.$set(e.listQuery,"sex",t)},expression:"listQuery.sex"}},e._l(e.sexOptions,(function(e){return i("el-option",{key:e,attrs:{label:e,value:e}})})),1),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"病历号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.case_number,callback:function(t){e.$set(e.listQuery,"case_number",t)},expression:"listQuery.case_number"}})],1),i("el-divider"),i("div",{staticStyle:{height:"40px",padding:"0px"}},[i("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-circle-plus"},on:{click:e.handleCreate}},[e._v(" 新增 ")]),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px","margin-left":"0px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v(" 导出 ")])],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"multipleTable",staticStyle:{width:"98%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"","max-height":" 80%","element-loading-text":"拼命加载中"},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{"min-width":"100px",type:"selection",align:"center"}}),i("el-table-column",{attrs:{label:"病人id",width:"150px",align:"center",prop:"id",sortable:"custom","sort-orders":["ascending","descending"]},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.id))])]}}],null,!1,3036381737)}),i("el-table-column",{attrs:{label:"姓名",width:"150px",align:"center",prop:"name",sortable:"custom","sort-orders":["ascending","descending"]},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.name))])]}}])}),i("el-table-column",{attrs:{label:"病历号",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.case_number))])]}}])}),i("el-table-column",{attrs:{label:"性别",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.sex))])]}}])}),i("el-table-column",{attrs:{label:"出生日期",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(e._f("parseTime")(a.date,"{y}-{m}-{d}")))])]}}])}),i("el-table-column",{attrs:{label:"家庭地址",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.address))])]}}])}),i("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row,n=t.$index;return[i("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(a)}}},[e._v(" 编辑 ")]),i("el-button",{staticClass:"el-icon-document",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.handleModifyStatus(a,"published")}}},[e._v(" 详情 ")]),i("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(a,n)}}},[e._v(" 删除 ")])]}}])})],1),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),i("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("div",{staticClass:"form-container"},[i("unfixed-thead",{ref:"unfixedthead",attrs:{dataForm:e.temp,dialogStatus:e.dialogStatus},on:{getList:e.getList,resetTemp:e.resetTemp}})],1)]),i("el-drawer",{attrs:{title:"样本信息详情","with-header":!1,visible:e.sample_information,direction:"rtl",size:"60%"},on:{"update:visible":function(t){e.sample_information=t}}},[i("el-header",{staticStyle:{"text-align":"left","font-size":"20px","vertical-align":"middle"}},[i("svg-icon",{staticStyle:{"margin-right":"15px"},attrs:{"icon-class":"table"}}),i("span",{},[e._v("样本信息详情")])],1),i("el-divider"),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("病人信息")])]),i("patient-detail",{attrs:{current_list:e.current_list}})],1),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("患病详情")])]),i("disease-detail",{attrs:{current_list:e.current_list}})],1)],1)],1)},n=[],s=(i("c740"),i("d81d"),i("13d5"),i("a434"),i("b0c0"),i("d3b7"),i("b775"));function l(e){return Object(s["a"])({url:"/vue-element-admin/patient/list",method:"get",params:e})}function r(e){return Object(s["a"])({url:"/vue-element-admin/patient/detail",method:"post",data:e})}function o(e){return Object(s["a"])({url:"/vue-element-admin/patient/pv",method:"get",params:{pv:e}})}function c(e){return Object(s["a"])({url:"/vue-element-admin/patient/create",method:"post",data:e})}function d(e){return Object(s["a"])({url:"/vue-element-admin/patient/update",method:"put",data:e})}function u(e){return Object(s["a"])({url:"/vue-element-admin/patient/delete/".concat(e),method:"delete"})}var p=i("6724"),m=(i("ed08"),i("333d")),f=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app1"}},[i("form-create",{attrs:{rule:e.rule,option:e.options},model:{value:e.fApi,callback:function(t){e.fApi=t},expression:"fApi"}}),i("el-button",{on:{click:function(t){return e.reset()}}},[e._v(" 重置 ")]),i("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createDataOne():e.updateDataOne()}}},[e._v(" 提交 ")])],1)},h=[],g={props:["dialogStatus","dataForm"],data:function(){return{fApi:{},options:{submitBtn:!1,onReload:function(e){console.log(e)},mounted:function(e){console.log(e)}},rule:[{type:"hidden",field:"id",value:this.dataForm.id},{type:"input",title:"姓名",field:"name",value:this.dataForm.name,col:{span:20},validate:[{required:!0,message:"请输入姓名",trigger:"blur"}]},{type:"input",title:"病历号",field:"case_number",value:this.dataForm.case_number,col:{span:20}},{type:"select",field:"sex",title:"性别",value:this.dataForm.sex,options:[{value:"男",label:"男",disabled:!1},{value:"女",label:"女",disabled:!1}],props:{multiple:!1,placeholder:"选择",autocomplete:"on"},col:{span:7},validate:[{required:!0,message:"请选择性别",trigger:"blur"}]},{type:"DatePicker",title:"出生日期",field:"date",value:this.dataForm.date,props:{type:"date",format:"yyyy-MM-dd",placeholder:"请选择活动日期",defaultValue:new Date},col:{span:12,offset:1}},{type:"input",title:"家庭地址",field:"address",value:this.dataForm.address,props:{type:"textarea",maxlength:255,"show-word-limit":!0},col:{span:20}}]}},methods:{resetForm:function(){this.fApi=this.dataForm},submit:function(){this.fApi.submit((function(e,t){alert(JSON.stringify(e))}))},reset:function(){var e=this.fApi;console.log("初始化表单",e);var t={id:0,date:new Date,name:"",case_number:"",address:"",sex:"男"};e.setValue(t),e.refresh(!0)},refreshValue:function(){var e=this.fApi;console.log("刷新值",e),e.setValue(this.dataForm),e.reload()},destroyForm:function(){console.log("销毁"),this.fApi.destroy()},createDataOne:function(){var e=this;this.fApi.submit((function(t,i){t.author_id=1,t.timestamp=new Date,c(t).then((function(){e.$emit("getList"),e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})}))}))},updateDataOne:function(){var e=this;this.fApi.submit((function(t,i){var a=Object.assign({},t);a.date=new Date(a.date),console.log("aaa",a),a.timestamp=new Date,d(a).then((function(){e.$emit("getList"),e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3})}))}))}}},y=g,v=i("2877"),b=Object(v["a"])(y,f,h,!1,null,null,null),_=b.exports,w=i("6e9d"),x=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-card",{staticClass:"card",staticStyle:{"backgroud-color":"gray"},attrs:{"body-style":{},shadow:"always"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"multipleTable",staticStyle:{width:"98%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"","max-height":" 80%","element-loading-text":"拼命加载中"},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{"min-width":"100px",type:"selection",align:"center"}}),i("el-table-column",{attrs:{label:"病人id",width:"150px",align:"center",prop:"id",sortable:"custom","sort-orders":["ascending","descending"]},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.id))])]}}],null,!1,3036381737)}),i("el-table-column",{attrs:{label:"姓名",width:"150px",align:"center",prop:"name",sortable:"custom","sort-orders":["ascending","descending"]},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.name))])]}}])}),i("el-table-column",{attrs:{label:"病历号",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.case_number))])]}}])}),i("el-table-column",{attrs:{label:"性别",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.sex))])]}}])}),i("el-table-column",{attrs:{label:"出生日期",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(e._f("parseTime")(a.date,"{y}-{m}-{d}")))])]}}])}),i("el-table-column",{attrs:{label:"家庭地址",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.address))])]}}])}),i("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row,n=t.$index;return[i("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(a)}}},[e._v(" 编辑 ")]),i("el-button",{staticClass:"el-icon-document",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.handleModifyStatus(a,"published")}}},[e._v(" 详情 ")]),i("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(a,n)}}},[e._v(" 删除 ")])]}}])})],1)],1)},S=[],k=(i("a9e3"),{name:"",props:["current_id","editAble","deleteAble"],data:function(){return{tableKey:0,current_list:[],listLoading:!1,showReviewer:!1,temp:{batch:"",collected_date:new Date,introduction:"",sample_origin:"",sequence_id:"",id:""},listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],downloadLoading:!1,multipleSelection:[]}},watch:{current_id:function(e,t){console.log("读取id",this.current_id),this.getList()}},mounted:function(){var e=this;this.$nextTick((function(){e.getList()}))},methods:{getList:function(){var e=this;this.listLoading=!0,r({ids:this.current_id.patient_id}).then((function(t){console.log(t.data),e.current_list=t.data.items,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.sample_information=!0,this.$message({message:"操作Success",type:"error"}),e.status=t},sortChange:function(e){var t=e.prop,i=e.order;"id"===t&&this.sortByID(i)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:Number(new Date),title:"",status:"published",type:""}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.temp.author_id=1,e.temp.timestamp=new Date,createArticle(e.temp).then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})})))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var i=Object.assign({},e.temp);i.timestamp=new Date,updateArticle(i).then((function(){var t=e.list.findIndex((function(t){return t.id===e.temp.id}));e.current_list.splice(t,1,e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),e.getList()}))}}))},handleDelete:function(e,t){var i=this;this.$confirm("是否移除 [ "+e.id+" ]","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then((function(){(void 0)({result_id:e.id}).then((function(e){i.$message({type:"success",message:"移除成功!"}),i.current_list.splice(t,1)})).catch((function(e){console.log("疾病信息移除error",e),i.$message({message:"移除失败",type:"error"})}))})).catch((function(){i.$message({type:"info",message:"移除取消"})}))},handleDownload:function(){var e=this;this.multipleSelection.length?(this.downloadLoading=!0,Promise.all([i.e("chunk-6e87ca78"),i.e("chunk-224816de"),i.e("chunk-2133cd4f")]).then(i.bind(null,"4bf8")).then((function(t){var i=["Id","Title","Author","Readings","Date"],a=["id","title","author","pageviews","display_time"],n=e.multipleSelection;console.log("选择的列表",n);var s=e.formatJson(a,n);t.export_json_to_excel({header:i,data:s,filename:"测试"}),e.$refs.multipleTable.clearSelection(),e.downloadLoading=!1}))):this.$message({message:"Please select at least one item",type:"warning"})},handleSelectionChange:function(e){this.multipleSelection=e},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"}}}),D=k,$=(i("b296"),Object(v["a"])(D,x,S,!1,null,"62191a0a",null)),C=$.exports,F=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],L=F.reduce((function(e,t){return e[t.key]=t.display_name,e}),{}),T={name:"ComplexTable",components:{Pagination:m["a"],UnfixedThead:_,DiseaseDetail:w["a"],PatientDetail:C},directives:{waves:p["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return L[e]}},data:function(){return{current_list:[],sample_information:!1,tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,name:void 0,sex:void 0,type:void 0,sort:{},case_number:void 0},sexOptions:["男","女"],calendarTypeOptions:F,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:0,date:new Date,name:"",case_number:"",address:"",sex:"男"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{sequence_id:[{required:!0,message:"SequenceID is required",trigger:"blur"}],collected_date:[{type:"date",required:!1,message:"collected_date is required",trigger:"change"}],batch:[{required:!0,message:"batch is required",trigger:"blur"}]},downloadLoading:!1,multipleSelection:[]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.dialogFormVisible=!1,this.listLoading=!0,l(this.listQuery).then((function(t){e.list=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){var i=this;r(e.sequence_id).then((function(e){console.log("响应完成",e.data),i.current_list=e.data,console.log("传递给子组件",i.current_list),i.sample_information=!0,setTimeout((function(){i.listLoading=!1}),1500)})),e.status=t},sortChange:function(e){this.$refs.multipleTable&&this.$refs.multipleTable.clearSort();var t=e.prop,i=e.order;this.listQuery.sort={},this.listQuery.sort[t]=i,this.handleFilter()},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:0,date:new Date,name:"",case_number:"",address:"",sex:"男"}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs.unfixedthead.reset()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.temp.author_id=1,e.temp.timestamp=new Date,c(e.temp).then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})})))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs.unfixedthead.refreshValue()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var i=Object.assign({},e.temp);i.timestamp=new Date,d(i).then((function(){var t=e.list.findIndex((function(t){return t.id===e.temp.id}));e.list.splice(t,1,e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),e.getList()}))}}))},handleDelete:function(e,t){var i=this;this.$swal({text:"是否删除 [ "+e.name+" ]",type:"warning",showCancelButton:!0,icon:"warning",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"删除",cancelButtonText:"取消"}).then((function(a){a.value?u(e.sequence_id).then((function(e){i.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3}),i.list.splice(t,1),i.getList()})).catch((function(e){console.log(e.response.data),i.$notify({title:"Failed",message:"Delete failed",type:"error",duration:2e3})})):i.$notify({title:"取消",message:"Delete canceled",type:"warning",duration:2e3})}))},handleFetchPv:function(e){var t=this;o(e).then((function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0}))},handleDownload:function(){var e=this;this.multipleSelection.length?(this.downloadLoading=!0,Promise.all([i.e("chunk-6e87ca78"),i.e("chunk-224816de"),i.e("chunk-2133cd4f")]).then(i.bind(null,"4bf8")).then((function(t){var i=["Id","Title","Author","Readings","Date"],a=["id","title","author","pageviews","display_time"],n=e.multipleSelection;console.log("选择的列表",n);var s=e.formatJson(a,n);t.export_json_to_excel({header:i,data:s,filename:"测试"}),e.$refs.multipleTable.clearSelection(),e.downloadLoading=!1}))):this.$message({message:"Please select at least one item",type:"warning"})},handleSelectionChange:function(e){this.multipleSelection=e},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"}}},O=T,Q=(i("b580"),Object(v["a"])(O,a,n,!1,null,"97d580bc",null));t["default"]=Q.exports}}]);