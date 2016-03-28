/**
 * Created by g.kosharov on 12.3.2016 ã..
 */
import React, { Component, PropTypes } from 'react'
import keys from 'lodash/object/keys'
import map from 'lodash/collection/map'

export default class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = "";
        if(this.props.className) className = this.props.className;
        if (this.props.regions) {
            let regions = this.props.regions;
            let children = map(keys(regions), (key)=>{
                return <div key={key}>{regions[key]}</div>
            });
            return (
                <div className={this.props.className ? this.props.className : ""}>
                    {children}
                </div>
            );
        }
        return (
            <div className={className}/>
        )
    }
}


Layout.propTypes = {
    regions: PropTypes.object.isRequired
};
