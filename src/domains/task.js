import { moment } from '@/modules/moment'
import { uuid } from '@/modules/uuid'
import { observe } from '@/modules/observe'

export const STATUS = {
  READY: 1,
  DOING: 2,
  DONE: 3
}

export const STATUS_JA = {
  1: '未着手',
  2: '進行中',
  3: '完了'
}

export default class Task {
  constructor() {
    this.id = uuid()
    this.name = ''
    this.status = STATUS.READY
    this.createAt = moment().format('YYYY-MM-DDThh:mm')
    this.endAt = moment().format('YYYY-MM-DDThh:mm')
    this.doneAt = null

    observe(this, 'status', (newVal) => {
      if (newVal === STATUS.DONE) {
        this.doneAt = moment().format('YYYY-MM-DDThh:mm')
      } else {
        this.doneAt = null
      }
    })
  }

  static set(task) {
    const model = new Task()
    Object.entries(task).forEach(([key, value]) => {
      model[key] = value
    })
    return model
  }
}
