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

const COLORS = ["#eb75b6", "#ddf3ff", "#6e3deb", "#c92f3c"];

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
    }, 100);

    setTimeout(() => {
      gifWorkerInstance.render();
      clearInterval(intervalId);
    }, 5000);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <GifCanvas ref={(elem) => setCanvas(elem)} />
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
          {/* <h2>Controls</h2> */}
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

export const GifCanvas = forwardRef(({}, ref: RefObject<HTMLCanvasElement>) => {
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
    gradient.initGradient("#" + canvasId, COLORS);
    gradient.setCanvasSize(600, 400);
    // Mesh Id
    // Any positive numeric value which acts as a seed for mesh pattern
    gradient?.changePosition(currentPosition);
    setInterval(() => {
      currentPosition.current = currentPosition.current + 0.07;
      gradient?.changePosition(currentPosition.current);
    }, 16.6);
  }, []);

  const regenerate = () => {
    const value = Math.floor(Math.random() * 1000);
    currentPosition.current = value;
    // change pattern by changing mesh Id
    changePosition();
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas id={canvasId} width="400" height="400" ref={ref} />
      <button
        onClick={() => regenerate()}
        style={{ position: "absolute", bottom: 16, right: 16 }}
      >
        Generate new seed
      </button>
    </div>
  );
});
