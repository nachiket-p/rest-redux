import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const DemoList = ({title, instances, pages, total, isFirst, isLast, hasNext, hasPrev,
  gotoPage, next, prev, first, last, refresh }) => {
  const loadingEl = null;//loading ? <span>Loading ... </span> : null
  console.log('rendering demolist', instances, pages, total)
  return (
    <div>
      <h3>{title}</h3>
      <ol>
        {instances.map(todo => {
          return <Todo
            key={todo.id}
            {...todo}
            onClick={() => {}}
            onDelete={() => {}}
          />
        }
        )}
      </ol>
      {loadingEl}
      <p>Total: {total} </p>
      <p>
        <a onClick={() => refresh()}> Refresh </a>
      </p>
      <p>
        <a onClick={() => hasPrev && first()}> First </a>
        <a onClick={() => hasPrev && prev()}> Prev </a>
        {pages.map((page) => <a onClick={() => gotoPage(page)} key={page}> {page} </a>)}
        <a onClick={() => hasNext && next()}> Next </a>
        <a onClick={() => hasPrev && last()}> Last</a>
      </p>
    </div>
  )
}


export default DemoList