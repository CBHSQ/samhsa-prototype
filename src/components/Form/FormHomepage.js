import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import 'styled-components/macro';
import tw from 'tailwind.macro';

import { destroyFacilities } from '../../actions/facilities';

import { Button, Label, Location } from '../Input';

export class FormHomepage extends Component {
  componentDidMount() {
    this.props.destroyFacilities();
  }

  handleSubmit = submitEvent => {
    const { handleSubmit, location } = this.props;

    if (!location.latLng) {
      return submitEvent.preventDefault();
    }

    handleSubmit(submitEvent);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Label value="Find a treatment facility near you" css={tw`mb-8`} large>
          <Field
            css={tw`md:mt-6 md:w-full md:shadow-md rounded p-4 border border-gray-light`}
            component={Location}
            name="location"
            placeholder="City or zip code"
            innerRef={this.props.innerRef}
          />
        </Label>

        <Button
          primary
          css={tw`w-full md:w-auto md:inline-block md:px-16 text-2xl md:text-lg `}
          type="submit"
        >
          Search
        </Button>
      </form>
    );
  }
}

FormHomepage.propTypes = {
  clearValues: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  location: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  destroyFacilities() {
    dispatch(destroyFacilities());
  }
});

const mapStateToProps = state => {
  const initialValues = state.form.homepage.initialValues;
  const values = getFormValues('homepage')(state);

  return {
    initialValues: {
      ...initialValues
    },
    location: values && values.location
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'homepage'
  })(FormHomepage)
);
