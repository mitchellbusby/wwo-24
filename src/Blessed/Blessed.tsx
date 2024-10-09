import { useEffect, useRef, useState } from "react";
import { DailyFooter } from "../components/DailyFooter";
import * as styles from "./Blessed.css";

const getRandomId = () => {
  return Math.floor(Math.random() * 10000000).toString();
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const directions = ["ne", "nw", "se", "sw"] as const;
const getRandomDirection = (): "ne" | "nw" | "se" | "sw" => {
  const idx = getRandomNumber(0, 4);
  const direction = directions[idx];
  return direction;
};

export const Blessed = () => {
  const [sparklesState, setSparklesState] = useState<SparkleLocation[]>([]);

  const mapRef = useRef(new Map<string, HTMLElement>());
  useEffect(() => {
    const fireSparkles = (event: MouseEvent) => {
      const newSparkles = [];
      const sparkleCount = getRandomNumber(10, 20);
      for (let i = 0; i <= sparkleCount; i++) {
        const newSparkle = {
          position: {
            x: event.clientX + getRandomNumber(-20, 20),
            y: event.clientY + getRandomNumber(-20, 20),
          },
          id: getRandomId(),
          direction: getRandomDirection(),
          timestamp: Date.now(),
        };
        const repositionNewSparkle = () => {
          const msSinceCreated = Date.now() - newSparkle.timestamp;
          const element = mapRef.current.get(newSparkle.id);
          if (msSinceCreated > 5000) {
            setSparklesState((currState) =>
              currState.filter((s) => s.id !== newSparkle.id)
            );
            return;
          }
          if (element) {
            const translation = {
              x: ["ne", "se"].includes(newSparkle.direction) ? 1 : -1,
              y: ["ne", "nw"].includes(newSparkle.direction) ? 1 : -1,
            };
            element.style.transform = `translate(${
              msSinceCreated * 0.1 * translation.x
            }px, ${msSinceCreated * 0.1 * translation.y}px)`;
          }
          requestAnimationFrame(repositionNewSparkle);
        };

        repositionNewSparkle();
        newSparkles.push(newSparkle);
      }

      setSparklesState((prevSparkles) => [...prevSparkles, ...newSparkles]);
    };

    const mouseDownHandler = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest("[data-blessed-ignore='true']")
      ) {
        return;
      }
      fireSparkles(e);
      const mouseMoveHandler = (e: MouseEvent) => {
        requestAnimationFrame(() => fireSparkles(e));
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
      });
    };

    document.addEventListener("mousedown", mouseDownHandler);

    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);
  return (
    <div>
      {sparklesState.map((s) => (
        <div
          style={{
            top: s.position.y,
            left: s.position.x,
          }}
          className={styles.blessedSparkle}
          key={s.id}
          ref={(element) => {
            if (element) {
              mapRef.current.set(s.id, element);
            } else {
              mapRef.current.delete(s.id);
            }
          }}
        >
          ✨
        </div>
      ))}
      <div className={styles.blessedOuterIsland}>
        <h1>Click to be blessed</h1>
        <div data-blessed-ignore={true} className={styles.blessedIsland}>
          <DailyFooter day="blessed" />
        </div>
      </div>
    </div>
  );
};

type SparkleLocation = {
  position: { x: number; y: number };
  id: string;
  direction: "ne" | "nw" | "se" | "sw";
};
