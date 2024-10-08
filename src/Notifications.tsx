import { Notification } from "./Notifications/Notification";
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
import { useEffect, useState } from "react";

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

  useEffect(() => {
    document.title = "Notifications | Weird Web October (Mitchell Busby)";
  }, []);

  return (
    <div className={styles.page}>
      <link rel="octo:octothorpes" href="Notifications"></link>
      <link
        rel="preload"
        as="fetch"
        href="https://octothorp.es/?uri=https://mitchellbusby.github.io/wwo-24/#/notifications"
      />
      <link rel="octo:octothorpes" href="weirdweboctober" />
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
