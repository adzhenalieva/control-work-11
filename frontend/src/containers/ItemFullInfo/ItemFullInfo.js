import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {deleteItem, fetchOneItem} from "../../store/actions/itemsActions";

import OneItem from "../../components/OneItem/OneItem";
import {Alert, Button} from "reactstrap";


class ItemFullInfo extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.onFetchItem(id);
    }

    deleteItem = id => {
        if (this.props.user._id === this.props.item.user._id) {
            this.props.deleteItem(id);
        } else {
            alert('You can delete only own items')
        }

    };

    render() {
        let button;
        if (this.props.user) {
            button = <Button onClick={() => this.deleteItem(this.props.item._id)}>Move to sold</Button>
        } else {
            button = null;
        }
        return (
            <Fragment>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check internet connection!
                    </Alert>
                )}
                {this.props.item && this.props.item.user ?
                    <OneItem
                        item={this.props.item.item}
                        price={this.props.item.price}
                        image={this.props.item.image}
                        description={this.props.item.description}
                        username={this.props.item.user.displayName}
                        number={this.props.item.user.phoneNumber}
                    />
                    : <p>Loading...</p>}
                {button}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        item: state.item.oneItem,
        error: state.item.error,
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchItem: id => dispatch(fetchOneItem(id)),
        deleteItem: id => dispatch(deleteItem(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemFullInfo);