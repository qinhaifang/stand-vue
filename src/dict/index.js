export const DicKeyByStatus = [
  { label: "请选择", value: "" },
  { label: "启用", value: 1 },
  { label: "禁用", value: 0 },
];
// 菜单类型
export const menuType = [
  { label: "目录", value: 1 },
  { label: "菜单", value: 2 },
  { label: "按钮", value: 3 },
];
export const menuHidden = [
  { label: "显示", value: 1 },
  { label: "隐藏", value: 0 },
];
// 操作系统类型
export const osType = [
  // { label: "全部", value: "" },
  { label: "Linux", value: "1" },
  { label: "Windows", value: "0" },
];
export const osTypeStr = [
  { label: "Linux", value: 1 },
  { label: "Windows", value: 0 },
];
export const groupNumType = [
  { label: "字母排序", value: 1 },
  { label: "数字排序", value: 0 },
];

// snmp协议类型
export const agreementType = [
  { label: "SNMPV1/V2", value: 2 },
  { label: "SNMPV3", value: 3 },
];
// ssh协议类型
export const sshVersionType = [
  { label: "SSH1", value: 1 },
  { label: "SSH2", value: 2 },
];
// Telnet协议类型
export const telnetVersionType = [{ label: "Telnet", value: 1 }];
// 设备属性
export const deviceCategory = [
  { label: "主机设备", value: 1 },
  { label: "网络设备", value: 2 },
];
// 设备类型
export const deviceType = [
  { label: "服务器", value: 1 },
  { label: "工作站", value: 2 },
  { label: "路由器", value: 3 },
  { label: "交换机", value: 4 },
];
// 主机设备类型
export const hostDeviceType = [
  { label: "服务器", value: 1 },
  { label: "工作站", value: 2 },
];
// 网络设备类型
export const networkDeviceType = [
  { label: "路由器", value: 3 },
  { label: "交换机", value: 4 },
];
// 采集频率管理 监测指标类型
export const targetType = [
  { label: "软件指标", value: 1 },
  { label: "硬件指标", value: 2 },
];
// 监控阈值管理 监测指标类型
export const collecttargetType = [{ label: "软件指标", value: 1 }];
// 监控阈值 告警等级
export const warnLevelList = [
  {
    value: "2",
    label: "一般",
  },
  {
    value: "3",
    label: "严重",
  },
  {
    value: "4",
    label: "紧急",
  },
];
// 链路类型
export const relaTypeList = [
  { label: "物理链路", value: 1 },
  { label: "逻辑链路", value: 2 },
];
// 采集凭证
export const credit = [
  { label: "SNMP", value: 1 },
  { label: "SSH", value: 2 },
];
// 网络设备 采集凭证
export const creditDevice = [
  { label: "SNMP", value: 1 },
  { label: "SNMP+SSH", value: 2 },
];
// 采集凭证
export const hostStatus = [
  { label: "正常", value: 1 },
  { label: "异常", value: 2 },
];
// ip地址状态
export const ipStatus = [
  { label: "广播", value: 5 },
  { label: "网络", value: 4 },
  { label: "空闲", value: 3 },
  { label: "未纳管", value: 2 },
  { label: "纳管", value: 1 },
];
// 子网掩码
export const maskData = [
  { label: "255.255.255.0", value: "255.255.255.0" },
  { label: "255.255.255.128", value: "255.255.255.128" },
  { label: "255.255.255.192", value: "255.255.255.192" },
  { label: "255.255.255.224", value: "255.255.255.224" },
  { label: "255.255.255.240", value: "255.255.255.240" },
  { label: "255.255.255.248", value: "255.255.255.248" },
  { label: "255.255.255.252", value: "255.255.255.252" },
  { label: "255.255.255.255", value: "255.255.255.255" },
];
// 设备详情 最新状态
export const newsetStatusDevice = [
  {
    value: "2",
    label: "一般",
  },
  {
    value: "3",
    label: "严重",
  },
  {
    value: "4",
    label: "紧急",
  },
  {
    value: "1",
    label: "正常",
  },
  {
    value: "0",
    label: "未开启采集",
  },
];
//板卡端口状态
export const cardPortStatus = [
  { value: 3, label: "正常" },
  { value: 11, label: "正常" },
  { value: 13, label: "正常" },
  { value: 15, label: "正常" },
  { value: 16, label: "正常" },
  { value: 4, label: "不正常" },
  { value: 12, label: "不正常" },
  { value: 17, label: "不正常" },
  { value: 1, label: "未知" },
  { value: 2, label: "未知" },
];
//端口状态
export const portStatus = [
  { value: "1", label: "up" },
  { value: "2", label: "down" },
  { value: "3", label: "testing" },
];
export let dictData = {};
export const setDictData = (data) => {
  dictData = data;
};
export const zmData = [
  { label: "A", value: "A", key: 0, keyLabel: 1 },
  { label: "B", value: "B", key: 1, keyLabel: 2 },
  { label: "C", value: "C", key: 2, keyLabel: 3 },
  { label: "D", value: "D", key: 3, keyLabel: 4 },
  { label: "E", value: "E", key: 4, keyLabel: 5 },
  { label: "F", value: "F", key: 5, keyLabel: 6 },
  { label: "G", value: "G", key: 6, keyLabel: 7 },
  { label: "H", value: "H", key: 7, keyLabel: 8 },
  { label: "I", value: "I", key: 8, keyLabel: 9 },
  { label: "J", value: "J", key: 9, keyLabel: 10 },
  { label: "K", value: "K", key: 10, keyLabel: 11 },
  { label: "L", value: "L", key: 11, keyLabel: 12 },
  { label: "M", value: "M", key: 12, keyLabel: 13 },
  { label: "N", value: "N", key: 13, keyLabel: 14 },
  { label: "O", value: "O", key: 14, keyLabel: 15 },
  { label: "P", value: "P", key: 15, keyLabel: 16 },
  { label: "Q", value: "Q", key: 16, keyLabel: 17 },
  { label: "R", value: "R", key: 17, keyLabel: 18 },
  { label: "S", value: "S", key: 18, keyLabel: 19 },
  { label: "T", value: "T", key: 19, keyLabel: 20 },
  { label: "U", value: "U", key: 20, keyLabel: 21 },
  { label: "V", value: "V", key: 21, keyLabel: 22 },
  { label: "W", value: "W", key: 22, keyLabel: 23 },
  { label: "X", value: "X", key: 23, keyLabel: 24 },
  { label: "Y", value: "Y", key: 24, keyLabel: 25 },
  { label: "Z", value: "Z", key: 25, keyLabel: 26 },
];
