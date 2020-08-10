<template>
  <div>
    <h1>Base Desktop :)</h1>
    <div><el-button id = "add" type="primary" @click="newpage" plain>新建窗口</el-button></div>
    <div><el-button id = "add" type="primary" @click="execExample" plain>模型测算</el-button></div>
    <p v-if="cmdResult">{{ cmdResult }}</p>
  </div>
</template>
<script>
    const add = document.querySelector("#add")
    const ipc = require('electron').ipcRenderer
    const {dialog} = require('electron').remote;

export default {
  data() {
    return {
      githubUrl: "https://github.com/williamfzc/BaseDesktopApp",
      cmdResult:""
    }
  },
  methods: {
    newpage: function() {
        dialog.showOpenDialog({
        properties: [ 'openFile'],
        filters: [
            { name: 'Custom File Type', extensions: ['xls','xlsx','txt'] },
          ]
      },this.newpagecallback)
    },
    newpagecallback:function(filename){
        console.log(filename)
    },
    execExample: function() {
      this.$execCmd(
        // 命令行怎么运行它就怎么写
        `python ./example/e2.py 123 234 45`,
        // 加载动效的文字
        "运行python example :)",
        // 结果存放，如果按默认设定，在执行完成后： 
        // `this['cmdResult'] = result`
        'cmdResult',
      )
    }
  }
}
</script>
<style>
body {
  margin: 0;
}
</style>
