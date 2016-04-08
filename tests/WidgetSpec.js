/**
 * Created by g.kosharov on 26.2.2016 ã..
 */

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Widget from '../src/Widget'

var scope = {};
describe('Widget', ()=> {
    beforeEach(()=>{
        scope.sandbox = sinon.sandbox.create();
    });

    afterEach(()=>{
        scope.sandbox.restore();
    });

    it('should invoke buildChildren when provided in props', ()=> {
        let spyBuildChildren = scope.sandbox.spy();
        let props = {
            id: "W1",
            buildChildren: spyBuildChildren
        };
        ReactTestUtils.renderIntoDocument(<Widget {...props} />);
        expect(spyBuildChildren).toHaveBeenCalled();
    });

    it('should invoke own buildChildren when no factory method is provided in props and no jsx children', ()=> {
        let Mock = scope.sandbox.mock(Widget);
    });

    it('should class to the container div when className is provided in props', ()=> {
        let renderer = ReactTestUtils.createRenderer();
        let props = {
            id: "W1",
            components: [
                <span/>
            ],
            className: "big-shiny-widget"
        };
        renderer.render(<Widget {...props} />);
        let output = renderer.getRenderOutput();
        let domComponent = ReactTestUtils.findRenderedDOMComponentWithTag(output, "div");
        expect(domComponent.props.className).toBe("big-shiny-widget");
    });

    it('should log warning when invalid components object method is provided in props', ()=> {
        console.warn = scope.sandbox.spy();
        let props = {
            id: "W1",
            components: ["components should be react elements", {}]
        };
        ReactTestUtils.renderIntoDocument(<Widget {...props} />);
        expect(console.warn).toHaveBeenCalled();
    });

    it('should call createElement when it is provided in props', ()=> {
        let createElement = scope.sandbox.spy();
        let props = {
            id: "W1",
            components: [
                {type: "asdf"}
            ],
            createElement: createElement
        };
        ReactTestUtils.renderIntoDocument(<Widget {...props} />);
        expect(createElement).toHaveBeenCalled();
    });


});