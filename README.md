# React.Dashboard

## Introduction

React.Dashoard is a stateless dashboard solution which provides portal-like experience.

## Features
* Dashboard - a collection of widgets
* Widgets - a container of content, rendered by react components
* Layout - a component for the layout of the dashboard. If no external layout is provided the widgets will render sequentially in display block manner. The layout component must be initialized with a 'regions' object which describes the mapping between placeholders in the layout and the widget instances.


## Usage

Case 1:

```
import Dashboard from 'react-dashboard/lib/Dashboard'

class MyLayout extends Component {
    render() {
        if (this.props.regions) {
            var widgets = this.props.regions;
            var leftPane = widgets["left-pane"];
            var middlePane = widgets["middle-pane"];
            var rightPane = widgets["right-pane"];
            return (
                <div className="content">
                    <section className="some-dashboard-container">
                        <Grid className="grid-layout">
                            <Row>
                               <Col md={4}>{leftPane}</Col>
                               <Col md={4}>{middlePane}</Col>
                               <Col md={4}>{rightPane}</Col>
                            </Row>
                        </Grid>
                    </section>
                </div>
                );
            }
    }
}

class MyDashboard extends Component {
  
  render(){
    var widgets = {
          "widgets": [
              {
                "id": "widget-left",
                "region": "left-pane"
              },
              {
                "id": "widget-moddle",
                "region": "left-pane"
              },
              {
                "id": "widget-right",
                "region": "right-pane"
              }
            ]
          };
    return (
        
        <Dashboard
           widgets={widgets}
           layout={MyLayout}
           />
    );
  }
}
```

## Author

[Georgi Kosharov](g.kosharov@tinqin.com)

## LICENSE

MIT