import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as styles from "./Timeline.css";

type Event = {
  name: string;
  year: string;
};

const events: Event[] = [
  {
    name: "I wrote my first line of HTML",
    year: "2010",
  },
  {
    name: "I wrote my first line of Python",
    year: "2012",
  },
  {
    name: "I learned to write a database schema",
    year: "2013",
  },
  {
    name: "I wrote an AngularJS app terribly",
    year: "2015",
  },
  {
    name: "I learnt how to build a web app with React",
    year: "2016",
  },
  {
    name: "I started my first software development role 🥳",
    year: "2017",
  },
  {
    name: "I learnt how to build cool animations and transitions on the web",
    year: "2019",
  },
];

export const Timeline = () => (
  <div
    className={styles.wrapper}
    style={assignInlineVars({ [styles.eventCount]: events.length.toString() })}
  >
    <div className={styles.line}></div>
    {events.map((e, index) => (
      <div
        key={e.name}
        className={styles.event({ align: index % 2 === 0 ? "left" : "right" })}
        style={assignInlineVars({ [styles.eventOffset]: `${index * 150}px` })}
      >
        <div className={styles.year}>{e.year}</div>
        <div>{e.name}</div>
      </div>
    ))}
  </div>
);
