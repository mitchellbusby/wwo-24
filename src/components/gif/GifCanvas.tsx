import MeshGradient from "mesh-gradient.js";
import GifModule from "gif.js.optimized";
import gifWorkerUrl from "gif.js.optimized/dist/gif.worker.js?url";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { DailyFooter } from "../DailyFooter";

type PresetId = string;

const presets = [
  {
    id: "one",
    name: "One",
    colors: ["#eb75b6", "#ddf3ff", "#6e3deb", "#c92f3c"],
  },
  {
    id: "two",
    name: "Two",
    colors: ["#ffbe76", "#eb4d4b", "#30336b", "#6ab04c"],
  },

  {
    id: "three",
    name: "Three",
    colors: ["#8e44ad", "#2980b9", "#ecf0f1", "#f1c40f"],
  },
  {
    id: "four",
    name: "Four",
    colors: ["#2ecc71", "#1abc9c", "#ecf0f1", "#f1c40f", "#3498db"],
  },
];

const getPresetColors = (id: string) => presets.find((f) => f.id === id).colors;

const gifWorkerFactory = () =>
  new GifModule({
    workers: navigator.hardwareConcurrency || 2,
    quality: 10,
    workerScript: gifWorkerUrl,
  });

export const GifMaker = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(undefined);
  const [gifBlob, setGifBlob] = useState<Blob | undefined>(undefined);
  const [capturingGif, setCapturingGif] = useState<boolean>(false);
  const [preset, setPreset] = useState<PresetId>("one");

  const gifBlobUrl = useMemo(() => {
    return !!gifBlob ? URL.createObjectURL(gifBlob) : undefined;
  }, [gifBlob]);

  const [gifWorkerInstance] = useState(gifWorkerFactory);

  useEffect(() => {
    gifWorkerInstance.on("finished", function (blob) {
      console.log("Finished rendering GIF");
      setGifBlob(blob);
      setCapturingGif(false);
    });
  }, []);

  const canTakeSnapshot = !!canvas && !capturingGif;

  const handleTakeSnapshot = () => {
    setCapturingGif(true);
    setGifBlob(undefined);

    gifWorkerInstance.abort();
    gifWorkerInstance.frames = [];
    delete gifWorkerInstance.imageParts;
    delete gifWorkerInstance.finishedFrames;
    delete gifWorkerInstance.nextFrame;

    gifWorkerInstance.addFrame(canvas, { delay: 50 });

    const intervalId = setInterval(() => {
      gifWorkerInstance.addFrame(canvas, {
        copy: true,
        delay: 50,
      });
    }, 50);

    setTimeout(() => {
      gifWorkerInstance.render();
      clearInterval(intervalId);
    }, 5000);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <GifCanvas ref={(elem) => setCanvas(elem)} preset={preset} />
        <div
          style={{
            padding: 16,
          }}
        >
          <h1>Mint your own mesh gradient GIF ✨</h1>
          <p>
            This generates a ~3-second GIF from a fancy 💅 mesh gradient 💅 to
            the left.
          </p>
          <p>
            It takes a few seconds to process the GIF so bear with it after
            clicking "Capturing GIF". Your generated GIF will show up below.
          </p>
          <p>You can alter the colours or the animation 'seed' below.</p>
          <p>
            <i>
              Warning: this is not a very efficient use of GIFs, but it is fun!
            </i>{" "}
            😆
          </p>
          <h2>Controls</h2>
          <div style={{ marginBottom: "16px" }}>
            <p>Color presets</p>
            <div>
              <fieldset>
                <legend>Select a preset color</legend>
                {presets.map((m) => (
                  <div key={m.id}>
                    <input
                      type="radio"
                      id={`preset-radio-${m.id}`}
                      name={m.id}
                      value={m.id}
                      onChange={(e) => {
                        setPreset(e.target.value);
                      }}
                      checked={preset === m.id}
                    />
                    <label htmlFor={`preset-radio-${m.id}`}>{m.name}</label>
                  </div>
                ))}
              </fieldset>
            </div>
          </div>
          <button onClick={handleTakeSnapshot} disabled={!canTakeSnapshot}>
            {capturingGif ? "Capturing GIF..." : "Capture GIF"}
          </button>
          <p>
            This page makes use of the{" "}
            <a href="https://github.com/anup-a/mesh-gradient.js">
              mesh-gradient.js
            </a>{" "}
            npm library to create a mesh gradient on a HTML canvas, and{" "}
            <a href="https://github.com/terikon/gif.js.optimized">
              gif.js.optimised
            </a>{" "}
            to generate a GIF
          </p>
          <div>
            <DailyFooter day="GIFs" />
          </div>
        </div>
      </div>
      {!!gifBlobUrl && (
        <div>
          <h2>Your generated GIF</h2>
          <p>If you like it, right click and save!</p>
          <div>{gifBlobUrl && <img src={gifBlobUrl} />}</div>
        </div>
      )}
    </div>
  );
};

export const GifCanvas = forwardRef(
  (
    { preset: presetId }: { preset: PresetId },
    ref: RefObject<HTMLCanvasElement>
  ) => {
    // create instance of Gradient Class
    const [gradient] = useState(() => new MeshGradient());
    const canvasId = "my-canvas";
    const currentPosition = useRef(780);

    const changePosition = () => {
      gradient?.changePosition(currentPosition.current);
    };

    useEffect(() => {
      // initialize new gradient
      // @Params
      // 1. id of canvas element
      // 2. array of colors in hexcode
      gradient.initGradient("#" + canvasId, getPresetColors(presetId));
      gradient.setCanvasSize(600, 400);
      // Mesh Id
      // Any positive numeric value which acts as a seed for mesh pattern
      gradient?.changePosition(currentPosition);
      setInterval(() => {
        currentPosition.current = currentPosition.current + 0.1;
        gradient?.changePosition(currentPosition.current);
      }, 16.6);
    }, []);

    useEffect(() => {
      gradient?.changeGradientColors(getPresetColors(presetId));
      gradient?.setCanvasSize(800, 600);
    }, [presetId]);

    const regenerateSeed = () => {
      const value = Math.floor(Math.random() * 1000);
      currentPosition.current = value;
      // change pattern by changing mesh Id
      changePosition();
    };

    return (
      <div style={{ position: "relative" }}>
        <canvas id={canvasId} width="400" height="400" ref={ref} />
        <button
          onClick={() => regenerateSeed()}
          style={{ position: "absolute", bottom: 16, right: 16 }}
        >
          Randomise animation seed
        </button>
      </div>
    );
  }
);
