import Element from "./Element.js";

class Timeline extends Element {
  constructor(props) {
    super(props);

    const { size, color, graph } = props;

    this.size = size;
    this.color = color;

    this.prepare({ graph });
  }

  prepare = ({ graph }) => {
    this.setStyle("transition", `all ${graph.evolutionInterval}ms linear`);

    const track = new Element({
      className: "evolution-graph__timeline__track",
    });

    const markers = graph.labels.map((label, index) => {
      const newMarker = new Element({
        className: `evolution-graph__timeline__track__marker marker-${index}`,
      });

      newMarker.setStyle("width", this.size);
      newMarker.setStyle("height", this.size);
    });

    markers.forEach(({ body }) => track.body.append(body));

    this.elements = {
      track,
      markers,
    };

    this.body.append(track.body);
  };

  update = ({ graph, currentEvolutionIndex }) => {

  };
}

export default Timeline;
