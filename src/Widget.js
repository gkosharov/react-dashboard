/**
 * Created by g.kosharov on 12.3.2016 ã..
 */
import React, { Component, PropTypes } from 'react'
import isObject from 'lodash/lang/isObject'

export default class Widget extends Component {
    constructor(props) {
        super(props);
    }

    buildChildren() {
        if (this.props.components) {

            let children = this.props.components;

            let jsx = [];
            for (let child of children) {
                if (React.isValidElement(child)) {
                    jsx.push(child);
                } else if (isObject(child) && this.props.createElement) {
                    jsx.push(this.props.createElement(child, {widgetId: this.props.id}));
                } else {
                    console.warn("Unable to build children from the provided components option: " + children);
                }
            }

            return jsx;
        }
        return null;
    }

    render() {
        var children = null;
        var widgetClassName = this.props.className ? this.props.className : "widget";
        if (this.props.children) {
            children = this.props.children;
        } else {
            try {
                children = this.props.buildChildren ? this.props.buildChildren(this.props.components) : this.buildChildren();
            }catch(exception){
                console.warn("Widget children build failure with error: " + exception.message);
                throw exception;
            }
        }
        if (children) {
            return (
                <div className={widgetClassName}>
                    {children}
                </div>
            );
        }
        return (
            <div><h2>No content available!</h2></div>
        );
    }
}
