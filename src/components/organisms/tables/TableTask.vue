<template>
  <div class="table-task">
    <div class="table-task__header">
      <span class="list-length">{{ list.length }}件</span>
      <select v-model="sortKey">
        <option v-for="(name, key) in sortOptions" :value="key" :key="key">
          {{ name }}
        </option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>
            タスク名
          </th>
          <th>
            作成日
          </th>
          <th>
            期日
          </th>
          <th>
            完了日
          </th>
          <th>
            ステータス
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedList" :key="item.id">
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ formatDate(item.createAt) }}
          </td>
          <td>
            {{ formatDate(item.endAt) }}
          </td>
          <td>
            {{ formatDate(item.doneAt) }}
          </td>
          <td>
            <select v-model="item.status" @change="updateTask(item)">
              <option
                v-for="status in taskStatuses"
                :key="status"
                :value="status"
              >
                {{ convertStatusJa(status) }}
              </option>
            </select>
          </td>
          <td class="delete-button-cell">
            <button type="button" @click="confirmDeleteTask(item.id)">×</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { moment } from '@/modules/moment'
import { compare } from '@/modules/compare'
import { mapGetters, mapActions } from 'vuex'
import { STATUS, STATUS_JA } from '@/domains/task'

const sortOptions = {
  createAt: '作成日',
  endAt: '期日',
  doneAt: '完了日',
  name: 'タスク名'
}

export default {
  name: 'TableTask',
  data() {
    return {
      taskStatuses: STATUS,
      sortKey: 'createAt',
      sortOptions: sortOptions
    }
  },
  computed: {
    ...mapGetters('tasks', [
      'list'
    ]),
    sortedList() {
      const list = this.list.slice()
      return list.sort((a, b) => compare(a, b, this.sortKey))
    }
  },
  methods: {
    ...mapActions('tasks', [
      'updateTask',
      'deleteTask'
    ]),
    convertStatusJa(status) {
      return STATUS_JA[status]
    },
    confirmDeleteTask(id) {
      if (confirm('削除してもよろしいですか?')) {
        this.deleteTask(id)
      }
    },
    formatDate(date) {
      return date && moment(date).format('YYYY/MM/DD hh:mm')
    }
  }
}
</script>

<style scoped lang="scss">
  .table-task {
    &__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);

      .list-length {
        font-size: 1.5rem;
        font-weight: 600;
      }
    }

    .delete-button-cell {
      display: flex;
      justify-content: flex-end;
    }
  }


</style>