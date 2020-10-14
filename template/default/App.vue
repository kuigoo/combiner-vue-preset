<template>
  <div id="app">
    <div class="preview-wrapper">
      <previewer :config="config"></previewer>
    </div>
    <div class="editor-wrapper">
      <editor @change="handleChange"></editor>
    </div>
  </div>
</template>

<script>
import Previewer from './components/Previewer';
import Editor from './components/Editor';
export default {
  name: 'App',
  components: {
    Previewer,
    Editor,
  },
  data() {
    return {
      config: {}
    }
  },
  methods: {
    handleChange(data) {
      this.config = data;
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}
.preview-wrapper {
  width: 375px;
  min-height: 100vh;
  border-right: 1px solid #fafafa;
  box-shadow: 3px 0 10px rgba(0, 0, 0, .1);
  margin-right: 60px;
}
.editor-wrapper {
  width: 420px;
  min-height: 500px;
}
</style>
