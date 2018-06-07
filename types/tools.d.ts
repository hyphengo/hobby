import Vue from 'vue'

// For modalRouter
declare module 'vue/types/vue' {
  interface Vue {
    modalRouterVisible: boolean
  }
}
