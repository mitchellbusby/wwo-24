import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import {
  mapLegend,
  mapLegendKey,
  mapLegendLayout,
  mapLegendLine,
  mapWrapper,
} from "./Ritual.css";

const greenOptions = { color: "green", fillColor: "green" };
const purpleOptions = { color: "purple", fillColor: "purple" };

const ENABLE_POLYGON_AUTHORING = false;

export const RitualMap = () => {
  const [draftState, setDraftState] = useState<LatLng[]>([]);

  useEffect(() => {
    // @ts-expect-error
    window.getPoints = () => {
      console.log(draftState);
      setDraftState([]);
    };
  }, [draftState]);

  return (
    <div className={mapWrapper}>
      <MapContainer
        center={{
          lat: -33.90150621745822,
          lng: 151.18492126464847,
        }}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "95dvh" }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {areas.map((area) => (
          <Polygon
            pathOptions={
              area.group === "likeToVisit" ? purpleOptions : greenOptions
            }
            positions={area.points.map((point) => [point.lat, point.lng])}
            key={area.id}
          />
        ))}
        <Polygon pathOptions={greenOptions} positions={draftState} />
        {ENABLE_POLYGON_AUTHORING && (
          <MapObserver
            addNewState={(newState) => {
              setDraftState((prev) => [...prev, newState]);
            }}
          />
        )}
      </MapContainer>
      <div className={mapLegend}>
        <div className={mapLegendLayout}>
          <h1>Walking rituals</h1>
          <p>
            This is a little map of areas I walked regularly when I lived in St
            Peters, where I took up the morning ritual of going on walks :)
          </p>
          <h3>Legend</h3>
          <div className={mapLegendKey}>
            <div
              className={mapLegendLine}
              style={{ background: "green" }}
            ></div>
            <p>Visited frequently</p>
          </div>
          <div className={mapLegendKey}>
            <div
              className={mapLegendLine}
              style={{ background: "purple" }}
            ></div>
            <p>Visited sometimes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapObserver = ({
  addNewState,
}: {
  addNewState: (latLng: LatLng) => void;
}) => {
  const map = useMapEvents({
    click(e) {
      // console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      console.log("captured", e.latlng);
      addNewState(e.latlng);
    },
    locationfound(e) {
      // console.log(e.latlng);
    },
  });
  return <></>;
};

const areas = [
  {
    points: [
      {
        lat: -33.90740794782703,
        lng: 151.18221759796145,
      },
      {
        lat: -33.91332295670492,
        lng: 151.18165969848636,
      },
      {
        lat: -33.914427521308326,
        lng: 151.18449211120608,
      },
      {
        lat: -33.908263155217384,
        lng: 151.18925571441653,
      },
    ],
    id: "sydneyPark",
  },
  {
    points: [
      {
        lat: -33.90645795127925,
        lng: 151.18178844451907,
      },
      {
        lat: -33.90377300794605,
        lng: 151.18439555168155,
      },
      {
        lat: -33.900275190410014,
        lng: 151.1850714683533,
      },

      {
        lat: -33.89815477435667,
        lng: 151.18005037307742,
      },
      {
        lat: -33.899722818197816,
        lng: 151.1782264709473,
      },
    ],
    id: "erskineville",
  },
  {
    points: [
      {
        lat: -33.89712189135297,
        lng: 151.18554353713992,
      },
      {
        lat: -33.89803065855457,
        lng: 151.18189573287964,
      },
      {
        lat: -33.89927797031686,
        lng: 151.18333339691165,
      },
      {
        lat: -33.89963434175488,
        lng: 151.18543624877933,
      },
      {
        lat: -33.898369216408405,
        lng: 151.18620872497561,
      },
    ],
    id: "erskineville2",
  },
  {
    points: [
      {
        lat: -33.90663292494351,
        lng: 151.1828184127808,
      },
      {
        lat: -33.904637389522684,
        lng: 151.18487834930423,
      },
      {
        lat: -33.902517081955025,
        lng: 151.1853289604187,
      },
      {
        lat: -33.90321197847965,
        lng: 151.19071483612063,
      },
      {
        lat: -33.90725652018261,
        lng: 151.1871957778931,
      },
    ],
    id: "erskineville3",
  },
  {
    points: [
      {
        lat: -33.89660665259089,
        lng: 151.1805868148804,
      },
      {
        lat: -33.897461968334284,
        lng: 151.18140220642093,
      },
      {
        lat: -33.89635718388309,
        lng: 151.18612289428714,
      },
      {
        lat: -33.895571302634686,
        lng: 151.18818283081055,
      },
      {
        lat: -33.89448431330203,
        lng: 151.18803262710574,
      },
      {
        lat: -33.89402100216223,
        lng: 151.1892127990723,
      },
      {
        lat: -33.891971711164864,
        lng: 151.18856906890872,
      },
      {
        lat: -33.89355768850543,
        lng: 151.18389129638675,
      },
    ],
    id: "macdonaldtown",
    group: "likeToVisit",
  },
  {
    points: [
      {
        lat: -33.90213109000458,
        lng: 151.18535041809082,
      },
      {
        lat: -33.90282598967531,
        lng: 151.19088649749756,
      },
      {
        lat: -33.90148963912763,
        lng: 151.19236707687378,
      },
      {
        lat: -33.89813976169758,
        lng: 151.19511365890503,
      },
      {
        lat: -33.89844268155833,
        lng: 151.18889093399048,
      },
      {
        lat: -33.89968998729362,
        lng: 151.18603706359863,
      },
    ],
    id: "alexandria",
    group: "likeToVisit",
  },
  {
    points: [
      {
        lat: -33.90125213260821,
        lng: 151.19328975677493,
      },
      {
        lat: -33.90645488725573,
        lng: 151.1883330345154,
      },
      {
        lat: -33.907434822629895,
        lng: 151.18998527526858,
      },
      {
        lat: -33.904192084353845,
        lng: 151.1931395530701,
      },
      {
        lat: -33.90274884798341,
        lng: 151.19543552398684,
      },
    ],
    id: "alexandria2",
    group: "likeToVisit",
  },
];
