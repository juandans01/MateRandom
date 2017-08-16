import React, { Component } from 'react'

import './Random.css'

class Random extends Component{

  constructor(props) {
    super(props)
    this.state = {
      name : '',
      list : [],
      result: ''
    }
  }

  onNameInputChange = (e) =>{
    this.setState({name:e.target.value})
  }

  componentWillMount() {
    window.chrome.storage.sync.get('names', (response) => {
      console.log(response.names)
      if (response.names) {
        this.setState({
          list : response.names
        })
      }
    })
  }

  submit = (e) =>{
    console.log('on submit')
    if(this.state.name){
      let newList = this.state.list.concat([this.state.name])
      console.log(newList)
      this.setState({
        list : newList,
        name : ''
      },this.storeName)
    }
    e.preventDefault()
  }

  storeName = () => {
    console.log('on store')
    console.log(this.state.list)
    window.chrome.storage.sync.set({'names': this.state.list}, () => {
      console.log('item Saved')
    })
  }
  removeName = (e) => {
    let newArray = this.state.list
    newArray.splice(e.target.value,1)

    this.setState({
      list: newArray
    },this.storeName)

  }

  random = () => {
    const choosen = this.state.list[Math.floor(Math.random() * this.state.list.length)]
    this.setState({
      result : choosen
    })
  }

  render(){
    return(
      <div className="random-container">
        <form className="random-content" onSubmit={this.submit}>
          <div className="name-input">
            <input type="text" value={this.state.name} onChange={this.onNameInputChange} placeholder="Enter to submit name"/>
            <button type="submit" hidden />
          </div>
            { this.state.result  ? (
              <div className="result">
                <span className="result-span">{this.state.result} has been chosen</span>
              </div>
            ) : null}

          <div>
            {
              this.state.list.map((name,i) => (
                <div key={i} className="name-container">
                  <button type="button" className="name-button" value={i} onClick={this.removeName}>X</button>
                  <div className="name-label"><span className="name-span">{name}</span></div>
                </div>
              ))
            }
          </div>
        </form>
        <div className="random-footer">
          <button className="random-button" onClick={this.random}>
            GET VICTIM
          </button>
        </div>
      </div>
    )
  }
}

export default Random