/**
 * Created by g.kosharov on 26.2.2016 ã..
 */

import "babel-polyfill"
import React, {Component} from 'react'
import ReactTestUtils from 'react/lib/ReactTestUtils'
import Dashboard from '../src/Dashboard'
import Widget from '../src/Widget'

function setup(sandbox) {
    let widgetMock = sandbox.mock(Widget);

    let props = {
        id: "TestDashboard",
        buildWidgets: sandbox.spy(),
        widgetClass: widgetMock
    };

    let renderer = ReactTestUtils.createRenderer();
    renderer.render(<Dashboard {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer,
        widgetMock
    }
}
var scope = {};
describe('Dashboard', ()=> {

    beforeEach(()=>{
        scope.sandbox = sinon.sandbox.create();
    });

    afterEach(()=>{
        scope.sandbox.restore();
    });

    it('should call buildWidgets', function(){
        const { props } = setup(scope.sandbox);
        expect(props.buildWidgets).toHaveBeenCalledOnce();

    });

    it('should render a default layout', ()=> {
        const { output } = setup(scope.sandbox);
        expect(output.type.name).toBe('Layout');
    });

    it('should create widget instances from a given class', ()=> {
        class FakeWidget extends Component {
            constructor(){
                super()
            }
            render() {
                return (<div/>);
            }
        }
        let props = {
            id: "TestDashboard",
            class: FakeWidget,
            widgets: [
                {"id": "W1"},{"id": "W2"}
            ]
        };
        let dashboard = ReactTestUtils.renderIntoDocument(<Dashboard {...props} />);

        expect(ReactTestUtils.isCompositeComponent(dashboard)).toBe(true);
    });

    it('should pass the result of the provided buildWidgets function to the default layout component', ()=> {
        //const layout = scope.sandbox.spy();
        let renderer = ReactTestUtils.createRenderer();
        let props = {
            id: "TestDashboard",
            buildWidgets: ()=>{ return {"W1": "W1", "W2": "W2"}; }
        };
        renderer.render(<Dashboard {...props} />);
        let output = renderer.getRenderOutput();
        expect(output.type.name).toBe('Layout');
        expect(output.props.regions).toEqual({"W1": "W1", "W2": "W2"});
    });

    it('should set the className of the dashboard whenever props.className is defined', ()=> {
        let renderer = ReactTestUtils.createRenderer();
        let props = {
            id: "TestDashboard",
            className: "big-shiny-dashboard"
        };
        renderer.render(<Dashboard {...props} />);
        let output = renderer.getRenderOutput();
        expect(output.type.name).toBe('Layout');
        expect(output.props.className).toBe("big-shiny-dashboard");
    });

    it('should pass all options to the widgets', ()=>{

    });
});