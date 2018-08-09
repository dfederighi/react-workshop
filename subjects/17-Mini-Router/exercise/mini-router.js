import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

const RouterContext = React.createContext();

class Router extends React.Component {
    
  history = createHashHistory();

  state = { location: this.history.location };

  componentDidMount() {
    this.history.listen(location => {
      this.setState({ location });
    });
  }

  render() {
    return (
        <RouterContext.Provider value={{
            location: this.state.location, 
            history: this.history
        }}>
            {this.props.children}
        </RouterContext.Provider>
    );
  }
}

class Route extends React.Component {
  render() {
    const { path, render, component: Component } = this.props;

    return (
        <RouterContext.Consumer>
        {context => {
            const {location} = context;
            if (location.pathname.startsWith(path)) {
                if (render) {
                    return render();
                } else if (Component) {
                    return <Component />
                } else {
                    return null;
                }
            }
        }}
        </RouterContext.Consumer>
    );
  }
}


class Link extends React.Component {
  handleClick = (e, context) => {
    e.preventDefault();
    context.history.push(this.props.to);
  };

  render() {
    const { history } = this.context;

    return (
        <RouterContext.Consumer>
        {context => {
            return (
                <a href={`#${this.props.to}`} onClick={(e) => {this.handleClick(e, context)}}>
                    {this.props.children}
                </a>
            );
        }}
        </RouterContext.Consumer>
    );
  }
}

export { Router, Route, Link };
