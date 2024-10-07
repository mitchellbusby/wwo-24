import { Notification } from "./Notifications/Notification";
import * as styles from "./Notifications.css";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import {
  faBurger,
  faHeartCircleCheck,
  faMapSigns,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

export const Notifications = () => {
  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="notifications-list">
        {(provided, snapshot) => (
          <div
            className={styles.notificationsList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {notifications.map((messageEntry, idx) => (
              <Notification
                key={idx}
                id={messageEntry.id}
                index={idx}
                icon={messageEntry.icon}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const notifications = [
  { id: "message-1", icon: faCoffee },
  { id: "message-2", icon: faMessage },
  { id: "message-3", icon: faBurger },
  { id: "message-4", icon: faHeartCircleCheck },
  { id: "message-5", icon: faMapSigns },
];

// why am I never hearing a notification reply
// do you prefer vms or messages? which ones do you like the most?
// ranking notifications by preference
