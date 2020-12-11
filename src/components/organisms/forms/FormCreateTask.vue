<template>
  <form @submit.prevent="createTask">
    <p>
      <label>
        タスク名
        <input type="text" v-model="task.name">
      </label>
    </p>
    <p>
      <label>
        期日
        <input type="datetime-local" v-model="task.endAt">
      </label>
    </p>
    <p>
      <button type="submit" :disabled="isDisabledSubmit">作成</button>
    </p>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import Task from '@/domains/task'

export default {
  name: 'FormCreateTask',
  data() {
    return {
      task: new Task(),
    }
  },
  computed: {
    isTaskName() {
      return this.task.name.length
    },
    isDisabledSubmit() {
      return !this.isTaskName
    }
  },
  methods: {
    ...mapActions('tasks', [
      'addTask'
    ]),
    createTask() {
      if (this.isDisabledSubmit) return

      this.addTask(this.task)
      this.task = new Task()
    }
  }
}
</script>