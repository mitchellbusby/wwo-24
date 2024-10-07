import { Notification } from "./Notifications/Notification";
import * as styles from "./Notifications.css";
import {
  DragDropContext,
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
    <div className={styles.page}>
      <h1>Notifications</h1>
      <div>
        How do you like your notifications? Order the notifications below,
        either by how much you like them, how much joy they spark, how much you
        hate them or any other intuitive ordering method you like :)
      </div>
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
    * {
  box-sizing: border-box;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 5vh clamp(1rem, 5vw, 3rem) 1rem;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: #222;
}

body > * {
  --layout-spacing: max(8vh, 3rem);
  --max-width: 70ch;
  width: min(100%, var(--max-width));
  margin-left: auto;
  margin-right: auto;
}

main {
  margin-top: var(--layout-spacing);
}

footer {
  margin-top: auto;
  padding-top: var(--layout-spacing);
}

footer p {
  border-top: 1px solid #ccc;
  padding-top: 0.25em;
  font-size: 0.9rem;
  color: #767676;
}

:is(h1, h2, h3) {
  line-height: 1.2;
}

:is(h2, h3):not(:first-child) {
  margin-top: 2em;
}

article * + * {
  margin-top: 1em;
}

a {
  color: navy;
  text-underline-offset: 0.15em;
}`,
        }}
      ></style>
    </div>
  );
};

const cannedNotifications = [
  { id: "message-1", icon: faCoffee },
  { id: "message-2", icon: faMessage },
  { id: "message-3", icon: faBurger },
  { id: "message-4", icon: faHeartCircleCheck },
  { id: "message-5", icon: faMapSigns },
];

// todo: finish filling out notifications

// todo: add octothorpes cbs https://weirdweboctober.website/
