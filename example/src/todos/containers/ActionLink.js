import { connect } from 'react-redux'
import {ActionLinks}  from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(ActionLinks[ownProps.action](ownProps.filter))
    }
  }
}

const ActionLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default ActionLink