import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router";
import {Nav, Row} from 'react-bootstrap'
import Landing from './views/Landing/Landing';
import Incident from './views/Incident/Incident'
import Admin from './views/Admin/Admin'
import Login from './views/Authentication/Login'
import myLogo from './react.png'

const Header = props => {
  return (
    <Row className='header'>
      <div className='container'>
        <div className='pull-left'><img src={myLogo} alt='logo' height='43'/></div>
        <div className='pull-right'>
        <Nav as="ul">
          
          <Nav.Item as="li">
            <Nav.Link href='login'>Login</Nav.Link>
          </Nav.Item>
        </Nav>
        </div>
      </div>
    </Row>
  );
};

const NavMenu = props => {
  const { location } = props;
  return (
    <Nav variant="pills" defaultActiveKey="/" activeKey={location.pathname}>
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/incident">My incidents</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin">Admin</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
const NavMenuWithRouter = withRouter(NavMenu);

const DashboardLayout = ({children, ...rest}) => {  
  return (  
    <div>
      <Header/>
      <br/>
      <NavMenuWithRouter/>
      <hr />
      {children}
    </div>
  )  
}  
  
const DashboardLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <DashboardLayout>  
          <Component {...matchProps} />  
      </DashboardLayout>  
    )} />  
  )  
};


const EmptyLayout = ({children, ...rest}) => {  
  return (  
    <div>
      <Header/>
      <br/>
      {children}
    </div>
  )  
}  
  
const EmptyLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <EmptyLayout>  
          <Component {...matchProps} />  
      </EmptyLayout>  
    )} />  
  )  
};  


const App = () => {  
  return (
    <div className="container">
        <Router>          
          <Switch>
            <DashboardLayoutRoute exact path="/" component={Landing}/>
            <DashboardLayoutRoute path="/incident" component={Incident} />
            <DashboardLayoutRoute path="/admin" component={Admin} />
            <EmptyLayoutRoute path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    );
 }  

export default App;
