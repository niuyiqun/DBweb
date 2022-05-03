<template>
  <div class="dashboard-editor-container">

<!--    <panel-group  v-on:/>-->
    <panel-group >

    </panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
<!--      <line-chart :chart-data="lineChartData" />-->
<!--      {{this.$store.state.lab2Result}}-->
      <el-table :data="this.$store.state.lab2Result"
      style="width: 100%"
      stripe>
        <el-table-column v-for="(value,key,index) in this.$store.state.lab2Result[0]"
          :prop="key"
          :label="key"
        ></el-table-column>
<!--        <el-table-column-->
<!--          prop="name"-->
<!--          label="name"-->
<!--        ></el-table-column>-->
<!--        <el-table-column-->
<!--          prop="sex"-->
<!--          label="sex"-->
<!--        ></el-table-column>-->
<!--        <el-table-column-->
<!--          prop="age"-->
<!--          label="age"-->
<!--        ></el-table-column>-->
<!--        <el-table-column-->
<!--          prop="birthday"-->
<!--          label="birthday"-->
<!--        ></el-table-column>-->
<!--        <el-table-column-->
<!--          prop="dname"-->
<!--          label="dname"-->
<!--        ></el-table-column>-->
<!--        <el-table-column-->
<!--          prop="dclass"-->
<!--          label="dclass"-->
<!--        ></el-table-column>-->
      </el-table>

    </el-row>


  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
// import {getStringList} from '@/utils/store2table'




export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
  },
  data() {
    return {
      shownData : '点击上方发送请求',

    }
  },
  methods: {
    getDataFromChild:function (data){
      this.shownData = data
    },

    // getStringList
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
