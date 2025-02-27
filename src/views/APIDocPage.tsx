import classNames from 'classnames'
import SwaggerUI from 'swagger-ui-react'
import SwaggerUIProps from 'swagger-ui-react/swagger-ui-react'
import styles from './Page.module.css'

const APIDocPage = ({ spec }: SwaggerUIProps) => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <SwaggerUI spec={spec} />
    </div>
  )
}

export default APIDocPage
