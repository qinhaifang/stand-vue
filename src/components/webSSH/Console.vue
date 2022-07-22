<template>
  <div class="console" id="terminal" style="height: 600px"></div>
</template>
<script>
import Terminal from "./Xterm";
const style = {
  width: 600,
  height: 600,
};

const action = (type, data) =>
  JSON.stringify({
    type,
    ...data,
  });

export default {
  name: "Console",
  props: {
    deviceId: String,
  },
  data() {
    return {
      terminal: {
        pid: 1,
        name: "terminal",
        cols: 400,
        rows: 400,
      },
      term: null,
      commandStr: "",
      terminalSocket: null,
    };
  },
  methods: {
    currentGeometry() {
      const columns = parseInt(window.innerWidth / style.width, 10) - 1;
      const rows = parseInt(window.innerHeight / style.height, 10);
      return { columns, rows };
    },
    resizeTerm(term, ws) {
      const { columns, rows } = this.currentGeometry();
      term.resize(columns, rows);
    },
  },
  mounted() {
    this.term = new Terminal({
      cols: 120,
      rows: 24,
      scrollback: 100,
      tabStopWidth: 4,
      cursorBlink: true, // 光标闪烁
      cursorStyle: "underline", //光标样式
      convertEol: true, //启用时，光标将设置为下一行的开头
      // disableStdin: false, //是否应禁用输入。
      ...style,
      theme: {
        foreground: "yellow", //字体
        background: "#060101", //背景色
      },
    });
    this.term.on("data", (command) => {
      this.terminalSocket.send(
        action("TERMINAL_COMMAND", {
          command,
        })
      );
    });

    this.terminalSocket.onopen = () => {
      this.terminalSocket.send(action("TERMINAL_INIT"));
      this.terminalSocket.send(action("TERMINAL_READY"));
      let terminalContainer = document.getElementById("terminal");
      // this.resizeTerm(this.term, this.terminalSocket);
      this.term.open(terminalContainer, true);
      this.term.fit();
      this.term.toggleFullScreen(); //全屏
    };

    this.terminalSocket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      switch (data.type) {
        case "TERMINAL_PRINT":
          this.term.write(data.text);
      }
    };

    this.terminalSocket.onerror = (e) => {
      console.log(e);
    };

    this.terminalSocket.onclose = (e) => {
      console.log(e);
      this.term.destroy();
      window.toolsTopo.dialog.visible = false;
    };
  },
  beforeDestroy() {
    this.term.destroy();
    this.terminalSocket.close();
    window.toolsTopo.dialog.visible = false;
  },
};
</script>
