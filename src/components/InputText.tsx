import React, { useState } from 'react';

interface ContactFormReturnType {
  inputs: {};
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
}

export const useContactForm = (): ContactFormReturnType => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
  ): void => {
    event.persist();
    setInputs((): {} => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  return {
    inputs,
    handleInputChange,
  };
};
