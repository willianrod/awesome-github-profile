import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import PropType from 'prop-types';
import { Field } from 'react-final-form';

export const hasValue = (value) => {
  if (!value) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (value instanceof Date) return true;
  if (typeof value === 'object') return Object.keys(value).length > 0;
};

export const wrapField = (Comp, defaultProps) => {
  // eslint-disable-next-line react/display-name
  const FieldWrapper = memo(
    forwardRef(({ required, validate, ...props }, ref) => {
      const compProps = useMemo(() => ({ ...defaultProps, ...props }), [props]);

      const renderField = useCallback(
        (fieldProps) => {
          const { meta } = fieldProps;
          const isInvalid = meta?.error && meta?.touched;
          return (
            <>
              <Comp required={required} ref={ref} {...fieldProps} />
              {isInvalid && <span className="errorMessage">{meta.error}</span>}
            </>
          );
        },
        [ref, required]
      );

      const validateRequired = useCallback(
        (value) => {
          if (required && hasValue(value)) return 'Campo requerido';

          if (validate) return validate(value);
          return undefined;
        },
        [required, validate]
      );

      return <Field validate={validateRequired} {...compProps} render={renderField} />;
    })
  );

  FieldWrapper.propTypes = {
    validate: PropType.func,
    required: PropType.boolean
  };

  return FieldWrapper;
};
