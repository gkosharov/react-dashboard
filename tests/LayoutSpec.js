/**
 * Created by g.kosharov on 12.3.2016 ã..
 */

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Layout from '../src/Layout'

describe('Layout', ()=> {


    it('should render a div element for each key of the regions object', ()=> {
        const props = {
            regions: {
                "one": "W1",
                "two": "W2"
            }
        };
        let output = ReactTestUtils.renderIntoDocument(<Layout {...props} />);
        expect(ReactTestUtils.isCompositeComponent(output)).toBe(true);
        let children = ReactTestUtils.scryRenderedDOMComponentsWithTag(output, "div");
        console.log(children[0]);
        console.log(children[1]);
        expect(children[0]).toEqual("one");
        expect(children[1]).toEqual("two");
    });

    it('should render empty div when no regions object provided', ()=> {

    });

    it('should set className to the container div when className is provided', ()=>{
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<Layout className="test-class"/>);
        var output = renderer.getRenderOutput();
        expect(output.props.className).toBe("test-class");
    });

});