import _ from 'lodash'

export const isLoggedIn = state => !!state.user.auth.profile
export const getProfile = state => state.user.auth.profile
export const getError = state => state.user.auth.error



// export const getVisibleTodos = createSelector(
//   getTodos, getFilter, (todos, filter) => {
//     switch (filter) {
//       case 'SHOW_ALL':
//         return todos
//       case 'SHOW_COMPLETED':
//         return todos.filter(t => t.completed)
//       case 'SHOW_ACTIVE':
//         return todos.filter(t => !t.completed)
//     }
//   }
// )

