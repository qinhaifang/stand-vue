<template>
  <div class="hl-navMenu" :class="!sidebarOpened ? 'hideSidebar' : ''">
    <!-- logo -->
    <logo
      v-if="navMenuConfig.showLogo"
      :logo="navMenuConfig.logoUrl"
      :logoSort="navMenuConfig.logoSortUrl"
      :collapse="!sidebarOpened"
    />
    <div style="height: calc(100% - 60px)" class="navContainer">
      <hl-scroll style="height">
        <el-menu
          class="menuContainer"
          :default-active="activeMenu"
          @select="handleSelect"
          :collapse="!sidebarOpened"
          :unique-opened="false"
          :collapse-transition="false"
          mode="vertical"
          :background-color="navMenuBg"
          :text-color="navMenuTextColor"
          :active-text-color="navMenuTextColor"
        >
          <sidebar-item
            v-for="(route, num) in navMenuConfig.routesList"
            :key="route.path + num"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </hl-scroll>
    </div>

    <hamburger
      :is-active="sidebarOpened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
  </div>
</template>
<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import navMenuStyle from "./../../theme-chalk/src/common/var.scss";
import hamburger from "./hamburger";
export default {
  name: "hlNavMenu",
  components: { Logo, SidebarItem, hamburger },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    navMenuConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  model: {
    event: "sidebarOpenedEvent",
  },
  data() {
    return {
      sidebarOpened: false,
      navMenuBg: navMenuStyle.navMenuBg,
      navMenuTextColor: navMenuStyle.navMenuTextColor,
    };
  },
  created() {
    this.sidebarOpened = this.value;
  },
  watch: {
    value(v) {
      this.sidebarOpened = v;
    },
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.routerParentUrl) return meta.routerParentUrl;
      else {
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      }
    },
  },
  methods: {
    toggleSideBar() {
      this.sidebarOpened = !this.sidebarOpened;
      this.$emit("sidebarOpenedEvent", this.sidebarOpened);
    },
    handleSelect() {
      this.$emit("select");
    },
  },
};
</script>
<style lang="scss">
$menuHover: #5b606f;
$menuActive: #464c59;

/*菜单关闭*/
.el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: scale(1) rotateZ(0deg);
  -ms-transform: scale(1) rotate(0deg);
  transform: scale(1) rotateZ(0deg);
}
/*菜单展开*/
#app .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: scale(1) rotateZ(0deg);
  -ms-transform: scale(1) rotate(0deg);
  transform: scale(1) rotateZ(-90deg);
}

.zdy-sub-menu .el-menu-item {
  height: 40px;
  line-height: 40px;
  margin-bottom: 14px;
  font-weight: bold;
}
.el-menu--vertical {
  & > .el-menu {
    .svg-icon {
      margin-right: 16px;
    }
    .sub-el-icon {
      margin-right: 12px;
      margin-left: -2px;
    }
  }
  .el-submenu__title {
    height: 40px;
    line-height: 40px;
    margin-bottom: 14px;
    padding: 0 20px 0 30px;
    font-size: 14px;
    font-weight: bold;
    &:hover {
      position: relative;
      background-color: $menuHover !important;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        border-radius: 0 2px 2px 0;
        height: 100%;
        background-color: #fff;
      }
    }
    i {
      color: #fff;
      font-size: 10px;
      margin-right: 14px;
      transform: scale(1);
      font-weight: 400;
    }
  }
  .nest-menu .el-submenu > .el-submenu__title,
  .el-menu-item {
    &:hover {
      // you can use $subMenuHover
      color: #fff !important;
      background-color: $menuHover !important;
    }
  }

  // the scroll bar appears when the subMenu is too long
  > .el-menu--popup {
    max-height: 100vh;
    overflow-y: auto;

    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
}
</style>
<style scoped lang="scss">
$menuHover: #5b606f;
$menuActive: #464c59;
$isOpened: #292c35;
$nav-menu-background-color: #1d1f26;
.hl-navMenu {
  width: 250px;
  height: 100%;
  position: relative;
  .navContainer {
    background: $nav-menu-background-color;
  }
  ::v-deep .menuContainer {
    height: 100%;
    padding-top: 20px;
    ::v-deep .el-menu-item {
      height: 40px;
      line-height: 40px;
      margin-bottom: 14px;
      font-weight: 600;
      i {
        color: #fff;
        font-size: 18px;
        margin-right: 14px;
        font-weight: 400;
      }
    }
    .submenu-title-noDropdown,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
      margin-bottom: 14px;
      padding: 0 20px 0 30px;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        position: relative;
        background-color: $menuHover !important;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          height: 100%;
          background-color: #fff;
        }
      }
      i {
        color: #fff;
        // font-size: 12px;
        margin-right: 14px;
        transform: scale(1);
        font-weight: 400;
      }
    }
    .el-submenu .el-menu-item {
      height: 40px;
      line-height: 40px;
      margin-bottom: 14px;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        position: relative;
        // background-color: $menuHover !important;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          height: 100%;
          background-color: #fff;
        }
      }
    }
    li.el-menu-item.is-active {
      position: relative;
      background-color: $menuActive !important;
      color: #fff !important;
      font-weight: bold;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        border-radius: 0 2px 2px 0;
        height: 100%;
        background-color: #fff;
      }
    }
    .is-active > .el-submenu__title {
      color: #fff !important;
    }
  }
  ::v-deep .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  ::v-deep.el-submenu.is-opened {
    background: $isOpened;
    & .el-submenu__title {
      background: $isOpened !important;
      &:hover {
        background-color: $menuHover !important;
      }
      // &> .el-submenu__icon-arrow{
      //     transform: scale(0.6) rotateZ(90deg);
      //   }
    }

    & .el-menu {
      background: $isOpened !important;
      .el-menu-item {
        background: $isOpened !important;
        &:hover {
          background-color: $menuHover !important;
        }
        &.is-active {
          background-color: $menuActive !important;
        }
      }
    }
  }

  .hamburger-container {
    position: absolute;
    z-index: 999;
    top: 50%;
    right: -13px;
  }
}

.hideSidebar.hl-navMenu {
  width: 74px !important;
}
.hideSidebar.hl-navMenu {
  ::v-deep .el-menu-item {
    i {
      margin-right: 0 !important;
    }
  }
}
.hideSidebar.hl-navMenu {
  ::v-deep .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;

    .el-tooltip {
      padding: 0 0 0 5px !important;

      .svg-icon {
        margin-left: 20px;
      }

      .sub-el-icon {
        margin-left: 19px;
      }
    }
  }
  ::v-deep .el-submenu {
    overflow: hidden;
    & > .el-submenu__title {
      padding: 0 0 0 5px !important;

      .svg-icon {
        margin-left: 20px;
      }

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    ::v-deep .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}
</style>
