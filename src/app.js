import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import 'spectre.css'
import './styles/style.scss'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path='/register' component={Register}/>
            <Route exact path='/' component={Login}/>
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
