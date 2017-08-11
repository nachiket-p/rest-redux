import React from 'react'
import { connect } from 'react-redux'

const paging = (list, routeParams, props) => (Component) => {
  const actions = list.actions(routeParams)
  const selectors = list.selectors(routeParams)
  
  const mapStateToProps = (state) => {
    return {
      instances: selectors.getInstances(state),
      pages: selectors.getPages(state),
      currentPage: selectors.getCurrentPage(state),
      total: selectors.getTotal(state),
      hasNext: selectors.hasNext(state),
      hasPrev: selectors.hasPrev(state),
      pageSize: selectors.getPageSize(state)
    }
  }
  const mapDispatchToProps =  (dispatch) => {
    return {
      gotoPage: (page) => dispatch(actions.page(page)),
      first: () => dispatch(actions.first()),
      last: () => dispatch(actions.last()),
      next: () => dispatch(actions.next()),
      prev: () => dispatch(actions.prev()),
      refresh: () => dispatch(actions.refresh()),
      setOptions: (options) => dispatch(actions.setOptions(options))
    }
  }
  
  class ListHoc extends React.Component {
    render() {
      return <Component {...this.props} {...props} />
      // restActions={actions}
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(ListHoc)
}

export default paging