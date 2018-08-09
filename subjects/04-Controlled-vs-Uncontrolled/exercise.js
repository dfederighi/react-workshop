////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
    state = {
        billingName: "Dale Federighi",
        billingState: "CA",
        shippingName: "",
        shippingState: "",
        shippingSameAsBilling: false
    };

    dupeDataToShipping = (e) => {
        const isChecked = e.target.checked;
        console.log('isChecked:', isChecked);
        this.setState({
            shippingSameAsBilling: e.target.checked,
            shippingName: isChecked ? this.state.billingName : '',
            shippingState: isChecked ? this.state.billingState : ''
        });

    }

    updateField = (e, field) => {
        this.setState({[field]: e.target.value});
    }

  render() {
      console.log('render():state:', this.state);
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input onChange={(e) => this.updateField(e, 'billingName')} type="text" value={this.state.billingName} />
              </label>
            </p>
            <p>
              <label>
                Billing State: <input type="text" size="6" onChange={(e) => this.updateField(e, 'billingState')} value={this.state.billingState} />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input type="checkbox" checked={this.state.shippingSameAsBilling} onChange={(e) => { this.dupeDataToShipping(e) }} /> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input type="text" value={this.state.shippingName} />
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input type="text" size="6" value={this.state.shippingState} />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
