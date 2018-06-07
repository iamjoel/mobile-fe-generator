
<template> 
  <div class="main">
    <div class="ly ly-r mb-10">
      <el-button type="primary" @click="$router.push('/page/update/-1')">新增</el-button>
    </div>

    <el-table
      :data="list"
      border
      stripe>
      <el-table-column
        type="index"
        label="序列"
        align="center"
        width="80">
      </el-table-column>
      
      <el-table-column
        prop="name"
        label="名称"
        >
        
      </el-table-column>

      <el-table-column
          prop="filePath"
          label="文件路径"
          >
        <template slot-scope="scope">
          @/views/{{scope.row.filePath}}
        </template>
      </el-table-column>
        
      <el-table-column
        prop="op"
        label="操作"
        width="350"
        >
        <template slot-scope="scope">
          <el-button type="info" size="small"  v-if="scope.row.isFreeze != 1" @click="$router.push('/page/update/' + scope.row.id)">编辑</el-button>
          <el-button type="warning" size="small" @click="toggleFreeze(scope.row)">{{scope.row.isFreeze != 1 ? '冻结' : '解冻'}}</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
</template>
<script src="./list.js"></script>
<style scoped>
</style>
      