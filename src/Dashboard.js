/**
 * Created by g.kosharov on 12.3.2016 ã..
 */
import React, { Component } from 'react'
import merge from 'lodash/object/merge'
import forEach from 'lodash/collection/forEach'
import Widget from './Widget'
import DefaultLayout from './Layout'
/**
 *
 * @exports Dashboard
 * @class Dashboard
 * @constructor
 * @augments React.Component
 * @classdesc
 */
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    onActivate(widget) {
        console.log(widget + " activated!");
    }

    onDeactivate(widget) {
        console.log(widget + " deactivated!");
    }

    /**
     * @public
     * @desc render the widgets. Each widget may provide its class and other options
     */
    buildWidgets() {
        var widgets = {};
        if (this.props.widgets) {
            forEach(this.props.widgets, (widget)=> {
                let WidgetClass = widget.class || this.props.widgetClass || Widget;
                let options = widget || {};
                let onActivate = options.onActivate || this.onActivate;
                let onDeactivate = options.onDeactivate || this.onDeactivate;
                let props = merge({}, options, {onActivate: onActivate, onDeactivate: onDeactivate});
                if (widgets[widget.region]) {
                    widgets[widget.region] = <div>
                        {widgets[widget.region]}
                        <WidgetClass {...props}/>
                    </div>
                } else {
                    widgets[widget.region] = <WidgetClass {...props}/>;
                }
            });
        }
        return widgets;
    }

    render() {
        let widgets = [];
        let Layout = this.props.layout ? this.props.layout : DefaultLayout;
        let className = this.props.className ? this.props.className : "dashboard";
        try {
            if (this.props.buildWidgets) {

                widgets = this.props.buildWidgets();

            } else {

                widgets = this.buildWidgets();
            }
        } catch (e) {
            console.warn("Building widgets failed with " + e.message);
        }

        if (widgets) {
            return (
                <Layout className={className} regions={widgets}></Layout>
            );
        }
        return (
            <h3 className="error">No widgets built!</h3>
        );

    }
}