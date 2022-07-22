<template>
  <div>
    <webssh
      :zdyHeight="500"
      :disableStdin="true"
      class="clipboardObj termPing"
      ref="termPing"
    ></webssh>
  </div>
</template>
<script>
import webssh from "@/components/webSSH/index.vue";
import { systemCommandPing } from "@/api/common";
export default {
  name: "HlcxPing",
  components: { webssh },
  props: {
    ip: String,
  },
  mounted() {
    this.$nextTick(() => {
      systemCommandPing({
        ip: this.ip,
      }).then((res) => {
        this.$refs.termPing.writeTerm(res.result);
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.termPing {
  padding: 20px;
}
</style>
