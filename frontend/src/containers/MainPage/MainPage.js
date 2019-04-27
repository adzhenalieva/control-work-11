import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {Alert, CardColumns} from "reactstrap";

import {fetchCategories} from "../../store/actions/categoriesActions";
import {fetchItems} from "../../store/actions/itemsActions";
import ItemsList from "../../components/ItemsList/ItemsList";
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem";


class MainPage extends Component {

    componentDidMount() {
        this.props.onFetchCategories();
        this.props.onFetchItems();
    }

    goToCategory = id => {
        this.props.onFetchItems(id);
    };
    goToItem = id => {
        this.props.history.push({
            pathname: '/items/' + id
        })
    };

    render() {
        return (
            <Fragment>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check internet connection!
                    </Alert>
                )}
                <div>
                    <button className="Btn" onClick={() => this.props.onFetchItems()}>All items</button>
                    {this.props.categories.map(category => (
                        <CategoriesItem
                            key={category._id}
                            category={category.category}
                            onClick={() => this.goToCategory(category._id)}/>
                    ))}
                </div>
                    <CardColumns>
                        {this.props.items.map(item => (
                            <ItemsList
                                key={item._id}
                                price={item.price}
                                item={item.item}
                                image={item.image}
                                click={() => this.goToItem(item._id)}/>
                        ))
                        }
                    </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        error: state.category.error,
        items: state.item.items,
        fetchError: state.item.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCategories: () => dispatch(fetchCategories()),
        onFetchItems: id => dispatch(fetchItems(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);