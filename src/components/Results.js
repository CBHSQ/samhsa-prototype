import React, { Component } from 'react';
import 'styled-components/macro';
import tw from 'tailwind.macro';
import { connect } from 'react-redux';
import { handleReceiveFacilities } from '../actions/facilities';
import ResultsList from './ResultsList';
import Filters from './Form/Filters';
import MapContainer from './Map/MapContainer';

class Results extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  submit = values => {
    const { dispatch } = this.props;

    dispatch(handleReceiveFacilities(values));
  };

  render() {
    const { loading, data } = this.props;
    const { rows, page, totalPages, recordCount } = data;
    const hasResults = rows && rows.length > 0;

    return (
      <div className="container">
        <div css={tw`flex flex-wrap -mx-6`}>
          <div css={tw`w-full lg:w-3/5 px-6 mb-6 lg:mb-0`}>
            <ResultsList
              loading={loading}
              rows={rows}
              page={page}
              totalPages={totalPages}
              recordCount={recordCount}
            />
          </div>
          <div css={tw`w-full lg:w-2/5 px-6 mb-6`}>
            <Filters onSubmit={this.submit} />
            {!loading && hasResults && (
              <div css={tw`pt-6 border-t`}>
                <div css={tw`relative h-64 w-full mb-6`}>
                  <MapContainer rows={rows} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ facilities }) => {
  const { loading, data } = facilities;

  return {
    loading,
    data
  };
};

export default connect(mapStateToProps)(Results);
