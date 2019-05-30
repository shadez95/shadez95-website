import React from 'react';

type HTMLInputTypes = 'button' | 'checkbox' | 'color' | 'date' |
'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' |
'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' |
'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

interface InputFieldProps {
  label: string;
  name: string;
  type: HTMLInputTypes;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<any>) => void;
  value?: string | number | string[] | undefined;
  required: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label, name, type, onBlur, onChange, value, required,
}): JSX.Element => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <div className="control">
      <input
        className="input"
        type={type}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        id={name}
        required={required}
      />
    </div>
  </div>
);
