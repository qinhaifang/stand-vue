<template>
  <div class="hlcx-form">
    <el-form
      class="pane_form"
      :model="deviceFormList"
      ref="deviceFormList"
      :rules="deviceFormListRules"
    >
      <H-title title="维护信息"> </H-title>
      <el-row>
        <el-col :span="11">
          <el-form-item label="设备管理IP地址" prop="manageIp">
            <el-input type="text" v-model="deviceFormList.manageIp"></el-input>
            <!-- <span>{{ deviceFormList.manageIp }}</span> -->
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="采集凭证" prop="creditId">
            <el-select v-model="deviceFormList.creditId" placeholder="请选择">
              <el-option
                v-for="item in creditList"
                :key="item.id"
                :label="item.creditName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <span class="addCollectTemplate">新建采集模板</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="网络名称" prop="netPlaneId">
            <el-select v-model="deviceFormList.netPlaneId" placeholder="请选择">
              <el-option
                v-for="item in networkOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="设备类型" prop="deviceType">
            <el-select
              v-model="deviceFormList.deviceType"
              placeholder="请选择"
              @change="handleDeviceTypeChange"
            >
              <el-option
                v-for="item in deviceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button type="" @click="getInfoData" class="getInfo">
              <span class="btn_text">获取信息</span>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="交换机类型" v-if="showExchange" prop="ssFlag">
            <el-radio v-model="deviceFormList.ssFlag" :label="2"
              >实时交换机</el-radio
            >
            <el-radio v-model="deviceFormList.ssFlag" :label="3"
              >非实时交换机</el-radio
            >
          </el-form-item>
        </el-col>
      </el-row>

      <H-title title="关联信息"> </H-title>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备名称" prop="hostName">
            <span>{{ deviceFormList.hostName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="站点名称" prop="stationName">
            <span>{{ deviceFormList.stationName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="设备简称">
            <el-input
              type="text"
              v-model="deviceFormList.deviceName"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="textarea" class="textareaLabel">
            <el-input type="textarea" readonly v-model="resultData"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备品牌" prop="brandName">
            <el-select
              v-model="deviceFormList.brandName"
              @change="handleBrandNameChange"
              :disabled="brandNameDisabled"
            >
              <el-option
                v-for="item in deviceModelList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备型号" prop="modelId">
            <!--二级菜单-->
            <el-select
              v-model="deviceFormList.modelId"
              :disabled="modelNameDisabled"
              @change="modelIdChange"
            >
              <el-option
                v-for="item in modelNameList"
                :key="item.id"
                :label="item.modelName"
                :value="item.id"
                >{{ item.modelName }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="版本号" prop="version">
            <el-select
              v-model="deviceFormList.version"
              :disabled="versionDisabled"
            >
              <el-option
                v-for="item in versionList"
                :key="item.id"
                :label="item.version"
                :value="item.id"
                >{{ item.version }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投运时间">
            <el-date-picker
              v-model="deviceFormList.useTime"
              :editable="false"
              :clearable="false"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <span>是否开启信息采集</span>
            <el-switch
              v-model="deviceFormList.startStatus"
              active-value="1"
              inactive-value="0"
              active-color="#20d2a6"
              inactive-color="#b7b7b7"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// import {
//   deviceGetAllCreditForDevice,
//   deviceFindBrandListByType,
//   deviceFindModelListByBrandAndType,
//   findListByParam,
//   deviceFindVersionByModelId,
//   deviceGetDeviceCollectData,
// } from "@/api/device";
import { getDictData } from "@/api/common";
export default {
  data() {
    let checkBoundVal = (rule, value, callback) => {
      if (/^[0-9]\d*$/.test(value) === false) {
        callback(new Error("请输入正确的一般告警"));
      } else {
        callback();
      }
    };
    return {
      creditList: [], // 采集凭证数据,
      networkOptions: [], // 网络平面数据
      getDictDataList: "", // 字典表
      deviceModelList: [], // 设备品牌数据
      versionList: [], // 所有版本号
      showExchange: false, // 是否展示交换机
      brandNameDisabled: true, // 设备品牌默认禁用
      modelNameDisabled: true, // 设备类型默认禁用
      versionDisabled: true, // 版本号默认禁用
      deviceTypeOptions: [
        {
          value: 1,
          label: "路由器",
        },
        {
          value: 2,
          label: "交换机",
        },
      ], // 设备类型
      deviceFormList: {
        id: "",
        deviceId: "", // 设备id
        deviceName: "", // 设备简称
        hostName: "", //  设备名称
        netPlaneId: "", // 网络平面id
        netPlaneName: "", // 网络平面
        modelId: "", //
        manageIp: "", // 管理IP
        creditId: "", // 采集凭证
        deviceType: "", // 设备类型
        brandName: "", // 设备品牌
        ssFlag: "", // 交换机类型
        modelName: "", // 设备型号
        stationId: "", // 站点名称id
        stationName: "", // 站点名称
        useTime: "", // 投运时间
        version: "", // 版本号
        startStatus: "0", // 是否开启采集开关
        deviceReceivePortList: [], // 设备接收列表
        deviceReturnPortList: [], // 设备返回列表
        collectDeviceOidList: [], // 监测指标列表
      }, // 表单数据
      deviceFormListRules: {
        hostName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度不超过 30 个字符", trigger: "blur" },
          // { validator: inputValidDeviceName, trigger: ["blur", "change"] },
        ],
        stationName: [
          {
            required: true,
            message: "请前往站点管理维护设备管理IP地址",
            trigger: "blur",
          },
        ],
        netPlaneId: [
          { required: true, message: "请选择网络名称", trigger: "change" },
        ],
        manageIp: [
          { required: true, message: "请输入设备管理IP地址", trigger: "blur" },
          // { validator: ipValidate, trigger: ["blur", "change"] },
        ],
        creditId: [
          { required: true, message: "请选择采集凭证", trigger: "change" },
        ],
        deviceType: [
          { required: true, message: "请选择设备类型", trigger: "change" },
        ],
        brandName: [
          { required: true, message: "请选择设备品牌", trigger: "change" },
        ],
        modelId: [
          {
            required: true,
            message: "请前往型号管理维护设备型号",
            trigger: "change",
          },
        ],
        ssFlag: [
          { required: true, message: "请选择交换机类型", trigger: "change" },
        ],
        version: [
          {
            required: true,
            message: "请前往型号管理维护设备版本号",
            trigger: "change",
          },
        ],
        collectFrequency: [
          { required: true, message: "请输入采集频率", trigger: "blur" },
          {
            // validator: inputValidCollectFrequency,
            trigger: ["blur"],
          },
        ],
        bound: [
          { required: true, message: "请输入一般告警", trigger: "blur" },
          // { validator: checkBoundVal, trigger: "blur" },
        ],
      }, // 表单校验
    };
  },
  async mounted() {
    const data = await getDictData();
    this.getDictDataList = data;
    this.networkOptions = this.getDictDataList.wangluomingcheng;
    this.getAllCreditForDevice(); // 获取所有采集凭证
    this.findModeList(); // 获取所有型号
    this.findVersionList(); // 获取所有版本号
  },
  methods: {
    // 设备类型改变   设备品牌可以选择 交换机显示隐藏
    handleDeviceTypeChange(val) {
      val === 2 ? (this.showExchange = true) : (this.showExchange = false);
      this.deviceFindBrandListByType();
      this.brandNameDisabled = false;
      this.modelNameDisabled = true;
      this.versionDisabled = true;
      this.$set(this.deviceFormList, "brandName", "");
      this.$set(this.deviceFormList, "modelId", "");
      this.$set(this.deviceFormList, "version", "");
    },
    // 查询采集凭证
    getAllCreditForDevice() {
      let obj = {
        creditType: 1,
      };
      deviceGetAllCreditForDevice(obj).then((res) => {
        this.creditList = res;
        console.log(this.creditList, 1111);
      });
    },
    // 获取所有品牌
    deviceFindBrandListByType() {
      let obj = {
        deviceType: this.deviceFormList.deviceType,
      };
      deviceFindBrandListByType(obj).then((res) => {
        this.deviceModelList = res;
      });
    },
    // 设备品牌改变   设备型号可以选择
    handleBrandNameChange() {
      this.modelNameDisabled = false;
      this.versionDisabled = true;
      this.findModelListByBrandAndType();
      this.$set(this.deviceFormList, "modelId", "");
      this.$set(this.deviceFormList, "version", "");
    },
    // 获取设备型号
    findModelListByBrandAndType() {
      let obj = {
        deviceType: this.deviceFormList.deviceType, // 类型
        brandName: this.deviceFormList.brandName, // 品牌
      };
      deviceFindModelListByBrandAndType(obj).then((res) => {
        this.modelNameList = res;
      });
    },
    // 设备型号改变
    modelIdChange(data) {
      this.versionDisabled = false;
      this.$set(this.deviceFormList, "version", "");
      if (data !== this.modelIdEdit) {
        // Todo
        // this.getCollectOidByModelId();
      } else {
        this.deviceFormList.collectDeviceOidList =
          this.collectDeviceOidListSave;
      }
      this.findVersionList();
    },
    // 获取所有型号
    findModeList() {
      let obj = {
        pageNum: 1,
        pageSize: 0,
      };
      findListByParam(obj).then((res) => {
        this.modelNameList = res.pageData;
      });
    },
    // 获取所有版本号
    findVersionList() {
      let obj = {
        modelId: this.deviceFormList.modelId,
      };
      deviceFindVersionByModelId(obj).then((res) => {
        this.versionList = res;
      });
    },
    // 点击获取信息
    getInfoData() {
      this.getInfoDataFun(1);
      this.brandNameDisabled = false;
      this.modelNameDisabled = false;
      this.versionDisabled = false;
    },
    // 获取信息公共方法
    getInfoDataFun(type) {
      if (
        this.deviceFormList.creditId === "" ||
        this.deviceFormList.deviceType === "" ||
        this.deviceFormList.manageIp === ""
      ) {
        this.$message.warning("请选择获取信息");
        return false;
      }
      let obj = {
        creditId: this.deviceFormList.creditId,
        deviceType: this.deviceFormList.deviceType,
        ip: this.deviceFormList.manageIp,
        deviceId: this.deviceFormList.id,
        collectDataType: type,
      };
      this.loadingGetInfo = true;
      deviceGetDeviceCollectData(obj)
        .then((res) => {
          this.loadingGetInfo = false;
          let resData = res;
          if (type === 1) {
            this.deviceFormList.hostName = resData.deviceVO.hostName; // 设备名称
            this.deviceFormList.deviceName = resData.deviceVO.deviceName; // 设备简称
            this.deviceFormList.stationName = resData.deviceVO.stationName; // 站点名称
            this.deviceFormList.stationId = resData.deviceVO.stationId; // 站点id
            this.resultData = resData.resultData; // 获取信息textarea
            this.deviceFormList.brandName = resData.deviceVO.brandName; // 品牌
            this.deviceFormList.modelId = resData.deviceVO.modelId; // 型号
            this.deviceFormList.version = resData.deviceVO.version; // 版本号
            this.getCollectOidByModelId();
          }

          // 端口信息  获取回来数据与旧数据做对比 有这条数据用旧数据，没有这条数据要push
          let arr = [];
          console.log(this.deviceFormList.deviceReturnPortList, "jiu");
          console.log(resData.devicePortList, "new");
          resData.devicePortList.map((item) => {
            // let obj = this.deviceFormList.deviceReturnPortList.find(
            //   (oldItem) => {
            //     if (oldItem.indexId === item.indexId) {
            //       item.selectedStatus = oldItem.selectedStatus;
            //       item.id = oldItem.id;
            //     }
            //     return item;
            //   }
            // );
            let obj = this.deviceFormList.deviceReturnPortList.filter(
              (itemOld) => itemOld.indexId === item.indexId
            );
            console.log(obj, 111);
            if (obj.length > 0) {
              item.selectedStatus = obj[0].selectedStatus;
              item.id = obj[0].id;
            }
            arr.push(item);
          });
          console.log(arr, "arrr");
          this.deviceFormList.deviceReturnPortList = arr;

          this.$set(
            this.deviceFormList,
            "deviceReceivePortList",
            this.deviceFormList.deviceReturnPortList
          );
          this.portSearchDataList = this.deviceFormList.deviceReturnPortList;
          this.selectedPortData();
        })
        .catch(() => {
          this.loadingGetInfo = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.hlcx-form {
  // ::v-deep .el-form-item {
  //   margin-bottom: 20px;
  // }
  // ::v-deep .el-form-item label {
  //   width: 150px;
  //   color: #000;
  //   font-weight: 500;
  //   margin-right: 8px;
  // }
  // ::v-deep .el-input__inner {
  //   width: 260px;
  // }
  .addCollectTemplate {
    color: #01ad83;
    position: absolute;
    right: 10px;
  }
  .getInfo {
    position: absolute;
    right: 0;
    background: rgba(88, 184, 130, 0.2);
    border: 1px solid #01ad83;
    border-radius: 4px;
    color: #01ad83;
  }
  .el-form-item__content .el-input {
    width: 260px;
  }
  ::v-deep .textareaLabel .el-form-item__label {
    visibility: hidden;
  }
  ::v-deep .el-form-item__content .el-textarea {
    width: 705px;
    .el-textarea__inner {
      resize: none;
      height: 90px;
    }
  }
}
</style>
