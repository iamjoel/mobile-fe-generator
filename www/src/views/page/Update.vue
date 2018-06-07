
<template>
<div class="main">
  <el-form :inline="true" :model="model" :rules="rules" ref="form" label-position="right" >
    <el-row type="flex">
        <j-edit-item  label="名称" prop="name" :view-value="model.name">
          <el-input v-model="model.name"></el-input>
        </j-edit-item>
        <j-edit-item  label="文件路径" prop="filePath" :view-value="model.filePath">
          <div class="ly">
            <span>@/views/</span>
            <el-input v-model="model.filePath"></el-input>
          </div>
        </j-edit-item>
    </el-row>
    
  </el-form>

  <div class="ly ly-j">
    <div>
      <div class="mb-10">
        <el-radio-group v-model="device" @change="deviceChange">
         <el-radio label="iphone 6">iPhone6/7/8</el-radio>
         <el-radio label="iphone 5">iPhone5</el-radio>
        </el-radio-group>
      </div>
      <draggable
        class="preview"
        :style="deviceSize"
        :options="{
            group: {
              name: 'component',
              put: 'all', /* 接受的组 */
            },
            ghostClass: 'sortable-ghost'
        }"
        @add="addedComponent"
        v-model="model.selectedComponent"
      >
        <div
          v-for="(c, index) in model.selectedComponent"
          :key="index"
          @click="currEditComponent = c"
          class="component-wrap"
          :class="{
            'is-current': currEditComponent && c.id === currEditComponent.id
          }"
        >
          <div class="ops-wrap">
            <i class="el-icon-arrow-up" v-show="index > 0" @click="moveComponent('up', index)"></i>
            <i class="el-icon-arrow-down" v-show="index < model.selectedComponent.length - 1" @click="moveComponent('down', index)"></i>
            <i class="el-icon-delete" @click="deleteComponent(c.id)"></i>
          </div>
          <component 
            :is="c.name"
            v-bind="c.props"
            >
            <template v-for="item in c.slots" v-if="c.slots" :name="item.name || 'default'" >
              <div 
                v-if="!item.isList"
                v-html="item.content"
              ></div>
              <component 
                v-else
                :is="item.componentName || 'div'"
                v-for="i in 3"
                :key="i"
                v-html="item.content">
              </component>

            </template>
          </component>
        </div>
      </draggable>
    </div>
    

    <div class="ops">
      <!-- 所有组件 -->
      <div class="panel">
        <h2>所有组件</h2>
        <draggable
          :options="{
            group: {
              name: 'all',
              put: false,
              pull: 'clone',
            },
            sort: false,
          }"
        >
          <div
            class="component"
            v-for="(c, index) in allComponents"
            :key ="index"
            :data-data="JSON.stringify(c)"
          >
            {{c.label}}
          </div>
        </draggable>
      </div>

      <!-- 配置 -->
      <div class="panel" v-if="currEditComponent">
        <h2>配置</h2>
        <div>
          当前组件: {{currEditComponent.label}}
        </div>
        <div 
          v-for="(item, index) in getComponentConfig(currEditComponent)"
          :key="index"
        >
          <div>{{item.key}}</div>
          <el-input v-model="currEditComponent.props[item.key]" placeholder="请输入内容" v-if="!item.type"></el-input>
          <el-input v-model.number="currEditComponent.props[item.key]" placeholder="请输入内容" v-if="item.type === 'number'"></el-input>
        </div>

        <div v-if="currEditComponent.slots" class="mt-10">
          <h3>内部内容</h3>
          <div>
            <el-input v-model="currEditComponent.slots[0].content" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
    </div>


  </div>

  <el-row type="flex" justify="center" class="mt-10">
    <el-button @click="$router.go(-1)">返回</el-button>
    <el-button type="success" @click="save">保存</el-button>
  </el-row>
</div>
</template>

<script src="./update.js"></script>
<style scoped src="./update.css">

</style>