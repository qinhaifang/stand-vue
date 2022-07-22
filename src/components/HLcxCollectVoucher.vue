<template>
  <hl-dialog :dialogConfig="dialogConfigCredit" v-model="visibleDialog">
    <hl-form
      ref="dialogFormSnmp"
      v-if="collectType === 'SNMP'"
      v-model="dialogFormSnmp"
      :form-config="dialogFormConfigSnmp"
    ></hl-form>
    <hl-form
      ref="dialogFormSsh"
      v-if="collectType === 'SSH'"
      v-model="dialogFormSsh"
      :form-config="dialogFormConfigSsh"
    ></hl-form>
  </hl-dialog>
</template>
<script>
import { getRandom } from "@/utils/util";
import {
  inputValidStation,
  checkCollectPort,
  validatePass,
  inputDescription,
  checkReadonlyText,
  checkWriteText,
  checkTimeout,
  checkRetryCount,
} from "@/utils/formItemValidate";
import { saveDataSnmp, saveDataSsh } from "@/api/deviceManagement";
export default {
  name: "CollectVoucher",
  model: {
    prop: "visibleDialog",
    event: "input",
  },

  props: {
    visibleDialog: Boolean,
    collectType: {
      type: String,
      default: "ssh",
    },
  },
  data() {
    return {
      dialogFormSnmp: {
        snmpVersion: 2,
        creditName: "",
        collectPort: 161,
        readOnlyCommunity: "",
        readWriteCommunity: "",
        timeout: 3,
        retryCount: 2,
      },
      dialogFormSsh: {
        sshVersion: 2,
        creditName: "",
        collectPort: 22,
        username: "",
        encodePassword: "",
        encode: "",
      },
    };
  },
  computed: {
    /**form配置 */
    dialogFormConfigSnmp() {
      return {
        layout: "flow",
        extend: { labelWidth: "152px", labelPosition: "right" },
        data: [
          {
            type: "select",
            label: "协议类型：",
            name: "snmpVersion",
            options: this.dicts.agreementType,
            rules: [
              { required: true, message: "请选择协议类型", trigger: "change" },
            ],
          },
          {
            type: "input",
            label: "协议模板名称：",
            name: "creditName",
            rules: [
              {
                required: true,
                message: "请输入协议模板名称",
                trigger: "blur",
              },
              {
                min: 1,
                max: 30,
                message: "长度不超过 30 个字符",
                trigger: "blur",
              },
              { validator: inputValidStation, trigger: "blur" },
            ],
          },
          {
            type: "number",
            label: "通讯端口：",
            name: "collectPort",
            extend: { controls: false },
            tips: "用于与在受监视设备中运行的 SNMP 代理进行通讯的端口号。",
            rules: [
              {
                type: "number",
                required: true,
                message: "请输入通讯端口",
                trigger: "blur",
              },
              { validator: checkCollectPort, trigger: "blur" },
            ],
          },
          {
            type: "input",
            label: "只读团体字：",
            name: "readOnlyCommunity",
            rules: [
              {
                required: true,
                message: "请输入只读团体字",
                trigger: "blur",
              },
              {
                min: 1,
                max: 32,
                message: "长度不超过 32 个字符",
                trigger: "blur",
              },
              { validator: checkReadonlyText, trigger: "blur" },
            ],
          },
          {
            type: "input",
            label: "读写团体字：",
            name: "readWriteCommunity",
            rules: [
              {
                min: 1,
                max: 32,
                message: "长度不超过 32 个字符",
                trigger: "blur",
              },
              { validator: checkWriteText, trigger: "blur" },
            ],
          },
          {
            type: "number",
            label: "超时时间（1-30s）：",
            extend: { controls: false },
            name: "timeout",
            tips: "与设备通讯失败后超过的时间进行重试。",
            rules: [
              {
                type: "number",
                required: true,
                validator: checkTimeout,
                trigger: "blur",
              },
            ],
          },
          {
            type: "number",
            label: "重试次数（1-3次）：",
            extend: { controls: false },
            name: "retryCount",
            tips: "与设备通讯的重试次数。",
            rules: [
              {
                type: "number",
                required: true,
                validator: checkRetryCount,
                trigger: "blur",
              },
            ],
          },
        ],
      };
    },
    /**form配置 */
    dialogFormConfigSsh() {
      return {
        layout: "flow",
        disabled: this.ifDetail,
        extend: { labelWidth: "100px", labelPosition: "right" },
        data: [
          {
            type: "select",
            label: "协议类型：",
            name: "sshVersion",
            options: this.dicts.sshVersionType,
            rules: [
              { required: true, message: "请选择协议类型", trigger: "change" },
            ],
          },
          {
            type: "input",
            label: "协议模板名称：",
            name: "creditName",
            rules: [
              {
                required: true,
                message: "请输入协议模板名称",
                trigger: "blur",
              },
              {
                min: 1,
                max: 30,
                message: "长度不超过 30 个字符",
                trigger: "blur",
              },
              { validator: inputValidStation, trigger: "blur" },
            ],
          },
          {
            type: "number",
            label: "通讯端口：",
            name: "collectPort",
            extend: { controls: false },
            tips: "确保端口没有被防火墙阻隔",
            rules: [
              {
                required: true,
                message: "请输入通讯端口",
                trigger: "blur",
              },
              { validator: checkCollectPort, trigger: "blur" },
            ],
          },
          {
            type: "input",
            label: "登录用户名：",
            name: "username",
            rules: [
              {
                required: true,
                message: "请输入登录用户名",
                trigger: "blur",
              },
              // {
              //   min: 8,
              //   max: 32,
              //   message: "长度不超过 32 个字符且不小于 8 个字符",
              //   trigger: "blur",
              // },

              { validator: inputDescription, trigger: ["blur", "change"] },
            ],
          },
          {
            type: "hlPassword",
            label: "登录密码：",
            name: "encodePassword",
            extend: {
              // showPassword: false,
              encode: this.encode,
            },
            rules: [
              {
                required: true,
                message: "请输入登录密码",
                trigger: "blur",
              },
              { validator: validatePass, trigger: ["blur", "change"] },
            ],
          },
        ],
      };
    },
    dialogConfigCredit() {
      return {
        extend: {
          width: "580px",
          title: "新建采集凭证",
          close: this.closeEventCredit,
        },
        btnData: [
          {
            text: "确定",
            clickEvent: this.submitEvent,
          },
          {
            text: "取消",
            extend: {
              plain: true,
            },
            clickEvent: this.closeEventCredit,
          },
        ],
      };
    },
  },
  watch: {},
  methods: {
    closeEventCredit() {
      this.$emit("input", false);
    },
    submitEvent() {
      if (this.collectType === "SNMP") {
        this.$refs.dialogFormSnmp.validate().then((res) => {
          saveDataSnmp(this.dialogFormSnmp).then((res) => {
            this.$emit("input", false);
            this.visibleDialog = false;
            this.$refs.dialogFormSnmp.resetForm();
            this.dialogFormSnmp = {
              snmpVersion: 2,
              creditName: "",
              collectPort: 161,
              readOnlyCommunity: "",
              readWriteCommunity: "",
              timeout: 3,
              retryCount: 2,
            };
            this.$emit("updateList");
          });
        });
      } else if (this.collectType === "SSH") {
        this.$refs.dialogFormSsh.validate().then((res) => {
          let obj = {
            ...this.dialogFormSsh,
            encode: this.encode,
          };
          saveDataSsh(obj).then((res) => {
            this.$emit("input", false);
            this.visibleDialog = false;
            this.$refs.dialogFormSsh.resetForm();
            this.dialogFormSsh = {
              sshVersion: 2,
              creditName: "",
              collectPort: 22,
              username: "",
              encodePassword: "",
              encode: "",
            };

            this.$emit("updateList");
          });
        });
      }
    },
  },
  created() {},
  mounted() {
    this.encode = getRandom(16);
  },
};
</script>
