import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import 'spectre.css'
import './styles/style.scss'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Error from './components/common/Error'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Index from './components/images/Index'
import Show from './components/images/Show'
import New from './components/images/New'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path='/projects/new' component={New}/>
            <Route path='/projects/:id' component={Show}/>
            <Route path='/dashboard' component={Index}/>
            <Route path='/register' component={Register}/>
            <Route path='/error' component={Error}/>
            <Route exact path='/' component={Login}/>
            <Route path='/*' component={Error}/>  
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
