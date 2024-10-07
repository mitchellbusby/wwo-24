import * as styles from "./Notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export const Notification = () => (
  <div className={styles.notification}>
    <div style={{ alignSelf: "center" }}>
      {/* todo: icon needs to be bigger :) */}
      <FontAwesomeIcon icon={faCoffee} />
    </div>
    <div>
      <div>Fionn of the Train</div>
      <div>omg hahaha</div>
    </div>
    <div style={{ marginRight: "0", marginLeft: "auto" }}>45m ago</div>
  </div>
);
