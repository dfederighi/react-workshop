////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - When you click on a tab, make it appear to be active while the others
//   appear inactive
// - Render the correct content for the selected tab in the panel
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

const styles = {};

styles.tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
};

styles.panel = {
  padding: 10,
  display: 'block'
};

class Tabs extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired 
        })).isRequired
    }

  constructor(props) {
      super(props);
      this.state = {
        selectedTab: 1
      };
  }

  selectTab = (e, id) => {
      this.setState({selectedTab: id});
  }

  buildTabs = () => {
    return this.props.data.map((item, index) => {
        const tabStyles = this.state.selectedTab === item.id ? styles.activeTab : styles.tab;
        return (
            <div onClick={(e) => this.selectTab(e, item.id)} key={index.toString()} className="Tab" style={tabStyles}>
                {item.name}
            </div>
        );
    });
  }

  buildPanels = () => {
    const item = this.props.data.find((item) => {
        return item.id === this.state.selectedTab;
    });
    
    return (
        <div className="TabPanel" style={styles.panel}>
            {item.description}
        </div>
    );
  }

  render() {

    return (
        <div className="Tabs">
            {this.buildTabs()}
            {this.buildPanels()}
        </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries} />
      </div>
    );
  }
}

const DATA = [
  {
    id: 1,
    name: "USA",
    description: "Land of the Free, Home of the brave"
  },
  {
    id: 2,
    name: "Brazil",
    description: "Sunshine, beaches, and Carnival"
  },
  { id: 3, name: "Russia", description: "World Cup 2018!" }
];


ReactDOM.render(
  <App countries={DATA} />,
  document.getElementById("app"),
  function() {
    require("./tests").run(this);
  }
);

// ReactDOM.render(<App countries={DATA} />, document.getElementById('app'));