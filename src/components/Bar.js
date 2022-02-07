import Element from "./Element.js";

class Bar extends Element {
  constructor(props) {
    super(props);

    const {
      position,
      value,
      thickness,
      label,
      labelWidth,
      color,
      image,
      graph,
      renderValue,
    } = props;

    this.position = position;
    this.value = value;
    this.thickness = thickness;
    this.label = label;
    this.labelWidth = labelWidth;
    this.color = color;
    this.image = image;
    this.renderValue = renderValue;

    this.prepare({ graph });
  }

  prepare = ({ graph }) => {
    this.setStyle(
      "transition",
      `all ${graph.stepInterval}ms linear, top ${graph.transitionTopInterval}ms linear`
    );

    const label = new Element({
      type: "label",
      className: "evolution-graph__bar__label",
    });
    label.setStyle("min-width", `${this.labelWidth}px`);

    const labelText = new Element({
      className: "evolution-graph__bar__label__text",
    });
    labelText.body.innerHTML = this.label;

    const imageWrapper = new Element({
      className: "evolution-graph__bar__image-wrapper",
    });

    const image = new Element({
      type: "img",
      className: "evolution-graph__bar__image",
    });
    image.body.setAttribute("src", this.image);

    const track = new Element({
      className: "evolution-graph__bar__track",
    });

    const trackFill = new Element({
      className: "evolution-graph__bar__track__fill",
    });
    trackFill.setStyle("height", `${this.thickness}px`);
    trackFill.setStyle("background-color", this.color);
    trackFill.setStyle("border", `1px solid ${this.color}`);
    trackFill.setStyle("transition", `all ${graph.stepInterval}ms linear`);

    const trackValue = new Element({
      className: "evolution-graph__bar__track__value",
    });

    track.body.append(trackFill.body);
    track.body.append(trackValue.body);
    imageWrapper.body.append(image.body);
    if (this.image?.length) label.body.append(imageWrapper.body);
    label.body.append(labelText.body);

    this.elements = {
      label,
      labelText,
      imageWrapper,
      image,
      track,
      trackFill,
      trackValue,
    };

    this.body.append(label.body);
    this.body.append(track.body);
  };

  update = ({ graph, newValue, position }) => {
    this.value = newValue;
    this.position = position;

    this.setStyle("top", `${(this.thickness + graph.gap) * this.position}px`);
    this.elements.trackFill.setStyle(
      "width",
      `calc(${(this.value / graph.higherValue) * 100}%`
    );

    this.elements.trackValue.body.innerHTML = this.renderValue
      ? this.renderValue(this.value)
      : this.value;
  };
}

export default Bar;
