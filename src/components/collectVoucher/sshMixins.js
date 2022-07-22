import {
  inputValidSpecial,
  validateSpace,
  validateChinese,
} from "@/venders/validate";
import { getRandom, encrypt, decrypt } from "@/global/utils";
import { alert } from "@/global/utils/notice";
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
    // 验证密码
    let validatePass = (rule, value, callback) => {
      value = decrypt(value, this.encode);
      var reg =
        /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,15}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value) && !validateSpace(value)) {
        callback(new Error("请输入正确格式的密码"));
      }
      // else if (value.toString().length < 8 || value.toString().length > 32) {
      //   callback(new Error("请输入正确格式的密码"));
      // }
      else {
        callback();
      }
    };
    // 验证用户名
    let inputDescription = (rule, value, callback) => {
      if (value && validateChinese(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    return {
      listSSH: [
        {
          name: "sshVersion",
          label: "协议类型",
          type: "select",
          width: 2,
          option: [
            {
              label: "SSH1",
              value: 1,
            },
            {
              label: "SSH2",
              value: 2,
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
            msg: "确保端口没有被防火墙阻隔",
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
          name: "username",
          label: "登录用户名",
          type: "input",
          width: 2,
          rules: [
            { required: true, message: "请输入登录用户名", trigger: "blur" },
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
          name: "encodePassword",
          label: "登录密码",
          type: "passwordEncode",
          width: 2,
          encode: "",
          rules: [
            { required: true, message: "请输入登录密码", trigger: "blur" },
            { validator: validatePass, trigger: "blur" },
          ],
        },
      ],
      contextSSH: {
        sshVersion: 2,
        collectPort: 22,
        encode: "",
        encodePassword: "",
      },
      encode: "",
    };
  },
  watch: {
    isShowCollectVoucher(flag) {
      if (flag && this.collectType === "SSH") {
        if (this.contextSSH.encode) {
          this.listSSH[4].encode = this.contextSSH.encode;
          this.encode = this.contextSSH.encode;
        } else {
          this.contextSSH.encode = getRandom(16);
          this.listSSH[4].encode = this.contextSSH.encode;
          this.encode = this.contextSSH.encode;
        }
      }
    },
  },
  mounted() {
    if (this.collectType === "SSH") {
      this.contextSSH.encode = getRandom(16);
      this.encode = this.contextSSH.encode;
    }
  },
  methods: {
    resetSsh() {
      this.contextSSH = {
        sshVersion: 2,
        collectPort: 22,
        encode: this.encode,
      };
    },
  },
};
