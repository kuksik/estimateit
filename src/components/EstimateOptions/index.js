import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Card,
  CardBlock,
  Col,
  InputGroup,
} from 'reactstrap';

import { renderOptionsField } from '../libs/helpers.js';
import { required, currency } from '../libs/validation.js';

import * as actionsCalculate from '../../actions/Calculation';

import Slider from '../Slider';
import styles from './styles.scss';

class EstimateOptions extends Component {
  render() {
    const {
      totalHours,
      calculateTotalHours,
      userCanEditThisEstimate,
    } = this.props;

    return (
      <Card className={styles.calculation}>
        <CardBlock className={styles.calculation__wrapper}>
          <Col
            xs="12" lg="9"
            className={styles.calculation__options}
          >
            <div className={styles.range}>
              <InputGroup className={styles.range__item}>
                <Field
                  min="0"
                  step="1"
                  type="text"
                  label="Rate USD"
                  name="moneyRate"
                  validate={[required, currency]}
                  component={renderOptionsField}
                  disabled={!userCanEditThisEstimate}
                />
              </InputGroup>
              <Field
                title="QA"
                component={Slider}
                totalHours={totalHours}
                name="estimateOptions.qa"
                disabled={!userCanEditThisEstimate}
                calculateTotalHours={calculateTotalHours}
              />
              <Field
                title="PM"
                component={Slider}
                totalHours={totalHours}
                name="estimateOptions.pm"
                disabled={!userCanEditThisEstimate}
                calculateTotalHours={calculateTotalHours}
              />
              <Field
                title="Bug Fixes"
                component={Slider}
                totalHours={totalHours}
                name="estimateOptions.bugFixes"
                disabled={!userCanEditThisEstimate}
                calculateTotalHours={calculateTotalHours}
              />
              <Field
                title="Risks"
                component={Slider}
                totalHours={totalHours}
                name="estimateOptions.risks"
                disabled={!userCanEditThisEstimate}
                calculateTotalHours={calculateTotalHours}
              />
            </div>
          </Col>
        </CardBlock>
      </Card>
    );
  }
}


EstimateOptions.propTypes = {
  totalHours: PropTypes.number.isRequired,
  estimateOptions: PropTypes.object.isRequired,
  calculateTotalHours: PropTypes.func.isRequired,
  userCanEditThisEstimate: PropTypes.bool.isRequired,
};

function mapStateToProps() {
  return { };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(actionsCalculate, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(EstimateOptions),
);
