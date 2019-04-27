import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {deleteItem, fetchOneItem} from "../../store/actions/itemsActions";

import OneItem from "../../components/OneItem/OneItem";


class ItemFullInfo extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.onFetchItem(id);
    }

    deleteItem = id => {
        this.props.deleteItem(id);
    };

    render() {
        return (
            <Fragment>
                {this.props.item && this.props.item.user ?
                    <OneItem
                        item={this.props.item.item}
                        price={this.props.item.price}
                        image={this.props.item.image}
                        description={this.props.item.description}
                        username={this.props.item.user.displayName}
                        number={this.props.item.user.phoneNumber}
                        onClick={() => this.deleteItem(this.props.item._id)}
                    />
                    : <p>Loading...</p>}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        item: state.item.oneItem,
        error: state.item.fetchError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchItem: id => dispatch(fetchOneItem(id)),
        deleteItem: id => dispatch(deleteItem(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemFullInfo);