import { inputValidSpecial, validateChinese } from "@/venders/validate";
export default {
  data() {
    // 采集凭证模板名称
    let inputValidStation = (rule, value, callback) => {
      if (value && inputValidSpecial(value)) {
        callback(new Error("请输入正确的协议模板名称"));
      } else {
        callback();
      }
    };
    // 通讯端口
    let checkCollectPort = (rule, value, callback) => {
      if (!Number.isInteger(parseFloat(value))) {
        callback(new Error("请输入正确的端口号"));
      } else {
        if (/^[0-9]\d*$/.test(value) === false) {
          callback(new Error("请输入正确的端口号"));
        } else {
          if (value > 65535) {
            callback(new Error("请输入正确的端口号"));
          } else if (value < 1) {
            callback(new Error("请输入正确的端口号"));
          } else {
            callback();
          }
        }
      }
    };
    // 超时时间
    let checkTimeout = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入正确的超时时间"));
      } else {
        if (/^[1-9]\d*$/.test(value) === false) {
          callback(new Error("请输入正确的超时时间"));
        } else {
          if (value > 30) {
            callback(new Error("请输入正确的超时时间"));
          } else {
            callback();
          }
        }
      }
    };
    // 重试次数
    let checkRetryCount = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入正确的重试次数"));
      } else {
        if (/^[1-9]\d*$/.test(value) === false) {
          callback(new Error("请输入正确的重试次数"));
        } else {
          if (value > 3) {
            callback(new Error("请输入正确的重试次数"));
          } else {
            callback();
          }
        }
      }
    };
    // 只读团体字
    let checkReadonlyText = (rule, value, callback) => {
      if (value && validateChinese(value)) {
        callback(new Error("请输入正确的只读团体字"));
      } else {
        callback();
      }
    };
    // 读写团体字
    let checkWriteText = (rule, value, callback) => {
      if (validateChinese(value)) {
        callback(new Error("请输入正确的读写团体字"));
      } else {
        callback();
      }
    };
    return {
      listSNMP: [
        {
          name: "snmpVersion",
          label: "协议类型",
          type: "select",
          width: 2,
          option: [
            {
              label: "SNMPV1/V2",
              value: 2,
            },
            {
              label: "SNMPV3",
              value: 3,
              editFlag: true,
            },
          ],
          rules: [
            {
              required: true,
              message: "请选择协议类型",
              trigger: "change",
            },
          ],
        },
        {
          name: "creditName",
          label: "协议模板名称",
          type: "input",
          placeholder: "请输入协议模板名称",
          width: 2,
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
            { validator: inputValidStation, trigger: ["blur", "change"] },
          ],
        },
        {
          name: "collectPort",
          label: "通讯端口",
          type: "input",
          appendEnd: {
            icon: "iconwenti",
            msg: "用于与在受监视设备中运行的 SNMP 代理进行通讯的端口号。",
          },
          width: 2,
          rules: [
            {
              type: "number",
              required: true,
              validator: checkCollectPort,
              trigger: "blur",
            },
          ],
        },
        {
          name: "readOnlyCommunity",
          label: "只读团体字",
          type: "input",
          width: 2,
          rules: [
            { required: true, message: "请输入只读团体字", trigger: "blur" },
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
          name: "readWriteCommunity",
          label: "读写团体字",
          type: "input",
          width: 2,
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
          name: "timeout",
          label: "超时时间（1-30s）",
          type: "number",
          appendEnd: {
            icon: "iconwenti",
            msg: "与设备通讯失败后超过的时间进行重试。",
          },
          width: 2,
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
          name: "retryCount",
          label: "重试次数（1-3次）",
          type: "number",
          appendEnd: {
            icon: "iconwenti",
            msg: "与设备通讯的重试次数。",
          },
          width: 2,
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
      tableData: [],

      contextSNMP: {
        snmpVersion: 2,
        collectPort: 161,
        timeout: 3,
        retryCount: 2,
      },
    };
  },
  methods: {
    resetSnmp() {
      this.contextSNMP = {
        snmpVersion: 2,
        collectPort: 161,
        timeout: 3,
        retryCount: 2,
      };
    },
  },
};
