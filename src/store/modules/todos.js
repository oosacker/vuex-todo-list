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
  },
  async filterTodos({ commit },  e) {
    console.log(e)
    const limit =  parseInt(e.target.options[e.target.options.selectedIndex].innerText)
    console.log(limit)


    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    console.log(response)

    // not having this code below seems to cause crashing: 
    // vue.runtime.esm.js?2b0e:619 [Vue warn]: Error in v-on handler (Promise/async): "TypeError: Cannot read property 'options' of undefined"
    commit('setTodos', response.data);
  },
  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, 
      updTodo
    );
    console.log(response)
    commit('updateTodo', response.data);
  }
}

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  newTodo: (state, todo) => state.todos.unshift(todo), // add elements to the beginning of the array
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id)
    if(index !== -1) {
      state.todos.splice(index, 1, updTodo) // inserts updTodo at position index and removes old item at same position
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}