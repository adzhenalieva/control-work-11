import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";

import FormElement from "../../components/UI/Form/FormElement";
import {createItem} from "../../store/actions/itemsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";

class AddNewItem extends Component {
    state = {
        item: '',
        description: '',
        image: '',
        price: '',
        category: ''
    };

    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/login');
        }
        this.props.onFetchCategories().then(
            () => {
                this.setState({category: this.props.categories[0]._id})
            }

        )
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });
        this.props.sendItem(formData);
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })

    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <Fragment>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check the internet connection
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <h2>Create new item</h2>
                    <FormElement
                        propertyName="item"
                        title="Title"
                        type="text"
                        value={this.state.item}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('item')}
                        placeholder="Title of the item"
                    />
                    <FormGroup row>
                        <Col sm={10}>
                            <label htmlFor="category">Choose category</label>
                            <select className="mx-3 p-2" name="category"
                                    id="category"
                                    onChange={this.inputChangeHandler}
                                    value={this.state.category}>
                                {this.props.categories.map(category => (
                                        <option key={category._id}
                                                value={category._id}>
                                            {
                                                category.category}
                                        </option>
                                    )
                                )}
                            </select>
                        </Col>
                    </FormGroup>
                    <FormElement
                        propertyName="description"
                        title="Description"
                        type="text"
                        value={this.state.description}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('description')}
                        placeholder="Enter item description"
                    />
                    <FormElement
                        propertyName="price"
                        title="Price"
                        type="number"
                        value={this.state.price}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('price')}
                        placeholder="Enter price"
                    />
                    <FormElement
                        propertyName="image"
                        title="Image"
                        type="file"
                        onChange={this.fileChangeHandler}
                        error={this.fieldHasError('image')}
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}/>
                        <Button type="submit" color="primary">Publish</Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    user: state.user.user,
    error: state.item.createError
});

const mapDispatchToProps = dispatch => ({
    sendItem: data => dispatch(createItem(data)),
    onFetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewItem);