import Element from "./Element.js";

class Timeline extends Element {
  constructor(props) {
    super(props);

    const {
      graph,
      trackThickness,
      trackColor,
      trackFillColor,
      markerSize,
      markerColor,
      setCurrentStep,
    } = props;

    this.trackThickness = trackThickness;
    this.trackColor = trackColor;
    this.trackFillColor = trackFillColor;
    this.markerSize = markerSize;
    this.markerColor = markerColor;
    this.setCurrentStep = setCurrentStep;

    this.prepare({ graph });
  }

  prepare = ({ graph }) => {
    this.setStyle("transition", `all ${graph.stepInterval}ms linear`);
    this.setStyle("height", `${this.markerSize + this.markerSize / 2}px`);
    this.setStyle(
      "padding-top",
      `${this.markerSize / 2 + this.trackThickness / 2}px`
    );

    const track = new Element({
      className: "evolution-graph__timeline__track",
    });
    track.setStyle("height", `${this.trackThickness}px`);
    track.setStyle("background-color", this.trackColor);
    track.setStyle("border-radius", `${this.trackThickness / 2}px`);

    const trackFill = new Element({
      className: "evolution-graph__timeline__track__fill",
    });
    trackFill.setStyle("height", `${this.trackThickness}px`);
    trackFill.setStyle("background-color", this.trackFillColor);
    trackFill.setStyle("border-radius", `${this.trackThickness / 2}px`);
    trackFill.setStyle("transition", `all ${graph.stepInterval}ms linear`);

    const markers = graph.labels.map((label, index) => {
      const marker = new Element({
        className: `evolution-graph__timeline__track__marker marker-${index}`,
      });
      marker.setStyle("transition", `all ${graph.stepInterval}ms linear`);
      marker.setStyle("width", `${this.markerSize}px`);
      marker.setStyle("height", `${this.markerSize}px`);
      marker.setStyle("background-color", this.markerColor);
      marker.setStyle(
        "transform",
        `translateY(calc(-50% + ${this.trackThickness / 2}px)`
      );

      const markerLabel = new Element({
        className: "evolution-graph__timeline__track__marker__label",
      });
      markerLabel.setStyle(
        "transform",
        `rotate(-90deg) translateY(50%) translateX(calc(-100% - ${this.markerSize}px))`
      );

      markerLabel.body.innerHTML = label;

      marker.body.append(markerLabel.body);

      marker.body.addEventListener("click", () => {
        this.setCurrentStep(index, true);
      });

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

  update = ({ graph, currentStep }) => {
    this.elements.trackFill.setStyle(
      "width",
      `calc(${(currentStep / (graph.labels.length - 1)) * 100}%)`
    );

    this.elements.markers.forEach((marker, index) => {
      currentStep >= index
        ? marker.setStyle("background-color", this.trackFillColor)
        : marker.setStyle("background-color", this.markerColor);
    }, graph.stepInterval);
  };
}

export default Timeline;
