import axios from 'axios'

const state = {
  todos: []
}

const getters = {
  allTodos: state => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

    commit('setTodos', response.data) // must use commit when calling from inside this file

    console.log(response)
  },
  async addTodo({ commit }, title) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title, completed: false 
    })

    console.log(response)

    commit('newTodo', response.data)
  },
  async deleteTodo({ commit }, id) {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    console.log(response)

    commit('removeTodo', id)
  }
}

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  newTodo: (state, todo) => state.todos.unshift(todo), // add elements to the beginning of the array
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id)
}

export default {
  state,
  getters,
  actions,
  mutations
}