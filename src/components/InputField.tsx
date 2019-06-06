import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { HTMLInputTypes } from '../CustomTypes';

interface InputFieldProps {
  label: string;
  name: string;
  type: HTMLInputTypes;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<any>) => void;
  value?: string | number | string[] | undefined;
  success?: boolean | null;
  required: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  onBlur,
  onChange,
  value,
  required,
  success,
}): JSX.Element => {
  const controlClassName = `control${success != null && ' has-icons-right'}`;
  let inputClassName = 'input';
  if (success != null) {
    inputClassName = `input${success ? ' is-success' : ' is-danger'}`;
  }

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className={controlClassName}>
        <input
          className={inputClassName}
          type={type}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
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
