import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { navigate } from 'gatsby';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'form-hooks';
import { Layout } from '../../components/Layout';
import { InputField } from '../../components/InputField';
import { TextField } from '../../components/TextField';
import { JSONKeyValueString } from '../../components/CustomTypes';

function encode(data: JSONKeyValueString): string {
  return Object.keys(data)
    .map((key: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function validateEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Index: React.FC = (): JSX.Element => {
  const onSubmit = (values: JSONKeyValueString): void => {
    // e.preventDefault();
    // const form = e.currentTarget;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...values,
      }),
    })
      .then((): void => {
        // const actionAttr = form.getAttribute('action');
        // if (actionAttr == null) {
        //   console.log(actionAttr);
        //   return;
        // }
        // navigate(actionAttr);
        navigate('/contact/thanks/');
      })
      .catch((error): void => alert(error));
  };

  const [captchaDisable, setCaptchaDisable] = useState(true);
  const [allValuesNotFilled, setAllValuesNotFilled] = useState(true);

  function handleCaptchaChange(check: string | null): void {
    if (typeof check === 'string') setCaptchaDisable(false);
  }

  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit,
    // disabling no-shadow because it's more explicit and
    // will understand better later
    // eslint-disable-next-line no-shadow
    validate: (values): JSONKeyValueString => {
      const { name, email, message } = values;

      // disable eslint prefer-const because there
      // is chance validationErrors will be set
      // eslint-disable-next-line prefer-const
      let validationErrors: JSONKeyValueString = {};

      console.log('validate name: ', name);
      if (!name.length) validationErrors.name = 'Name required';

      if (!email.length) {
        errors.email = 'Email required';
      } else if (!validateEmail(values.email)) validationErrors.email = 'Not a valid email';

      if (!message.length) validationErrors.message = 'Message required';

      if (name.length > 0 && email.length > 0 && message.length > 0 && isEmpty(validationErrors)) {
        setAllValuesNotFilled(false);
      } else {
        setAllValuesNotFilled(true);
      }

      return validationErrors;
    },
  });

  console.log('touched.name', touched.name);
  console.log('touched.email', touched.email);
  // console.log('errors.name', errors.name);

  let nameSuccess;
  let emailSuccess;
  let messageSuccess;

  if (touched.name != null) {
    nameSuccess = !((touched.name && values.name.length === 0) || errors.name);
  }

  if (touched.email != null) {
    emailSuccess = !((touched.email && values.email.length === 0) || errors.email);
  }

  if (touched.message != null) {
    messageSuccess = !((touched.message && values.message.length === 0) || errors.message);
  }

  // console.log('nameSuccess', nameSuccess);
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content container">
            <h1>Contact Me</h1>
            <form
              name="contact"
              method="post"
              action="/contact/thanks/"
              data-netlify="true"
              data-netlify-recaptcha="true"
              onSubmit={handleSubmit}
            >
              {/* The `form-name` hidden field is required to
              support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <div className="columns">
                <div className="column">
                  <InputField
                    label="Your Name"
                    name="name"
                    type="text"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    success={nameSuccess}
                  />
                </div>
                <div className="column">
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    success={emailSuccess}
                  />
                </div>
              </div>
              <TextField
                label="Message"
                name="message"
                value={values.message}
                onBlur={handleBlur}
                onChange={handleChange}
                required
                success={messageSuccess}
              />
              <div className="field">
                <ReCAPTCHA
                  sitekey="6LdOKaYUAAAAAGjMLVg9qpoMss1Su76ohT7ovWHr"
                  onChange={handleCaptchaChange}
                />
              </div>
              <div className="field">
                <button className="button is-primary" type="submit" disabled={isSubmitting || allValuesNotFilled || captchaDisable}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
