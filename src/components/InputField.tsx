import React from 'react';

type HTMLInputTypes = 'button' | 'checkbox' | 'color' | 'date' |
'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' |
'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' |
'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

interface RightIconProps {
  success: boolean | null | undefined;
}

const RightIcon: React.FC<RightIconProps> = ({ success }): JSX.Element => {
  console.log('<RightIcon> success', success);
  if (success != null) {
    return (
      <span className={`icon is-small is-right ${success ? 'has-text-success' : 'has-text-danger'}`}>
        <i className={`fas ${success ? 'fa-check' : 'fa-exclamation-triangle'}`} />
      </span>
    );
    // return success ? (
    //   <span className="icon is-small is-right has-text-success">
    //     <i className="fas fa-check" />
    //   </span>
    // ) : (
    //   <span className="icon is-small is-right has-text-danger">
    //     <i className="fas fa-exclamation-triangle" />
    //   </span>
    // );
  }
  return <div />;
};

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

  console.log(`<InputField> name:${name} | success:${success}`);
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
        <RightIcon success={success} />
      </div>
    </div>
  );
};
