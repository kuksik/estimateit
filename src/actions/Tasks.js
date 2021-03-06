import {
  arrayPush,
  arrayRemove,
  formValueSelector,
} from 'redux-form';

import { actionGeneralCalculation } from './Calculation';


const changeWrapper = ({ dispatch, form, field, payload, touch = true }) => {
  dispatch({
    type: '@@redux-form/CHANGE',
    meta: {
      form,
      field,
      touch,
      persistentSubmitErrors: false,
    },
    payload: payload || 0,
  });
};

const recalculateTime = (field, getState, selector, dispatch, form) => {
  if (!field) return null;

  const currentTask = selector(getState(), field);
  const sumTasks = currentTask.tasks.filter(({ isChecked }) => isChecked).reduce((sum, item) => ({
    min: sum.min + item.minimumMinutes,
    max: sum.max + item.maximumMinutes,
  }), { min: 0, max: 0 });

  changeWrapper({ dispatch, form, field: `${field}.minimumMinutes`, payload: sumTasks.min });
  changeWrapper({ dispatch, form, field: `${field}.maximumMinutes`, payload: sumTasks.max });

  const parentField = field.replace(/.?tasks\[\d+\]$/, '');

  return recalculateTime(parentField, getState, selector, dispatch, form);
};

export const actionToggleTask = ({ form, field }) =>
  (dispatch, getState) => {
    const selector = formValueSelector(form);
    const parentField = field.replace(/.?tasks\[\d+\]$/, '');

    recalculateTime(parentField, getState, selector, dispatch, form);

    dispatch(actionGeneralCalculation({ form }));
  };


export const actionRemoveTask = ({ form, field, index }) =>
  (dispatch, getState) => {
    const selector = formValueSelector(form);
    dispatch(arrayRemove(form, field.replace(/\[\d+\]$/, ''), index));
    const parentField = field.replace(/.?tasks\[\d+\]$/, '');
    recalculateTime(parentField, getState, selector, dispatch, form);

    dispatch(actionGeneralCalculation({ form }));
    // return null;
  };

export const actionChangeTaskHours = ({ form, field, value }) =>
  (dispatch, getState) => {
    const selector = formValueSelector(form);
    changeWrapper({ dispatch, form, field, payload: value });
    const parentField = field
      .replace(/\.minimumMinutes$|\.maximumMinutes$/, '')
      .replace(/.?tasks\[\d+\]$/, '');

    recalculateTime(parentField, getState, selector, dispatch, form);

    dispatch(actionGeneralCalculation({ form }));
  };

export const actionChangeTaskName = ({ form, field, value }) =>
  (dispatch) => {
    changeWrapper({ dispatch, form, field, payload: value });
  };


export const actionAddSubTask = ({ form, field }) =>
  (dispatch, getState) => {
    const selector = formValueSelector(form);
    const parent = field.replace(/.?tasks$/, '');
    const parentObj = selector(getState(), parent);

    if (!parentObj.tasks || !parentObj.tasks.length) {
      dispatch(actionChangeTaskHours({
        form,
        value: 0,
        fieldName: 'minimumMinutes',
        field: `${parent}.minimumMinutes`,
      }));
      dispatch(actionChangeTaskHours({
        form,
        value: 0,
        fieldName: 'maximumMinutes',
        field: `${parent}.maximumMinutes`,
      }));
    }

    dispatch(arrayPush(form, field, { isChecked: true, minimumMinutes: 0, maximumMinutes: 0 }));
  };
