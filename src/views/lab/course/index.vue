<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="输入查询数据" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-download"
                 @click="handleDownload">
        导出
      </el-button>

      <el-upload
        class="upload-demo2"
        ref="upload"
        action="http://localhost:8080/lab3/studentExcel"
        multiple
        :on-success=onSuccess
        auto-upload
        :data=excelData>
        <el-button type="primary" style=";margin-top: 20px; display: inline-block" icon="el-icon-upload">更新
        </el-button>
      </el-upload>
      <el-upload
        class="upload-demo1"
        ref="upload"
        action="http://localhost:8080/lab3/studentExcel"
        multiple
        :on-success=onSuccess
        auto-upload
        :data=excelData>
        <el-button type="primary" style=";margin-top: 20px; display: inline-block" icon="el-icon-upload">新增
        </el-button>
      </el-upload>

    </div>

    <el-table
      class="table"
      :key="tableKey"
      v-loading="listLoading"
      :data="this.$store.state.lab3Course"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column v-for="(value,key,index) in this.$store.state.lab3Course[0]"
                       :prop="key"
                       :label="key"
      ></el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getCourse"/>


    <!--  弹出框  -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="course" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">

        <el-form-item label="cid">
          <el-input v-model="course.cid" placeholder="Please input"/>
        </el-form-item>

        <el-form-item label="name">
          <el-input v-model="course.name" placeholder="Please input"/>
        </el-form-item>

        <el-form-item label="fcid">
          <el-input v-model="course.fcid" placeholder="Please input"/>
        </el-form-item>

        <el-form-item label="credit">
          <el-input v-model="course.credit" placeholder="Please input"/>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {fetchList, fetchPv, createArticle, updateArticle} from '@/api/article'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import {getCourse} from '@/api/lab3'

const calendarTypeOptions = [
  {key: 'CN', display_name: 'China'},
  {key: 'US', display_name: 'USA'},
  {key: 'JP', display_name: 'Japan'},
  {key: 'EU', display_name: 'Eurozone'}
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: {Pagination},
  directives: {waves},
  data() {
    return {
      excelData: {
        "path": "D:/大学/大三上/非关系型数据库/实验/test.xlsx"
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['男', '女'],
      showReviewer: false,
      course: {
        cid: '',
        fcid: '',
        name: '',
        credit: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{required: true, message: 'type is required', trigger: 'change'}],
        timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
        title: [{required: true, message: 'title is required', trigger: 'blur'}]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getCourse()
    console.log("course页面的created")
  },
  methods: {

    getCourse,

    onSuccess(response, file, fileList) {
      this.$message.success('上传成功');
      this.$refs['upload'].clearFiles();
      console.log(fileList);
    },

    insertCourse(course) {
      console.log("调用insertCourse方法")

      this.$axios.post('http://localhost:8080/lab3/insertCourse', course).then((response) => {
        if (response.data.code === 0) {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const {prop, order} = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },

    resetCourse() {
      this.course = {
        cid: '',
        fcid: '',
        name: '',
        credit: ''
      }
    },
    handleCreate() {
      this.resetCourse()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true    //设置dialog可见
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      console.log(this.course)
      this.insertCourse(this.course)

    },
    handleUpdate(row) {
      this.course = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    updateCourse(update) {
      console.log("调用updateCourse方法")
      this.$axios.post('http://localhost:8080/lab4/updateCourse', this.course)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateData() {
      console.log("this.course")
      console.log(this.course)

      this.updateCourse(this.course)
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '修改成功',
        type: 'success',
        duration: 2000
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const tHeader = ['cid', 'name', 'fcid', 'credit']
        const filterVal = ['tid', 'name', 'sex', 'age']
        const list = this.$store.state.lab3Course
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
      }))
    },
  }
}
</script>

<style lang="css" scoped>

/deep/ .upload-demo1 {
  display: inline-block;
  margin-left: 10px;
}

/deep/ .upload-demo2 {
  display: inline-block;
  margin-left: 10px;
}

.table {
  margin-top: 10px;
}

.filter-item {
  margin-left: 10px;
}
</style>
