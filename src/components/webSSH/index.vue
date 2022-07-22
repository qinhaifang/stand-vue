<template>
  <div
    class="console"
    ref="terminal"
    :style="{ width: '100%', height: (zdyHeight || clientHeight - 220) + 'px' }"
  ></div>
</template>
<script>
import Terminal from "./Xterm";

export default {
  name: "Console",
  props: {
    terminalSocket: {
      type: WebSocket,
    },
    item: {
      type: Object,
    },
    disableStdin: {
      type: Boolean,
      default: false,
    },
    ip: String,
    uuid: String,
    zdyHeight: Number,
    quitFlag: Boolean,
    deviceId: String,
    msg: String,
  },
  data() {
    return {
      copy: "",
      clientHeight: document.body.clientHeight,
      term: null,
      fitAddon: null,
      backKey: false,
      commandStr: "",
    };
  },
  mounted() {
    this.initTerminal();
    window.onresize = () => {
      return (() => {
        this.clientHeight = document.body.clientHeight;
      })();
    };
  },
  methods: {
    writeTerm(msg) {
      this.term.write(msg);
    },
    // 内容全屏显示-窗口大小发生改变时
    resizeScreen(size) {
      console.log("size", size);
      try {
        this.fitAddon.fit();

        // 窗口大小改变时触发xterm的resize方法，向后端发送行列数，格式由后端决定
        this.term.onResize((size) => {
          // this.onSend({ Op: "resize", Cols: size.cols, Rows: size.rows });
        });
      } catch (e) {
        console.log("e", e.message);
      }
    },
    getFocus() {
      this.term.focus();
    },
    initTerminal() {
      this.term = new Terminal({
        cols: 1000,
        rows: 100, //行数
        rendererType: "canvas", //渲染类型
        // cols: parseInt(_this.cols), // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, //启用时，光标将设置为下一行的开头
        disableStdin: this.disableStdin, //是否应禁用输入。
        cursorStyle: "underline", //光标样式
        rightClickSelectsWord: true,
        cursorBlink: true, //光标闪烁
        theme: {
          foreground: "#fff", //字体
          background: "#232323", //背景色
          cursor: "help", //设置光标
          lineHeight: 16,
          padding: 20,
        },
        // tabStopWidth: 4,
        height: this.zdyHeight || document.body.clientHeight - 220,
      });
      let terminalContainer = this.$refs.terminal;
      this.term.open(terminalContainer, true);
      this.term.fit();
      this.term.focus();
      this.term.toggleFullScreen(); //全屏
      // 记录命令
      var cmd = "";
      var code = "";
      this.term.on("data", (command) => {
        if (!this.quitFlag) {
          this.$emit("sendMessage", command);
        }
      });
      this.term.on("selection", () => {
        if (this.term.hasSelection()) {
          this.copy = this.term.getSelection();
          this.$emit("handleCopy", this.copy);
        }
      });
      // 监听键盘输入事件
      this.term.onKey((e) => {
        /*
                esc = 27
                回车 = 13
                上下左右 = 37,38,39,40
            */
        code = e.domEvent.which;
        if (code === 13) {
          if (this.quitFlag) {
            this.quitFlag = false;
            this.$emit("relogn", this.uuid);
          }
        }
      });
    },
  },
  beforeDestroy() {
    // this.term.destroy();
  },
};
</script>
<style scoped>
.console {
  padding: 0 20px;
  background: #232323;
}
</style>
