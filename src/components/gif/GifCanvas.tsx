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

const COLORS_ONE = ["#eb75b6", "#ddf3ff", "#6e3deb", "#c92f3c"];
const COLORS_TWO = ["#ffbe76", "#eb4d4b", "#30336b", "#6ab04c"];
type Preset = "one" | "two";

const gifWorkerFactory = () =>
  new GifModule({
    workers: 2,
    quality: 10,
    workerScript: gifWorkerUrl,
  });

export const GifMaker = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(undefined);
  const [gifBlob, setGifBlob] = useState<Blob | undefined>(undefined);
  const [capturingGif, setCapturingGif] = useState<boolean>(false);
  const [preset, setPreset] = useState<Preset>("one");

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

    gifWorkerInstance.addFrame(canvas, { delay: 0 });

    const intervalId = setInterval(() => {
      gifWorkerInstance.addFrame(canvas, {
        copy: true,
        delay: 20,
      });
    }, 75);

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
            This generates a 5-second GIF from a fancy 💅 mesh gradient 💅 to
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
                <div>
                  <input
                    type="radio"
                    id="preset-radio-one"
                    name="one"
                    value="one"
                    onChange={(e) => {
                      setPreset(e.target.value);
                    }}
                    checked={preset === "one"}
                  />
                  <label htmlFor="preset-radio-one">One</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="preset-radio-two"
                    name="two"
                    value="two"
                    onChange={(e) => {
                      setPreset(e.target.value);
                    }}
                    checked={preset === "two"}
                  />
                  <label htmlFor="preset-radio-two">Two</label>
                </div>
              </fieldset>
            </div>
          </div>
          <button onClick={handleTakeSnapshot} disabled={!canTakeSnapshot}>
            {capturingGif ? "Capturing GIF..." : "Capture GIF"}
          </button>
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
  ({ preset }: { preset: Preset }, ref: RefObject<HTMLCanvasElement>) => {
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
      gradient.initGradient(
        "#" + canvasId,
        preset === "one" ? COLORS_ONE : COLORS_TWO
      );
      gradient.setCanvasSize(600, 400);
      // Mesh Id
      // Any positive numeric value which acts as a seed for mesh pattern
      gradient?.changePosition(currentPosition);
      setInterval(() => {
        currentPosition.current = currentPosition.current + 0.07;
        gradient?.changePosition(currentPosition.current);
      }, 16.6);
    }, []);

    useEffect(() => {
      gradient?.changeGradientColors(
        preset === "one" ? COLORS_ONE : COLORS_TWO
      );
      gradient?.setCanvasSize(800, 600);
    }, [preset]);

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
