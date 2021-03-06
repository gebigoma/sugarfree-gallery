import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import httpClient from './httpClient';
import NavBar from './components/NavBar';
import Home from './views/Home';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import VIP from './views/VIP';
import LogOut from './views/LogOut'
import SubmitModal from './views/SubmitModal'
import Profile from './views/Profile'
import ShowSubmission from './views/ShowSubmission';
import Collection from './views/Collection';
import { Container } from 'semantic-ui-react'
import './styles/home.css'

class App extends Component {

  state = {
    currentUser: httpClient.getCurrentUser(),
    submitModalOpen: false,
    submissions: []
  }

  componentDidMount() {
    httpClient({ method: 'get', url: '/api/submissions' })
      .then((apiResponse) => {
        const submission = apiResponse.data.payload
        this.setState({ submissions: submission })
      })
  }

  onAuthSuccess() {
    this.setState({ currentUser: httpClient.getCurrentUser() })
  }

  onLogOutSuccess() {
    this.setState({ currentUser: null })
  }

  openSubmitModal() { this.setState({ submitModalOpen: true }) }

  closeSubmitModal() { this.setState({ submitModalOpen: false }) }

  onSubmitSuccess(newSubmission) {
    this.setState({
      submissions: [ newSubmission, ...this.state.submissions ]
    })
    this.closeSubmitModal()
  }

  render() {
    
    return (
      <Fragment>
        <NavBar currentUser={this.state.currentUser} onSubmitClick={this.openSubmitModal.bind(this)} />
          <Switch>
            <Route path="/signup" render={(routeProps) => {
              return (
                <SignUp {...routeProps} 
                  onSignUpSuccess={this.onAuthSuccess.bind(this)} 
                  />
              )
            }} />
            <Route path="/login" render={(routeProps) => {
              return (
                <LogIn {...routeProps} 
                  onLogInSuccess={this.onAuthSuccess.bind(this)} 
                  />
              )
            }} />
            <Route path="/vip" render={() => {
              return this.state.currentUser
              ? <VIP />
              : <Redirect to="/login" />
            }} />
            <Route path="/profile" render={(routeProps) => {
              return this.state.currentUser
              ? (
                <Profile {...routeProps}
                currentUser={this.state.currentUser}
                onUpdateProfileSuccess={this.onAuthSuccess.bind(this)}
                onDeleteProfileSuccess={this.onLogOutSuccess.bind(this)}
                />
              )
              : <Redirect to="/login" />
            }} />
            <Route path="/logout" render={(routeProps) => {
              return ( 
                <LogOut {...routeProps} 
                onLogOutSuccess={this.onLogOutSuccess.bind(this)} 
                />
              ) 
            }} />
            <Route path="/submissions/:id" component={ShowSubmission} />
            {/* <Route path="/submissions/:id" render={(routeProps) => {
              return (
                <ShowSubmission {...routeProps}
                submission={this.state.submission} relatedSubmissions={this.state.relatedSubmissions}
                />
              )
            }} /> */}
            <Route path="/collection/:id" component={Collection} />
            <Route exact path="/" render={(routeProps) => {
              return <Home {...routeProps} submissions={this.state.submissions} />
            }} />
          </Switch>
          {this.state.currentUser && (
            <SubmitModal
              open={this.state.submitModalOpen}
              onClose={this.closeSubmitModal.bind(this)}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
            />
          )}
      </Fragment>
    )
  }
}

export default App;