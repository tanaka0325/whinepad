import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Button from './Button'

export default class Dialog extends Component {

  componentWillUnMount() {
    document.body.classList.remove('DialogModalOpen')
  }

  componentDidMount() {
    document.body.classList.add('DialogModalOpen')
  }

  render() {
    return (
      <div className={classNames({
        'Dialog': true,
        'DialogModal': this.props.modal,
      })}>
      {/* <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}> */}
        <div className={classNames({
          'DialogModalWrap': this.props.modal
        })}>
        {/* <div className={this.props.modal ? 'DialogModalWrap' : null}> */}
          <div className="DialogHeader">
            {this.props.header}
          </div>
          <div className="DialogBody">
            {this.props.children}
          </div>
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <span
                  className="DialogDismiss"
                  onClick={this.props.onAction.bind(this, 'dismiss')}>
                  キャンセル
                </span>
              : null
            }
            <Button onClick={this.props.onAction.bind(this,
              this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  onAction: PropTypes.func,
  hasCancel: PropTypes.bool,
}

Dialog.defaultProps = {
  confirmLabel: 'OK',
  modal: false,
  onAction: () => {},
  hasCancel: true,
}
