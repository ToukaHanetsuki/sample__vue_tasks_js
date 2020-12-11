<template>
  <div id="app">
    <h1>TASK management</h1>
    <FormCreateTask class="form-create-task"/>
    <TableTask class="table-task"/>
  </div>
</template>

<script>
import FormCreateTask from './components/organisms/forms/FormCreateTask.vue'
import TableTask from './components/organisms/tables/TableTask.vue'

export default {
  name: 'App',
  components: {
    FormCreateTask,
    TableTask
  }
}
</script>

<style scoped>
.table-task {
  margin-top: 1rem;
}
</style>