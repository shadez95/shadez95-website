import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface TextFieldProps {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<any>) => void;
  value?: string | number | string[] | undefined;
  success?: boolean | null;
  required: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  required,
  success,
}): JSX.Element => {
  const controlClassName = `control${success != null && ' has-icons-right'}`;
  let textClassName = 'textarea';
  if (success != null) {
    textClassName = `textarea${success ? ' is-success' : ' is-danger'}`;
  }

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className={controlClassName}>
        <textarea
          className={textClassName}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          id={name}
          required={required}
        />
        { success != null && (
          <span className={`icon is-small is-right ${success ? 'has-text-success' : 'has-text-danger'}`}>
            <FontAwesomeIcon icon={success ? faCheck : faExclamationTriangle} />
          </span>
        )}
      </div>
    </div>
  );
};
