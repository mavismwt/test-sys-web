<template>
  <div class="layout-left">
    <el-menu
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#324157"
      :default-active="$route.path"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      :router= "true"
    >
      <template v-for="one in items">
        <template v-if="one.subs">
          <el-submenu
            :index="one.index"
            :key="one.index"
          >
            <template slot="title">
              <i :class="one.icon"></i>
              <span>{{one.title}}</span>
            </template>
            <template v-for="two in one.subs">
              <el-menu-item-group :key='two.index'>
                <el-menu-item :index='two.index'>{{two.title}}</el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="one.index"
            :key="one.index"
          >
            <template>
              <i :class="one.icon"></i>
              <span>{{one.title}}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
 
<script>
export default {
  props:['items'],
  data() {
      return {
        isCollapse:"",
      }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  }
};
</script>
 
<style scoped>
/* 左侧菜单栏定位和位置大小设定 */
.layout-left {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  background-color: #324157;
}
.layout-left::-webkit-scrollbar {
  width: 0;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
.layout-left > ul {
  height: 100%;
}
</style>