////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = { showOptions: false, value: this.props.defaultValue };

  toggleOptions = (e) => {
      this.setState({showOptions: !this.state.showOptions});
  }

  handleOptionClick = (elem) => {
      this.props.onChange(elem.props.value);
  }

  render() {
    return (
      <div className="select" onClick={this.toggleOptions}>
        <div className="label">
          {this.state.value && this.state.value}
          {this.props.value && this.props.value}
        <span className="arrow">▾</span>
        </div>
        {this.state.showOptions && 
            <div className="options">
                {React.Children.map(this.props.children, (child, index) => {
                    if (this.props.value) {
                        return React.cloneElement(child, {
                            _onClick: () => { this.handleOptionClick(child) },
                            _isSelected: child.props.value === this.props.value
                        });
                    } else {
                        return React.cloneElement(child, {
                            _onClick: () => { this.setState({value: child.props.value} )}
                        });
                    }
                })}
            </div>
        }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
        <div 
            className="option" 
            value={this.props.children} 
            onClick={this.props._onClick}
        >
            {this.props.children}
        </div>
    );
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
  };

  render() {
    return (
      <div>
        <h1>Select</h1>

        <h2>Controlled</h2>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={value => {
              this.setState({ selectValue: value });
            }}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala" onChange={(e) => {}}>
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
