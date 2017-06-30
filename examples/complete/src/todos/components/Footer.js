import React from 'react'
import FilterLink from '../containers/FilterLink'
import ActionLink from '../containers/ActionLink'

const Footer = () => (
  <div>
    <p>
      Show:
    {" "}
      <FilterLink filter="SHOW_ALL">
        All
    </FilterLink>
      {", "}
      <FilterLink filter="SHOW_ACTIVE">
        Active
    </FilterLink>
      {", "}
      <FilterLink filter="SHOW_COMPLETED">
        Completed
    </FilterLink>
    </p>

    <p>
      Actions:
    {" "}
      <ActionLink action="DELETE_ALL">
        Delete All
    </ActionLink>
      {", "}
      <ActionLink action="COMPLETE_ALL">
        Mark All Complete
    </ActionLink>
      {", "}
      <ActionLink action="UNCOMPLETE_ALL">
        Mark All Uncomplete
    </ActionLink>
    </p>
  </div>
)

export default Footer