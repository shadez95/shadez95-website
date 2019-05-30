import React, { useState } from 'react';
import { navigate } from 'gatsby';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'form-hooks';
import { Layout } from '../../components/Layout';
import { InputField } from '../../components/InputField';
import { JSONKeyValueString } from '../../components/CustomTypes';

function encode(data: JSONKeyValueString): string {
  return Object.keys(data)
    .map((key: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
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
      if (name.length > 0 && email.length > 0 && message.length > 0) {
        setAllValuesNotFilled(false);
      } else {
        setAllValuesNotFilled(true);
      }
      return ({
        ...(!values.name.length ? { name: 'Requires a name' } : {}),
        ...(!values.email.length ? { email: 'Requires an email' } : {}),
        ...(!values.message.length ? { email: 'Requires a message' } : {}),
      });
    },
  });

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
              onSubmit={handleSubmit}
            >
              {/* The `form-name` hidden field is required to
              support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <div className="columns">
                <div className="column">
                  <InputField label="Your Name" name="name" type="text" value={values.name} onBlur={handleBlur} onChange={handleChange} required />
                  { touched.name && errors.name }
                </div>
                <div className="column">
                  <InputField label="Email" name="email" type="email" value={values.email} onBlur={handleBlur} onChange={handleChange} required />
                  { touched.email || errors.email }
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="message">
                  Message
                </label>
                <div className="control">
                  { touched.message || errors.message }
                  <textarea
                    className="textarea"
                    name="message"
                    value={values.message}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="message"
                    required
                  />
                </div>
              </div>
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
