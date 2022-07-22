<template>
  <div>
    <div class="searchContainer">
      <div class="isFlex"></div>
      <hl-button
        :buttonConfig="{
          text: '新增',
          clickEvent: this.handleAdd
        }"
      ></hl-button>
    </div>
    <div class="table">
      <hl-table ref="tables" :table-config="tableConfig"></hl-table>
    </div>
    <hl-dialog :dialogConfig="dialogConfig" v-model="visibleDialog">
      <hl-form
        ref="dialogForm"
        v-model="dialogForm"
        :form-config="dialogFormConfig"
      ></hl-form>
    </hl-dialog>
  </div>
</template>
<script>
import { checkCollectPort } from "@/utils/formItemValidate";
import { saveOrUpdate, findById, deleteById } from "@/api/system";
export default {
  data() {
    return {
      dialogTitle: "",
      apiRequest: false,
      dialogForm: {
        application: "",
        agreementName: "",
        port: "",
        describes: "",
        safetyZoneName: ""
      },
      ifDetail: false, // 是否是详情 默认false
      visibleDialog: false, // 弹框默认不展示
      searchForm: {}
    };
  },
  computed: {
    tableConfig() {
      return {
        results: [],
        autoHeight: true,
        showLoading: false,
        data: [
          {
            name: "application",
            label: "应用",
            scopeHeader: true,
            extend: {
              sortable: false,
              classExtend: "formInlineBlock"
            },
            callback: (v) => {
              this.searchForm.application = v;
              this.$refs.tables.getTableData();
            }
          },
          {
            name: "port",
            label: "端口号",
            scopeHeader: true,
            extend: {
              sortable: false,
              classExtend: "formInlineBlock"
            },
            callback: (v) => {
              this.searchForm.port = v;
              this.$refs.tables.getTableData();
            }
          },

          {
            name: "agreementName",
            label: "协议名称",
            scopeHeader: true,
            extend: {
              sortable: false,
              classExtend: "formInlineBlock"
            },
            callback: (v) => {
              this.searchForm.agreementName = v;
              this.$refs.tables.getTableData();
            }
          },
          {
            name: "safetyZoneName",
            label: "安全区",
            scopeHeader: true,
            extend: {
              sortable: false,
              classExtend: "formInlineBlock"
            },
            callback: (v) => {
              this.searchForm.safetyZoneName = v;
              this.$refs.tables.getTableData();
            }
          },
          {
            name: "operation",
            label: "操作",
            type: "operation",
            data: [
              {
                content: "查看",
                icon: "iconchakan",
                visibleIcon: true,
                visibleTooltip: true,
                clickEvent: (row) => {
                  this.ifDetail = true;
                  this.apiRequest = true;
                  this.dialogForm = row;
                  this.dialogTitle = "查看映射";
                  this.visibleDialog = true;
                }
              },
              {
                content: "编辑",
                icon: "iconbianji",
                visibleIcon: true,
                visibleTooltip: true,
                clickEvent: (row) => {
                  this.ifDetail = false;
                  this.dialogForm = row;
                  this.apiRequest = true;
                  this.dialogTitle = "编辑映射";
                  this.visibleDialog = true;
                }
              },
              {
                content: "删除",
                icon: "iconshanchu",
                visibleIcon: true,
                visibleTooltip: true,
                type: "danger",
                clickEvent: (row) => {
                  const { id } = row;
                  deleteById({ id }).then((res) => {
                    this.$refs.tables.getTableData();
                  });
                }
              }
            ]
          }
        ],
        http: {
          url: "/system/mappingmManagement/findListByParam",
          params: this.searchForm
        }
      };
    },
    dialogFormConfig() {
      return {
        layout: "flow",
        apiRequest: this.apiRequest,
        disabled: this.ifDetail,
        showLoading: false,
        extend: {
          labelWidth: "65px",
          labelPosition: "right"
        },
        http: {
          url: "/system/mappingmManagement/findById",
          params: this.dialogForm
        },
        data: [
          {
            type: "input",
            label: "应用名称",
            name: "application",
            rules: [
              {
                required: true,
                message: "请输入应用名称",
                trigger: "blur"
              }
            ]
          },
          {
            type: "input",
            label: "端口号",
            name: "port",
            extend: {
              disabled: this.ifDetail,
              controls: false
            },

            rules: [{ validator: checkCollectPort, trigger: "blur" }]
          },
          {
            type: "input",
            label: "协议名称",
            name: "agreementName",
            extend: {
              disabled: this.ifDetail
            },

            rules: [
              { required: true, message: "请输入协议名称", trigger: "blur" }
            ]
          },
          {
            type: "textarea",
            label: "描述",
            name: "describes",
            extend: {
              disabled: this.ifDetail
            }
          }
        ]
      };
    },
    dialogConfig() {
      return {
        extend: {
          width: "445px",
          title: this.dialogTitle,
          close: () => {
            this.visibleDialog = false;
          }
        },
        btnData: [
          {
            text: "确定",
            visible: this.ifDetail,
            clickEvent: () => {
              saveOrUpdate(this.dialogForm).then((res) => {
                this.$refs.tables.getTableData();
                this.visibleDialog = false;
              });
            }
          },
          {
            text: "取消",
            extend: {
              plain: true
            },
            clickEvent: () => {
              this.visibleDialog = false;
            },
            visible: this.ifDetail
          },
          {
            text: "返回",
            plain: true,
            clickEvent: () => {
              this.visibleDialog = false;
            },
            visible: !this.ifDetail
          }
        ]
      };
    }
  },
  methods: {
    handleAdd() {
      this.visibleDialog = true;
      this.apiRequest = false;
      this.ifDetail = false;
      this.dialogForm = {
        application: "",
        agreementName: "",
        port: "",
        describes: ""
      };
      this.dialogTitle = "新增映射";
    }
  }
};
</script>
