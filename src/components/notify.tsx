import React from 'react';
import toaster from 'toasted-notes';

/**
 * notify is a wrapper function to toasted-notes notify library.
 * Call the function to display a notification. Notification uses
 * bulma classnames for styling
 * @param message - Message to display in notification
 * @param duration - Duration of notification (Default: 5000 ms)
 */
export const notify = (message: string, duration = 5000): void => {
  toaster.notify(({ onClose }): JSX.Element => (
    <div className="notification is-danger">
      <button type="button" onClick={onClose} className="delete" />
      {message}
    </div>
  ),
  {
    duration,
  });
};
