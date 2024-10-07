import * as styles from "./Notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

export const Notification = ({
  id,
  index,
  icon,
}: {
  id: any;
  index: number;
  icon: any;
}) => (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => (
      <div
        className={styles.notification}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div style={{ alignSelf: "center" }}>
          {/* todo: icon needs to be bigger :) */}
          <FontAwesomeIcon icon={icon} />
        </div>
        <div>
          <div>Fionn of the Train</div>
          <div>omg hahaha</div>
        </div>
        <div style={{ marginRight: "0", marginLeft: "auto" }}>45m ago</div>
      </div>
    )}
  </Draggable>
);
