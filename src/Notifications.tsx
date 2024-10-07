import { Notification } from "./Notifications/Notification";
import * as styles from "./Notifications.css";

export const Notifications = () => (
  <div className={styles.notificationsList}>
    {notifications.map((k, idx) => (
      <Notification key={idx} />
    ))}
  </div>
);

const notifications = [{}, {}, {}, {}, {}];

// why am I never hearing a notification reply
// do you prefer vms or messages? which ones do you like the most?
// ranking notifications by preference
