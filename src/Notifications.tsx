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
import { useState } from "react";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([...cannedNotifications]);
  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    const nextNotifications = [...notifications];
    const [movedNotif] = nextNotifications.splice(result.source.index, 1);
    nextNotifications.splice(result.destination.index, 0, movedNotif);
    setNotifications(nextNotifications);
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
                key={messageEntry.id}
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

const cannedNotifications = [
  { id: "message-1", icon: faCoffee },
  { id: "message-2", icon: faMessage },
  { id: "message-3", icon: faBurger },
  { id: "message-4", icon: faHeartCircleCheck },
  { id: "message-5", icon: faMapSigns },
];

// why am I never hearing a notification reply
// do you prefer vms or messages? which ones do you like the most?
// ranking notifications by preference
