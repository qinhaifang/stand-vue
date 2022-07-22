<template>
  <div class="userManage">
    <div class="searchContainer">
      <div class="isFlex">
        <hl-form
          class="marginRight14"
          v-model="searchForm"
          ref="form"
          :form-config="formConfig"
        ></hl-form>
        <hl-button :buttonConfig="btnData"></hl-button>
      </div>
      <hl-button
        :buttonConfig="{
          text: '新增',
          clickEvent: this.handleAdd,
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
import {
  usersaveOrUpdate,
  userfindById,
  userDeleteById,
  resetUserPassword,
} from "@/api/userManager";
import {
  inputValidStation,
  inputValidateAccount,
} from "@/utils/formItemValidate";
import mixins from "@/views/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      apiRequest: true,
      searchForm: {
        status: "",
        content: "",
        searchHistoryParam: "user",
      },

      // 新增弹框配置
      dialogForm: {
        id: "",
        userName: "",
        userAccount: "",
        status: 1, //用户状态
        role: "",
        roleIdList: [],
        disabled: true,
      },
      ifDetail: false, // 是否是详情 默认false
      visibleDialog: false, // 弹框默认不展示
      dialogTitle: "新增用户",
      dialogFormParams: {},
      btnData: [
        {
          text: "查询",
          clickEvent: this.handleSearch,
        },
        {
          text: "重置",
          plain: true,
          clickEvent: this.handleReset,
        },
      ],
    };
  },
  computed: {
    /**表单配置 */
    formConfig() {
      return {
        layout: "inlineBlock",
        labelWidth: "78px",
        noMargin: true,
        data: [
          {
            type: "select",
            label: "用户状态：",
            width: 340,
            name: "status",
            options: this.dicts.DicKeyByStatus,
          },
          {
            type: "autocomplete",
            width: 300,
            labelWidth: "0",
            name: "content",
            http: {
              url: "/system/user/search", // 接口路径
              params: {
                searchHistoryParam: "user", // 查询历史参数  给后台传的唯一值
                content: "", // 传给后台得值
              },
            },
            extend: {
              placeholder: "请输入用户名称",
              callback: this.handleSearch,
            },
          },
        ],
      };
    },
    /**表格配置 */
    tableConfig() {
      return {
        results: [],
        autoHeight: true,
        data: [
          {
            name: "userName",
            label: "用户名称",
          },
          {
            name: "userAccount",
            label: "用户账号",
          },
          {
            name: "roleNames",
            label: "拥有角色",
            extend: {
              sortable: false,
            },
          },
          {
            name: "status",
            label: "用户状态",
            formatter: true,
            options: this.dicts.DicKeyByStatus,
          },
          {
            name: "createTime",
            label: "创建时间",
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
                clickEvent: this.userDetail,
              },
              {
                content: "编辑",
                icon: "iconbianji",
                visibleIcon: true,
                visibleTooltip: true,
                clickEvent: this.userEdit,
              },
              {
                content: "重置",
                icon: "iconzhongzhimima",
                visibleIcon: true,
                visibleTooltip: true,
                clickEvent: this.userReset,
              },
              {
                content: "删除",
                icon: "iconshanchu",
                visibleIcon: true,
                visibleTooltip: true,
                type: "danger",
                clickEvent: this.userDel,
              },
            ],
          },
        ],
        http: {
          url: "/system/user/findListByParam",
          params: this.searchForm,
        },
      };
    },
    /**弹框配置 */
    dialogConfig() {
      return {
        extend: {
          width: "445px",
          title: this.dialogTitle,
          close: this.closeEvent,
        },
        btnData: [
          {
            text: "确定",
            clickEvent: this.submitEvent,
            visible: this.ifDetail,
          },
          {
            text: "取消",
            extend: {
              plain: true,
            },
            clickEvent: this.closeEvent,
            visible: this.ifDetail,
          },
          {
            text: "返回",
            plain: true,
            clickEvent: this.returnEvent,
            visible: !this.ifDetail,
          },
        ],
      };
    },
    /**form配置 */
    dialogFormConfig() {
      return {
        layout: "flow",
        disabled: this.ifDetail,
        apiRequest: this.apiRequest,
        extend: {
          labelWidth: "65px",
          labelPosition: "right",
        },
        http: {
          url: "/system/user/findById",
          params: this.dialogFormParams,
          onSuccess: (res) => {
            return {
              ...res,
              role: res.roleIdList[0],
            };
          },
        },
        data: [
          {
            type: "input",
            label: "用户名称",
            name: "userName",
            rules: [
              {
                required: true,
                message: "请输入用户名称",
                trigger: "blur",
              },
              {
                min: 1,
                max: 10,
                message: "长度不超过 10 个字符",
                trigger: "blur",
              },
              {
                validator: inputValidStation,
                trigger: ["blur", "change"],
              },
            ],
          },
          {
            type: "input",
            label: "用户账号",
            name: "userAccount",
            extend: {
              disabled: this.ifDetail,
            },

            rules: [
              { required: true, message: "请输入用户账号", trigger: "blur" },
              {
                min: 1,
                max: 30,
                message: "长度不超过 30 个字符",
                trigger: "blur",
              },
              {
                validator: inputValidateAccount,
                trigger: ["blur", "change"],
              },
            ],
          },
          {
            type: "select",
            label: "角色类型",
            name: "role",
            extend: {
              disabled: this.ifDetail,
            },

            props: {
              value: "id",
              label: "roleName",
            },
            http: {
              url: "/system/role/findRoleNameAll",
              method: "post",
              onSuccess: (res) => {
                res.map((item) => {
                  if (item.status === 0) {
                    item.disabled = true;
                  }
                });
                return res;
              },
            },
            rules: [
              { required: true, message: "请选择角色类型", trigger: "change" },
            ],
          },
          {
            type: "switch",
            label: "用户状态",
            name: "status",
            extend: {
              activeValue: 1,
              inactiveValue: 0,
              disabled: this.ifDetail,
            },
          },
        ],
      };
    },
  },
  mounted() {},
  methods: {
    // 新增
    handleAdd() {
      this.dialogForm = this.$options.data().dialogForm;
      this.dialogTitle = "新增用户";
      this.dialogFormParams = {
        id: "",
      };
      this.visibleDialog = true;
      this.apiRequest = false;
      this.ifDetail = false;
      this.$refs.form.resetForm();
    },
    // 查看
    userDetail(item) {
      this.ifDetail = true;
      this.dialogTitle = "查看用户";
      this.dialogFormParams = {
        id: item.id,
      };
      this.apiRequest = true;
      this.visibleDialog = true;
    },
    // 编辑
    userEdit(item) {
      this.ifDetail = false;
      this.dialogTitle = "编辑用户";
      this.apiRequest = true;
      this.dialogFormParams = {
        id: item.id,
      };
      this.visibleDialog = true;
    },
    // 重置密码
    userReset(item) {
      this.$notice.confirm({
        title: "确认信息",
        msg: "您确定要重置密码吗？",
        params: { id: item.id },
        onSubmit: this.handleResetPassword,
      });
    },
    handleResetPassword(params) {
      resetUserPassword(params).then((res) => {
        this.freshTable();
      });
    },
    // 返回
    returnEvent() {
      this.visibleDialog = false;
      this.dialogForm = this.$options.data().dialogForm;
    },
    // 删除
    userDel(item) {
      this.$notice.confirm({
        msg: "确定要删除么？",
        title: "删除",
        params: { id: item.id },
        onSubmit: this.handleDel,
      });
    },
    handleDel(params) {
      userDeleteById(params).then(() => {
        this.freshTable();
      });
    },
    // 点击确定
    submitEvent() {
      this.$refs.dialogForm.validate().then((res) => {
        const formData = {
          ...this.dialogForm,
          roleIdList: [this.dialogForm.role],
        };
        // 向后台发送请求
        usersaveOrUpdate(formData).then((res) => {
          this.visibleDialog = false;
          this.freshTable();
          this.dialogForm = this.$options.data().dialogForm;
        });
      });
    },
    // 点击取消
    closeEvent() {
      this.visibleDialog = false;
    },
  },
};
</script>
<style scoped lang="scss"></style>
