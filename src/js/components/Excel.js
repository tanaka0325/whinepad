import React, { Component } from 'react'

export default class Excel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false,
    }

    this._preSearchData = null
    this._log = []
  }


  _sort(e) {
    const column = e.target.cellIndex
    const descending = this.state.sortby === column && !this.state.descending
    const data = Array.from(this.state.data)
    data.sort((a, b) => {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1)
    })
    this._logSetState({
      data: data,
      sortby: column,
      descending: descending,
    })
  }

  _showEditor(e) {
    this._logSetState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    })
  }

  _save(e) {
    e.preventDefault()
    const input = e.target.firstChild
    const data = this.state.data.slice()
    data[this.state.edit.row][this.state.edit.cell] = input.value

    this._logSetState({
      edit: null,
      data: data,
    })
  }

  _renderTable() {
    return (
      <table>
        {/* <thead onClick={(e) => {this._sort(e)}}> */}
        <thead onClick={this._sort.bind(this)}>
          <tr>
            {this.props.headers.map((title, idx) => {
              if (this.state.sortby === idx) {
                title += this.state.descending ? ' \u2191' : ' \u2193'
              }
              return <th key={idx}>{title}</th>
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor.bind(this)}>
          {this._renderSearch.bind(this)()}
          {this.state.data.map((row, rowidx) => {
            return (
              <tr key={rowidx}>
                {row.map((cell, idx) => {
                  let content = cell
                  const edit = this.state.edit
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    content = <form onSubmit={this._save.bind(this)}>
                      <input type='text' defaultValue={content} />
                    </form>
                  }
                  
                  return <td key={idx} data-row={rowidx}>{content}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  _renderToolbar() {
    return (
      <div className="toolbar">
        <button
          onClick={this._toggleSearch.bind(this)}
        >
          検索
        </button>
        <button
          // onClick={this._download.bind(this)('json')}
          onClick={(e) => this._download('json', e)}
          href="data.json"
        >
          JSONで保存
        </button>
        <button
          // onClick={this._download.bind(this)('csv')}
          onClick={(e) => this._download('csv', e)}
          href="data.csv"
        >
          CSVで保存
        </button>
      </div>
    )
  }

  _download(format, ev) {
    const contents = format === 'json'
      ? JSON.stringify(this.state.date)
      : this.state.data.reduce((result, row) => {
        return result
          + row.reduce((rowresult, cell, idx) => {
            return rowresult
              + '"'
              + cell.replace(/"/g, '""')
              + '"'
              + (idx < row.length - 1 ? ',' : '')
          }, '')
          + "\n"
      }, '')
    const URL = window.URL || window.webkitURL
    const blob = new Blob([contents], {type: 'text/' + format})
    console.log(blob)
    ev.target.href = URL.createObjectURL(blob)
    ev.target.download = 'data.' + format
  }

  _toggleSearch() {
    if (this.state.search) {
      this._logSetState({
        data: this._preSearchData,
        search: false,
      })
      this._preSearchData = null
    } else {
      this._preSearchData = this.state.data
      this._logSetState({
        search: true
      })
    }
  }

  _search(e) {
    const needle = e.target.value.toLowerCase()
    if (!needle) {
      this._logSetState({data: this._preSearchData})
      return
    }
    const idx = e.target.dataset.idx
    const searchdata = this._preSearchData.filter((row) => {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1
    })
    this._logSetState({data: searchdata})
  }

  _renderSearch() {
    if (!this.state.search) {
      return null
    }

    return (
      <tr onChange={this._search.bind(this)}>
        {this.props.headers.map((_ignore, idx) => {
          return (
            <td key={idx}>
              <input type='text' data-idx={idx} />
            </td>
          )
        })}
      </tr>
    )
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      if (e.altKey && e.shiftKey && e.keyCode === 82) {
        this._replay()
      }
    }
  }

  _replay() {
    if (this._log.length === 0) {
      console.log('no state')
      return
    }
    let idx = -1
    const interval = setInterval(() => {
      idx++
      if (idx === this._log.length - 1) {
        console.log('end replay!')
        clearInterval(interval)
      }
      this.setState(this._log[idx])
    }, 1000)
  }

  _logSetState(newState) {
    this._log.push(JSON.parse(JSON.stringify(
      this._log.length === 0 ? this.state : newState
    )))
    this.setState(newState)
  }


  render() {
    return (
      <div className="Excel">
        {this._renderToolbar.bind(this)()}
        {this._renderTable.bind(this)()}
      </div>
    )
  }
}

Excel.propTypes = {
  headers: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  initialData: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.string
    )
  )
}
