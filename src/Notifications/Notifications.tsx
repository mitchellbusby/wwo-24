import { Notification } from "./Notification";
import * as styles from "./Notifications.css";
import {
  DragDropContext,
  Droppable,
  type OnDragEndResponder,
} from "react-beautiful-dnd";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import {
  faBurger,
  faHeartCircleCheck,
  faMapSigns,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SmolDocumentStyle } from "../components/SmolDocumentStyle";
import { DailyFooter } from "../components/DailyFooter";

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
          {(provided) => (
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
                  heading={messageEntry.heading}
                  body={messageEntry.body}
                  timestamp={messageEntry.timestamp}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <DailyFooter day={"notifications"} />
      <SmolDocumentStyle />
    </div>
  );
};

const cannedNotifications = shuffle([
  {
    id: "message-1",
    icon: faMessage,
    heading: "Angela Bloggo",
    body: "OK I have some huge tea",
    timestamp: "8m ago",
  },
  {
    id: "message-2",
    icon: faCoffee,
    heading: "Skip The Queue",
    body: "Your coffee will be ready in 5 minutes",
    timestamp: "2m ago",
  },
  {
    id: "message-3",
    icon: faBurger,
    heading: "Deliverdash",
    body: "20% off all orders TODAY ONLY with the coupon NEVERGOOUT",
    timestamp: "45m ago",
  },
  {
    id: "message-4",
    icon: faHeartCircleCheck,
    heading: "Activity",
    body: "You haven't yet closed your activity rings for today! Get out and move some more",
    timestamp: "4:45pm",
  },
  {
    id: "message-5",
    icon: faMapSigns,
    heading: "Maps",
    body: "How did you find 401 Coffee? Share your review for others to find out cool places",
    timestamp: "Sat 9:01am",
  },
  {
    id: "message-6",
    icon: faMessage,
    heading: "Johnny Bravado",
    body: "Are you headed to Fiona's party tonight?",
    timestamp: "1h ago",
  },
]);

function shuffle<T>(array: T[]) {
  const newArray = [...array];
  let currentIndex = newArray.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}

// todo: add octothorpes cbs https://weirdweboctober.website/
