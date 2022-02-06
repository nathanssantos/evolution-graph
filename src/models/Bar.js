import Element from "./Element.js";

class Bar extends Element {
  constructor(props) {
    super(props);

    const {
      position,
      value,
      width,
      label,
      labelWidth,
      color,
      image,
      chart,
      renderValue,
    } = props;

    this.position = position;
    this.value = value;
    this.width = width;
    this.label = label;
    this.labelWidth = labelWidth;
    this.color = color;
    this.image = image;
    this.renderValue = renderValue;

    this.prepare({ chart });
  }

  prepare = ({ chart }) => {
    this.setStyle(
      "transition",
      `all ${chart.evolutionInterval}ms linear, top ${chart.transitionTopInterval}ms linear`
    );

    const label = new Element({
      type: "label",
      className: "evolution-chart__bar__label",
    });

    label.setStyle("min-width", `${this.labelWidth}px`);

    const labelText = new Element({
      className: "evolution-chart__bar__label__text",
    });

    labelText.body.innerHTML = this.label;

    const imageWrapper = new Element({
      className: "evolution-chart__bar__image-wrapper",
    });

    const image = new Element({
      type: "img",
      className: "evolution-chart__bar__image",
    });

    image.body.setAttribute("src", this.image);

    const track = new Element({
      className: "evolution-chart__bar__track",
    });

    const trackFill = new Element({
      className: "evolution-chart__bar__track__fill",
    });

    trackFill.setStyle("height", `${this.width}px`);
    trackFill.setStyle("background-color", this.color);
    trackFill.setStyle("transition", `all ${chart.evolutionInterval}ms linear`);

    const trackFillValue = new Element({
      className: "evolution-chart__bar__track__fill__value",
    });

    trackFill.body.append(trackFillValue.body);
    track.body.append(trackFill.body);
    imageWrapper.body.append(image.body);
    label.body.append(imageWrapper.body);
    label.body.append(labelText.body);

    this.elements = {
      label,
      labelText,
      imageWrapper,
      image,
      track,
      trackFill,
      trackFillValue,
    };

    this.body.append(label.body);
    this.body.append(track.body);
  };

  update = ({ chart, newValue, position }) => {
    this.value = newValue;
    this.position = position;

    this.setStyle("top", `${(this.width + chart.gap) * this.position}px`);
    this.elements.trackFill.setStyle(
      "width",
      `calc(${(this.value / chart.higherValue) * 100}%`
    );

    this.elements.trackFillValue.body.innerHTML = this.renderValue
      ? this.renderValue(this.value)
      : this.value;
  };
}

export default Bar;
