import React, { lazy, Suspense } from 'react';
const FormField = lazy(() => import('./FormField'));
const MySelect = lazy(() => import('./Select'));
const CustomDate = lazy(() => import('./DateReact'));
import { MenuItem } from '@mui/material';
const MyRadioGroup = lazy(() => import('./RadioGroup'));
import { useTranslation } from 'react-i18next';
const FieldsContainer = ({ fields }) => {
  const { t } = useTranslation('common');
  return fields.map(({ controlId, label, type, name, value, onChange, error, options = null }) => (
    <Suspense fallback={<div>Loading...</div>}>
      {(() => {
        switch (type) {
          case 'text':
            return (
              <FormField
                controlId={controlId}
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
              />
            );
          case 'password':
            return (
              <FormField
                controlId={controlId}
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
              />
            );
          case 'radio':
            console.log(options)
            return (
              <MyRadioGroup
                name={name}
                value={value}
                onChange={onChange}
                options={options}
                error={error}
              />
            );
          case 'textarea':
            return (
              <FormField
                controlId={controlId}
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
              />
            );
          case 'date':
            return (<CustomDate
              controlId={controlId}
              label={t(label)}
              type={type}
              format="YYYY-MM-DD"
              name={name}
              value={value}
              onChange={onChange}
              error={error}
            
            />)
          case 'select':
            return (<>
              <MySelect
                controlId={controlId}
                labelId={label}
                id={name}
                value={value}
                name={name}
                onChange={onChange}
                label={label}
                options={options}
                error={error}
              /></>

            );
          default:
            return null;
        }
      })()}
    </Suspense>
  ));
};
export default FieldsContainer;
