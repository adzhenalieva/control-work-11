import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import Container from "reactstrap/es/Container";


import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {logOutUser} from "./store/actions/userActions";
import MainPage from "./containers/MainPage/MainPage";
import ItemFullInfo from "./containers/ItemFullInfo/ItemFullInfo";
import AddNewItem from "./containers/AddNewItem/AddNewItem";
import {NotificationContainer} from "react-notifications";


class App extends Component {
    render() {
        return (
            <div>
                <NotificationContainer/>
                <header>
                    <Toolbar user={this.props.user}
                             logout={this.props.logoutUser}/>
                </header>
                <Container className="mt-5">
                    <Switch>
                        <Route path="/" exact component={MainPage}/>
                        <Route path="/items/new" exact component={AddNewItem}/>
                        <Route path="/items/:id" exact component={ItemFullInfo}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logOutUser())
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


