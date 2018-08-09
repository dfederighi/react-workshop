////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const FormContext = React.createContext();

class Form extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

class SubmitButton extends React.Component {
  render() {
    return (
        <FormContext.Consumer>
        {context => (
            <button onClick={context._onSubmit}>{this.props.children}</button>
        )}
        </FormContext.Consumer>
    );
  }
}

const ResetButton = (props) => {
    return (
        <FormContext.Consumer>
            {context => (
                <button onClick={context._onReset}>{props.children}</button>
            )}
        </FormContext.Consumer>
    );
}

class TextInput extends React.Component {
  render() {
    return (
        <FormContext.Consumer>
            {context => (
                <input
                    type="text"
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onKeyUp={(e) => { if(e.keyCode === 13) { context._onSubmit(); } else {
                        context._storeValue(this.props.name, e.target.value);
                    } }}
                />
            )}
      </FormContext.Consumer>
    );
  }
}

class App extends React.Component {

state = { firstName: '', lastName: '' };

  handleSubmit = (e) => {
      console.log(this.state);
  };

  storeFormValue = (field, value) => {
      this.setState({
          [field]: value
      });
  }

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <h2>{this.state.firstName} {this.state.lastName}</h2>

        <Form onSubmit={this.handleSubmit}>
        <FormContext.Provider value={{
              _onSubmit: this.handleSubmit,
              _storeValue: this.storeFormValue
            }}>
          <p>
          

            <TextInput name="firstName" placeholder="First Name" ref="firstName" />{" "}
            <TextInput name="lastName" placeholder="Last Name" ref="lastName" />

          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
          </FormContext.Provider>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
