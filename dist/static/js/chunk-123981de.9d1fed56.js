(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-123981de"],{"0b0b":function(e,t,i){"use strict";var n=i("2d5e"),a=i.n(n);a.a},1692:function(e,t,i){"use strict";var n=i("b438"),a=i.n(n);a.a},"1c18":function(e,t,i){},"2d5e":function(e,t,i){},3252:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-card",{staticClass:"card",attrs:{"body-style":{},shadow:"always"}},[i("div",{staticClass:"search",staticStyle:{padding:"5px 0px"}},[i("div",{staticClass:"filter-container",staticStyle:{"margin-top":"-10px",padding:"0px"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-right":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" 搜索 ")]),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"姓名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.username,callback:function(t){e.$set(e.listQuery,"username",t)},expression:"listQuery.username"}}),i("el-select",{staticClass:"filter-item",staticStyle:{width:"90px","margin-right":"10px"},attrs:{placeholder:"角色",clearable:""},model:{value:e.listQuery.role,callback:function(t){e.$set(e.listQuery,"role",t)},expression:"listQuery.role"}},e._l(e.sexOptions,(function(e,t){return i("el-option",{key:e,attrs:{label:t,value:e}})})),1)],1),i("el-divider"),i("div",{staticStyle:{height:"40px",padding:"0px"}})],1),i("switch-roles",{attrs:{dataList:e.list,Loading:e.listLoading}}),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),i("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("div",{staticClass:"form-container"},[i("unfixed-thead",{ref:"unfixedthead",attrs:{dataForm:e.temp,dialogStatus:e.dialogStatus},on:{getList:e.getList,resetTemp:e.resetTemp}})],1)]),i("el-drawer",{attrs:{title:"样本信息详情","with-header":!1,visible:e.sample_information,direction:"rtl",size:"60%"},on:{"update:visible":function(t){e.sample_information=t}}},[i("el-header",{staticStyle:{"text-align":"left","font-size":"20px","vertical-align":"middle"}},[i("svg-icon",{staticStyle:{"margin-right":"15px"},attrs:{"icon-class":"table"}}),i("span",{},[e._v("样本信息详情")])],1),i("el-divider"),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("样本信息")])]),i("my-forms",{attrs:{current_list:e.current_list}})],1),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("患病详情")])]),i("my-forms",{attrs:{current_list:e.current_list}})],1),i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticStyle:{margin:"20px 25px"}},[e._v("病人信息")])]),i("my-forms",{attrs:{current_list:e.current_list}})],1)],1)],1)},a=[],s=(i("c740"),i("d81d"),i("13d5"),i("a434"),i("b0c0"),i("d3b7"),i("b775"));function l(e){return Object(s["a"])({url:"/vue-element-admin/roles/list",method:"get",params:e})}function r(e){return Object(s["a"])({url:"/vue-element-admin/role/update",method:"put",data:e})}function o(e){return Object(s["a"])({url:"/vue-element-admin/role/".concat(e),method:"delete"})}var c=i("6724"),u=(i("ed08"),i("333d")),d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.Loading,expression:"Loading"}],staticStyle:{width:"50%"},attrs:{data:e.dataList,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"ID",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.id))])]}}])}),i("el-table-column",{attrs:{width:"200px",label:"用户名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.username))])]}}])}),i("el-table-column",{attrs:{"min-width":"150px",label:"用户角色",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[n.edit?[i("el-select",{staticClass:"filter-item",staticStyle:{width:"90px","margin-right":"10px"},attrs:{placeholder:"角色"},model:{value:n.role_id,callback:function(t){e.$set(n,"role_id",t)},expression:"row.role_id"}},e._l(e.roleOptions,(function(e,t){return i("el-option",{key:e,attrs:{label:t,value:e}})})),1)]:i("span",[e._v(e._s(e._f("statusFilter")(n.role_id)))])]}}])}),i("el-table-column",{attrs:{align:"center",label:"Actions",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[n.edit?i("el-button",{attrs:{type:"success",size:"small",icon:"el-icon-circle-check-outline"},on:{click:function(t){return e.confirmEdit(n)}}},[e._v(" 确认 ")]):i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(e){n.edit=!n.edit}}},[e._v(" 修改 ")])]}}])})],1)],1)},p=[],m={name:"RoleTabele",props:["dataList","Loading"],filters:{statusFilter:function(e){var t={2:"实验员",1:"访客",3:"管理员"};return t[e]}},data:function(){return{listQuery:{page:1,limit:10},roleOptions:{"访客":1,"实验员":2,"管理员":3}}},created:function(){},methods:{getList:function(){var e=this;this.listLoading=!0,this.list=this.dataList.map((function(t){return e.$set(t,"edit",!1),t})),this.listLoading=!1},cancelEdit:function(e){e.title=e.originalTitle,e.edit=!1,this.$message({message:"The title has been restored to the original value",type:"warning"})},confirmEdit:function(e){var t=this;e.edit=!1,r(e).then((function(e){t.$message({message:"角色修改成功",type:"success"})})).catch({message:"角色修改失败",type:"fail"})}}},f=m,h=(i("0b0b"),i("2877")),g=Object(h["a"])(f,d,p,!1,null,"4a4f3318",null),v=g.exports,y=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],b=y.reduce((function(e,t){return e[t.key]=t.display_name,e}),{}),w={name:"ComplexTable",components:{Pagination:u["a"],SwitchRoles:v},directives:{waves:c["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return b[e]}},data:function(){return{current_list:[],sample_information:!1,tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,role:void 0,username:void 0,sort:{}},sexOptions:{"访客":1,"实验员":2,"管理员":3},calendarTypeOptions:y,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:0,date:new Date,name:"",case_number:"",address:"",sex:"男"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{sequence_id:[{required:!0,message:"SequenceID is required",trigger:"blur"}],collected_date:[{type:"date",required:!1,message:"collected_date is required",trigger:"change"}],batch:[{required:!0,message:"batch is required",trigger:"blur"}]},downloadLoading:!1,multipleSelection:[]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.dialogFormVisible=!1,this.listLoading=!0,l(this.listQuery).then((function(t){var i=t.data.items;e.total=t.data.total,e.list=i.map((function(t){return e.$set(t,"edit",!1),t})),setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){var i=this;fetchArticle(e.sequence_id).then((function(e){console.log("响应完成",e.data),i.current_list=e.data,console.log("传递给子组件",i.current_list),i.sample_information=!0,setTimeout((function(){i.listLoading=!1}),1500)})),e.status=t},sortChange:function(e){this.$refs.multipleTable&&this.$refs.multipleTable.clearSort();var t=e.prop,i=e.order;this.listQuery.sort={},this.listQuery.sort[t]=i,this.handleFilter()},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:0,date:new Date,name:"",case_number:"",address:"",sex:"男"}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs.unfixedthead.reset()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&(e.temp.author_id=1,e.temp.timestamp=new Date,createArticle(e.temp).then((function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})})))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs.unfixedthead.refreshValue()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var i=Object.assign({},e.temp);i.timestamp=new Date,r(i).then((function(){var t=e.list.findIndex((function(t){return t.id===e.temp.id}));e.list.splice(t,1,e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),e.getList()}))}}))},handleDelete:function(e,t){var i=this;this.$swal({text:"是否删除 [ "+e.name+" ]",type:"warning",showCancelButton:!0,icon:"warning",confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"删除",cancelButtonText:"取消"}).then((function(n){n.value?o(e.sequence_id).then((function(e){i.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3}),i.list.splice(t,1),i.getList()})).catch((function(e){console.log(e.response.data),i.$notify({title:"Failed",message:"Delete failed",type:"error",duration:2e3})})):i.$notify({title:"取消",message:"Delete canceled",type:"warning",duration:2e3})}))},handleFetchPv:function(e){var t=this;fetchPv(e).then((function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0}))},handleDownload:function(){var e=this;this.multipleSelection.length?(this.downloadLoading=!0,Promise.all([i.e("chunk-6e87ca78"),i.e("chunk-224816de"),i.e("chunk-2133cd4f")]).then(i.bind(null,"4bf8")).then((function(t){var i=["Id","Title","Author","Readings","Date"],n=["id","title","author","pageviews","display_time"],a=e.multipleSelection;console.log("选择的列表",a);var s=e.formatJson(n,a);t.export_json_to_excel({header:i,data:s,filename:"测试"}),e.$refs.multipleTable.clearSelection(),e.downloadLoading=!1}))):this.$message({message:"Please select at least one item",type:"warning"})},handleSelectionChange:function(e){this.multipleSelection=e},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"}}},_=w,x=(i("1692"),Object(h["a"])(_,n,a,!1,null,"259f3a38",null));t["default"]=x.exports},"333d":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[i("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},a=[];i("a9e3");Math.easeInOutQuad=function(e,t,i,n){return e/=n/2,e<1?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t)};var s=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function l(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(e,t,i){var n=r(),a=e-n,o=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=o;var r=Math.easeInOutQuad(c,n,a,t);l(r),c<t?s(e):i&&"function"===typeof i&&i()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&o(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&o(0,800)}}},u=c,d=(i("e498"),i("2877")),p=Object(d["a"])(u,n,a,!1,null,"6af373ef",null);t["a"]=p.exports},6724:function(e,t,i){"use strict";i("8d41");var n="@@wavesContext";function a(e,t){function i(i){var n=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),s=a.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var l=s.getBoundingClientRect(),r=s.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",s.appendChild(r)),a.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(i.pageY-l.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(i.pageX-l.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=a.color,r.className="waves-ripple z-active",!1}}return e[n]?e[n].removeHandle=i:e[n]={removeHandle:i},i}var s={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[n].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[n].removeHandle,!1),e[n]=null,delete e[n]}},l=function(e){e.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(l)),s.install=l;t["a"]=s},"8d41":function(e,t,i){},b438:function(e,t,i){},e498:function(e,t,i){"use strict";var n=i("1c18"),a=i.n(n);a.a}}]);