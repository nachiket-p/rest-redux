import { connect } from 'react-redux'
import DemoList from '../components/DemoList'
import { completedTodos } from '../../api'

const todoListActions = completedTodos.actions
const todoListSelectors = completedTodos.selectors

const mapStateToProps = (state) => {
  return {
    instances: todoListSelectors.getInstances(state),
    pages: todoListSelectors.getPages(state),
    currentPage: todoListSelectors.getCurrentPage(state),
    total: todoListSelectors.getTotal(state),
    isFirst: todoListSelectors.isFirst(state),
    isLast: todoListSelectors.isLast(state),
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => {
    return {
      gotoPage: (page) => dispatch(todoListActions.page(page)),
      first: () => dispatch(todoListActions.first()),
      last: () => dispatch(todoListActions.last()),
      next: () => dispatch(todoListActions.next()),
      prev: () => dispatch(todoListActions.prev()),
      refresh: () => dispatch(todoListActions.refresh())
    }
  }
)(DemoList)