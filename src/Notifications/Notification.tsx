import * as styles from "./Notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";

export const Notification = ({
  id,
  index,
  icon,
  heading,
  body,
}: {
  id: any;
  index: number;
  icon: any;
  heading: string;
  body: string;
}) => (
  <Draggable draggableId={id} index={index}>
    {(provided) => (
      <div
        className={styles.notification}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div style={{ alignSelf: "center" }}>
          <FontAwesomeIcon icon={icon} size="lg" />
        </div>
        <div>
          <div>{heading}</div>
          <div>{body}</div>
        </div>
        <div
          style={{
            marginRight: "0",
            marginLeft: "auto",
            flexShrink: 0,
            // width: "100%",
            // flex: "0 1 auto",
            fontSize: "14px",
          }}
        >
          45m ago
        </div>
      </div>
    )}
  </Draggable>
);
