(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e673886"],{1652:function(t,e,a){},bf16:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-card",{staticClass:"card",attrs:{"body-style":{},shadow:"always"}},[a("div",{staticClass:"search",staticStyle:{padding:"5px 0px"}},[a("div",{staticClass:"filter-container",staticStyle:{"margin-top":"-10px",padding:"0px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(" 搜索 ")]),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"测序ID"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.sequence_id,callback:function(e){t.$set(t.listQuery,"sequence_id",e)},expression:"listQuery.sequence_id"}}),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"测序批次"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.batch,callback:function(e){t.$set(t.listQuery,"batch",e)},expression:"listQuery.batch"}}),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"NAME"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.name_1,callback:function(e){t.$set(t.listQuery,"name_1",e)},expression:"listQuery.name_1"}})],1),a("el-divider"),a("div",{staticStyle:{height:"40px",padding:"0px"}},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-circle-plus"},on:{click:t.handleCreate}},[t._v(" 新增 ")]),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px","margin-left":"0px"},attrs:{loading:t.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:t.handleDownload}},[t._v(" 导出 ")]),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px","margin-left":"0px"},attrs:{loading:t.downloadLoading,type:"primary",icon:"el-icon-upload2"},on:{click:function(e){t.dialogExcelVisible=!0}}},[t._v(" 导入 ")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,ref:"multipleTable",staticStyle:{width:"98%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","max-height":" 80%","element-loading-text":"拼命加载中"},on:{"sort-change":t.sortChange,"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{"min-width":"100px",type:"selection",align:"center"}}),a("el-table-column",{attrs:{label:"SequenceID",prop:"id",sortable:"custom",align:"center",width:"180px","class-name":t.getSortClass("id")},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.sequence_id))])]}}])}),a("el-table-column",{attrs:{label:"测序批次",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.batch))])]}}])}),a("el-table-column",{attrs:{label:"NAME",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.name_1))])]}}])}),a("el-table-column",{attrs:{label:"Input",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.data_quality_input))])]}}])}),a("el-table-column",{attrs:{label:"bam",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.data_quality_bam))])]}}])}),a("el-table-column",{attrs:{label:"bam/Input(%)",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(Number(100*i.data_quality_bam_input).toFixed(2)))])]}}])}),a("el-table-column",{attrs:{label:"uniq.bam",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.data_Quality_uniq_bam))])]}}])}),a("el-table-column",{attrs:{label:"uniq.nodup.bam",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(i.data_Quality_uniq_nodup_bam))])]}}])}),a("el-table-column",{attrs:{label:"uniq.nodup.bam/Input(%)",width:"180px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(Number(100*i.data_Quality_uniq_nodup_bam_input).toFixed(2)))])]}}])}),a("el-table-column",{attrs:{label:"Coverage(%)",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",[t._v(t._s(Number(100*i.coverage).toFixed(2)))])]}}])}),a("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row,n=e.$index;return[a("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleUpdate(i)}}},[t._v(" 编辑 ")]),a("el-button",{staticClass:"el-icon-document",attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.handleModifyStatus(i,"published")}}},[t._v(" 详情 ")]),a("el-button",{staticClass:"el-icon-delete",attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.handleDelete(i,n)}}},[t._v(" 删除 ")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("sample-result",{ref:"unfixedthead",attrs:{dataForm:t.temp,dialogStatus:t.dialogStatus},on:{getList:t.getList,resetTemp:t.resetTemp}})],1),a("el-drawer",{attrs:{title:"样本信息详情","with-header":!1,visible:t.sample_information,direction:"rtl",size:"60%"},on:{"update:visible":function(e){t.sample_information=e}}},[a("el-header",{staticStyle:{"text-align":"left","font-size":"20px","vertical-align":"middle"}},[a("svg-icon",{staticStyle:{"margin-right":"15px"},attrs:{"icon-class":"table"}}),a("span",{},[t._v("样本信息详情")])],1),a("el-divider"),a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{margin:"20px 25px"}},[t._v("样本信息")])]),a("my-forms",{attrs:{current_list:t.current_list}})],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{margin:"20px 25px"}},[t._v("患病详情")])]),a("my-forms",{attrs:{current_list:t.current_list}})],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{margin:"20px 25px"}},[t._v("病人信息")])]),a("my-forms",{attrs:{current_list:t.current_list}})],1)],1),a("el-dialog",{attrs:{visible:t.dialogExcelVisible},on:{"update:visible":function(e){t.dialogExcelVisible=e}}},[a("upload-excel-component",{attrs:{"on-success":t.handleSuccess,"before-upload":t.beforeUpload}})],1)],1)},n=[],l=(a("c740"),a("d81d"),a("13d5"),a("a434"),a("a9e3"),a("8ba4"),a("d3b7"),a("b775"));function s(t){return Object(l["a"])({url:"/vue-element-admin/result/list",method:"get",params:t})}function r(t){return Object(l["a"])({url:"/vue-element-admin/result/detail/".concat(t),method:"get"})}function o(t){return Object(l["a"])({url:"/vue-element-admin/result/pv",method:"get",params:{pv:t}})}function u(t){return Object(l["a"])({url:"/vue-element-admin/result/create",method:"post",data:t})}function c(t){return Object(l["a"])({url:"/vue-element-admin/result/update",method:"put",data:t})}function d(t){return Object(l["a"])({url:"/vue-element-admin/result/delete/".concat(t),method:"delete"})}function p(t){return Object(l["a"])({url:"/vue-element-admin/result/import",method:"post",data:t})}var m=a("6724"),f=(a("ed08"),a("333d")),h=a("750d"),_=a("3796"),g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app1"}},[a("form-create",{attrs:{rule:t.rule,option:t.options},model:{value:t.fApi,callback:function(e){t.fApi=e},expression:"fApi"}}),a("el-button",{on:{click:function(e){return t.reset()}}},[t._v(" 重置 ")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){"create"===t.dialogStatus?t.createDataOne():t.updateDataOne()}}},[t._v(" 提交 ")])],1)},y=[],b=a("ade3"),v={props:["dialogStatus","dataForm"],data:function(){return{fApi:{},options:{submitBtn:!1,onReload:function(t){console.log(t)},mounted:function(t){console.log(t)}},rule:[{type:"hidden",field:"id",value:this.dataForm.id},{type:"InputNumber",title:"Sequence ID",field:"sequence_id",value:this.dataForm.sequence_id,props:{precision:0,controls:!1,placeholder:"请输入测序编号"},col:{span:20},validate:[{required:!0,message:"请输入测序编号",trigger:"blur"}]},{type:"input",title:"测序批次",field:"batch",value:this.dataForm.batch,col:{span:12}},{type:"input",title:"NAME",field:"name_1",value:this.dataForm.name_1,col:{span:12}},{type:"InputNumber",title:"Input",field:"data_quality_input",value:this.dataForm.data_quality_input,props:{precision:0,controls:!1},col:{span:12}},{type:"InputNumber",title:"bam",field:"data_quality_bam",value:this.dataForm.data_quality_bam,props:{precision:0,controls:!1},col:{span:12}},{type:"InputNumber",title:"bam/Input(%)",field:"data_quality_bam_input",value:this.dataForm.data_quality_bam_input,props:Object(b["a"])({precision:0,controls:!1},"precision",2),col:{span:12}},{type:"InputNumber",title:"uniq.bam",field:"data_Quality_uniq_bam",value:this.dataForm.data_Quality_uniq_bam,props:{precision:0,controls:!1},col:{span:12}},{type:"InputNumber",title:"uniq.nodup.bam",field:"data_Quality_uniq_nodup_bam",value:this.dataForm.data_Quality_uniq_nodup_bam,props:{precision:0,controls:!1},col:{span:12}},{type:"InputNumber",title:"uniq/Input(%)",field:"data_Quality_uniq_nodup_bam_input",value:this.dataForm.data_Quality_uniq_nodup_bam_input,props:Object(b["a"])({precision:0,controls:!1},"precision",2),col:{span:12}},{type:"InputNumber",title:"Coverage(%)",field:"coverage",value:this.dataForm.coverage,props:Object(b["a"])({precision:0,controls:!1},"precision",2),col:{span:12}}]}},methods:{resetForm:function(){this.fApi=this.dataForm},submit:function(){this.fApi.submit((function(t,e){alert(JSON.stringify(t))}))},reset:function(){var t=this.fApi;console.log("初始化表单",t);var e={id:0,name_1:"",data_quality_input:"",data_quality_bam:"",data_quality_bam_input:"",data_Quality_uniq_bam:"",data_Quality_uniq_nodup_bam:"",data_Quality_uniq_nodup_bam_input:"",coverage:"",sequence_id:"",batch:""};t.setValue(e),t.refresh(!0)},refreshValue:function(){var t=this.fApi;console.log("刷新值",t),t.setValue(this.dataForm),t.reload()},destroyForm:function(){console.log("销毁"),this.fApi.destroy()},createDataOne:function(){var t=this;this.fApi.submit((function(e,a){e.author_id=1,e.timestamp=new Date,u(e).then((function(){t.$emit("getList"),t.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})}))}))},updateDataOne:function(){var t=this;this.fApi.submit((function(e,a){var i=Object.assign({},e);i.date=new Date(i.date),console.log("aaa",i),i.timestamp=new Date,c(i).then((function(){t.$emit("getList"),t.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3})}))}))}}},w=v,x=(a("fe37"),a("2877")),S=Object(x["a"])(w,g,y,!1,null,"42ea867c",null),q=S.exports,k=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],F=k.reduce((function(t,e){return t[e.key]=e.display_name,t}),{}),C={name:"ComplexTable",components:{Pagination:f["a"],MyForms:h["a"],UploadExcelComponent:_["a"],SampleResult:q},directives:{waves:m["a"]},filters:{statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]},typeFilter:function(t){return F[t]}},data:function(){return{current_list:[],sample_information:!1,tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,sequence_id:void 0,importance:void 0,type:void 0,name_1:void 0,batch:void 0,sort:"+id"},importanceOptions:[1,2,3],calendarTypeOptions:k,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:0,name_1:"",data_quality_input:"",data_quality_bam:"",data_quality_bam_input:"",data_Quality_uniq_bam:"",data_Quality_uniq_nodup_bam:"",data_Quality_uniq_nodup_bam_input:"",coverage:"",sequence_id:""},dialogFormVisible:!1,dialogExcelVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{sequence_id:[{required:!0,message:"SequenceID is required",trigger:"blur"}],collected_date:[{type:"date",required:!1,message:"collected_date is required",trigger:"change"}],batch:[{required:!0,message:"batch is required",trigger:"blur"}]},downloadLoading:!1,multipleSelection:[],tableData:[],tableHeader:[]}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.dialogFormVisible=!1,this.listLoading=!0,s(this.listQuery).then((function(e){t.list=e.data.items,t.total=e.data.total,setTimeout((function(){t.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(t,e){var a=this;r(t.sequence_id).then((function(t){console.log("响应完成",t.data),a.current_list=t.data,console.log("传递给子组件",a.current_list),a.sample_information=!0,setTimeout((function(){a.listLoading=!1}),1500)})),t.status=e},sortChange:function(t){var e=t.prop,a=t.order;"id"===e&&this.sortByID(a)},sortByID:function(t){this.listQuery.sort="ascending"===t?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:Number(new Date),title:"",status:"published",type:""}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs.unfixedthead.reset()}))},createData:function(){var t=this;this.$refs["dataForm"].validate((function(e){e&&(t.temp.author_id=1,t.temp.timestamp=new Date,u(t.temp).then((function(){t.list.unshift(t.temp),t.dialogFormVisible=!1,t.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3}),t.getList()})))}))},handleUpdate:function(t){var e=this;this.temp=Object.assign({},t),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs.unfixedthead.refreshValue()}))},updateData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a=Object.assign({},t.temp);a.timestamp=new Date,c(a).then((function(){var e=t.list.findIndex((function(e){return e.id===t.temp.id}));t.list.splice(e,1,t.temp),t.dialogFormVisible=!1,t.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),t.getList()}))}}))},handleDelete:function(t,e){var a=this;this.$swal({text:"是否删除 [ "+t.sequence_id+" ]",type:"warning",showCancelButton:!0,icon:"warning",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"删除",cancelButtonText:"取消"}).then((function(i){i.value?d(t.sequence_id).then((function(t){a.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3}),a.list.splice(e,1),a.getList()})).catch((function(t){console.log(t.response.data),a.$notify({title:"Failed",message:"Delete failed",type:"error",duration:2e3})})):a.$notify({title:"取消",message:"Delete canceled",type:"warning",duration:2e3})}))},handleFetchPv:function(t){var e=this;o(t).then((function(t){e.pvData=t.data.pvData,e.dialogPvVisible=!0}))},handleDownload:function(){var t=this;this.multipleSelection.length?(this.downloadLoading=!0,Promise.all([a.e("chunk-224816de"),a.e("chunk-2d0cc0b6")]).then(a.bind(null,"4bf8")).then((function(e){var a=["Id","Title","Author","Readings","Date"],i=["id","title","author","pageviews","display_time"],n=t.multipleSelection;console.log("选择的列表",n);var l=t.formatJson(i,n);e.export_json_to_excel({header:a,data:l,filename:"测试"}),t.$refs.multipleTable.clearSelection(),t.downloadLoading=!1}))):this.$message({message:"Please select at least one item",type:"warning"})},handleSelectionChange:function(t){this.multipleSelection=t},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))},getSortClass:function(t){var e=this.listQuery.sort;return e==="+".concat(t)?"ascending":"descending"},beforeUpload:function(t){var e=t.size/1024/1024<1;return!!e||(this.$message({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1)},handleSuccess:function(t){var e=this,a=t.results,i=t.header;this.dialogExcelVisible=!1,this.$notify({title:"导入中",message:"导入需等待一段时间",type:"warning",duration:2e3}),this.tableData=a,this.tableHeader=i;var n={data:this.tableData,header:this.tableHeader};p(n).then((function(){e.$notify({title:"Success",message:"Import Successfully",type:"success",duration:2e3}),e.getList()}))}}},D=C,Q=(a("e3cd"),Object(x["a"])(D,i,n,!1,null,"4ebcdcd9",null));e["default"]=Q.exports},ccb6:function(t,e,a){},e3cd:function(t,e,a){"use strict";var i=a("ccb6"),n=a.n(i);n.a},fe37:function(t,e,a){"use strict";var i=a("1652"),n=a.n(i);n.a}}]);