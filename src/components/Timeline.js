import Element from "./Element.js";

class Timeline extends Element {
  constructor(props) {
    super(props);

    const {
      markerSize,
      markerColor,
      trackWidth,
      trackFillColor,
      trackColor,
      graph,
      setCurrentStep,
    } = props;

    this.markerSize = markerSize;
    this.markerColor = markerColor;
    this.trackWidth = trackWidth;
    this.trackFillColor = trackFillColor;
    this.trackColor = trackColor;
    this.setCurrentStep = setCurrentStep;

    this.prepare({ graph });
  }

  prepare = ({ graph }) => {
    this.setStyle("transition", `all ${graph.evolutionInterval}ms linear`);
    this.setStyle("height", `${this.markerSize + this.markerSize / 2}px`);
    this.setStyle(
      "padding-top",
      `${this.markerSize / 2 + this.trackWidth / 2}px`
    );

    const track = new Element({
      className: "evolution-graph__timeline__track",
    });
    track.setStyle("height", `${this.trackWidth}px`);
    track.setStyle("background-color", this.trackColor);

    const trackFill = new Element({
      className: "evolution-graph__timeline__track__fill",
    });
    trackFill.setStyle("height", `${this.trackWidth}px`);
    trackFill.setStyle("background-color", this.trackFillColor);
    trackFill.setStyle("border-radius", `${this.trackWidth / 2}px`);
    trackFill.setStyle("transition", `all ${graph.evolutionInterval}ms linear`);

    const markers = graph.labels.map((label, index) => {
      const marker = new Element({
        className: `evolution-graph__timeline__track__marker marker-${index}`,
      });
      marker.setStyle("width", `${this.markerSize}px`);
      marker.setStyle("height", `${this.markerSize}px`);
      marker.setStyle("background-color", this.markerColor);

      marker.body.addEventListener("click", () => {
        this.setCurrentStep(index);
      });

      const markerLabel = new Element({
        className: "evolution-graph__timeline__track__marker__label",
      });

      markerLabel.setStyle(
        "transform",
        `rotate(-90deg) translateY(50%) translateX(calc(-100% - ${this.markerSize}px))`
      );

      markerLabel.body.innerHTML = label;

      marker.body.append(markerLabel.body);

      return marker;
    });

    this.elements = {
      track,
      trackFill,
      markers,
    };

    track.body.append(trackFill.body);
    markers.forEach(({ body }) => track.body.append(body));
    this.body.append(track.body);
  };

  update = ({ graph, currentEvolutionIndex }) => {
    this.elements.trackFill.setStyle(
      "width",
      `calc(${(currentEvolutionIndex / (graph.labels.length - 1)) * 100}%)`
    );
  };
}

export default Timeline;
