<template>
  <div :class="classObj" class="app-wrapper">
    
    <el-header height="80px">
      <img src="../../assets/game.png" class="hearImg">
      <span class="hearSpan">一起玩管理后台</span>
    </el-header>
    
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        device() {
            return this.$store.state.app.device
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
    margin-top: 80px;
    .el-header {
        width: 100%;
        background: rgb(48, 65, 86);
        line-height: 80px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
    }
    .hearSpan {
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
        font-weight: 700;
        font-style: normal;
        font-size: 36px;
        color: #ffffff;
        vertical-align: middle;
    }
    .hearImg {
        width: 100px;
        padding-left: 20px;
        vertical-align: middle;
    }
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}
</style>
