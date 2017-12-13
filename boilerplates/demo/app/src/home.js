import React, { Component } from 'react'
import styles from './home.less'

import { DatePicker, message, Button } from 'antd'
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
    }
  }

  handleChange (date) {
    message.info('您选择的日期是: ' + date.toString())
    this.setState({date})
  }

  render () {
    return <div className={styles.root}>
      <DatePicker onChange={value => this.handleChange(value)}/>
      <Button type="primary">Primary</Button>
    </div>
  }
}

export default Home

