import React from 'react';
import { navigate } from 'gatsby';
import { Layout } from '../../components/Layout';
import { useContactForm } from '../../components/InputText';

function encode(data: object): string {
  return Object.keys(data)
    .map((key: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const Index: React.FC = (): JSX.Element => {
  const { inputs, handleInputChange } = useContactForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...inputs,
      }),
    })
      .then((): void => {
        const actionAttr = form.getAttribute('action');
        if (actionAttr == null) {
          console.log(actionAttr);
          return;
        }
        navigate(actionAttr);
      })
      .catch((error): void => alert(error));
  };

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content container">
            <h1>Contact</h1>
            <form
              name="contact"
              method="post"
              action="/contact/thanks/"
              data-netlify="true"
              data-netlify-recaptcha="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              {/* The `form-name` hidden field is required to
              support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label className="label" htmlFor="bot-field">
                  Don’t fill this out:
                  {' '}
                  <input name="bot-field" onChange={handleInputChange} />
                </label>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <div className="control">
                      <label className="label" htmlFor="name">
                      Your name
                      </label>
                      <input
                        className="input"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        id="name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label" htmlFor="email">
                    Email
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                        id="email"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="message">
                  Message
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name="message"
                    onChange={handleInputChange}
                    id="message"
                    required
                  />
                </div>
              </div>
              <div data-netlify-recaptcha="true" />
              <div className="field">
                <button className="button is-primary" type="submit">
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
