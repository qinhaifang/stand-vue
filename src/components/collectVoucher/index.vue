<template>
  <!--新增采集凭证-->
  <H-dialog
    :visible.sync="isShowCollectVoucher"
    @on-submit="handleConfirm()"
    @on-cancel="handleCancel()"
    :noShowReturn="noShowReturn"
    class="device-drawer"
    width="30%"
    height="auto"
    :title="drawerTitle"
  >
    <H-form
      v-if="collectType === 'SSH'"
      :editFlag="disabled"
      labelWidth="150px"
      ref="collectFormList"
      :list="listSSH"
      v-model="contextSSH"
    ></H-form>
    <H-form
      v-if="collectType === 'SNMP'"
      :editFlag="disabled"
      ref="collectFormList"
      labelWidth="150px"
      :list="listSNMP"
      v-model="contextSNMP"
    ></H-form>
    <H-form
      v-if="collectType === 'Telnet'"
      :editFlag="disabled"
      ref="collectFormList"
      labelWidth="150px"
      :list="listTeinet"
      v-model="contextTeinet"
    ></H-form>
  </H-dialog>
</template>
<script>
import { sellectUrl } from "@/api/common";
import snmpMixins from "./snmpMixins";
import sshMixins from "./sshMixins";
export default {
  name: "CollectVoucher",
  mixins: [sshMixins, snmpMixins],
  model: {
    prop: "isShowCollectVoucher",
    event: "input",
  },
  computed: {
    disabled() {
      switch (this.functionType) {
        case "view":
          return true;
        case "edit":
          return false;
        default:
          return false;
      }
    },
    noShowReturn() {
      switch (this.functionType) {
        case "view":
          return false;
        case "edit":
          return true;
        default:
          return true;
      }
    },
  },
  props: {
    isShowCollectVoucher: Boolean,
    collectType: {
      type: String,
      default: "ssh",
    },
  },
  data() {
    return { drawerTitle: "新建采集凭证" };
  },
  watch: {},
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      const formData = {
        SSH: {
          url: "/param/credit/ssh/saveOrUpdate",
          data: this.contextSSH,
          reset: this.resetSsh,
        },
        SNMP: {
          url: "/param/credit/snmp/saveOrUpdate",
          data: this.contextSNMP,
          reset: this.resetSnmp,
        },
        Telnet: {
          url: "/param/credit/telnet/saveOrUpdate",
          data: this.contextTeinet,
          reset: this.resetTeinet,
        },
      };
      this.$refs.collectFormList.validate().then((valid) => {
        if (valid) {
          sellectUrl(
            formData[this.collectType].url,
            formData[this.collectType].data,
            true,
            true
          )
            .then((res) => {
              this.$emit("input", false);
              this.$emit("updateList");
              formData[this.collectType].reset();
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-input {
  width: 80% !important;
}
</style>
