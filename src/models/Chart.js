import Element from "./Element.js";
import Bar from "./Bar.js";
import ordernate from "../utils/ordenate.js";

class Chart extends Element {
  constructor(props) {
    super(props);

    const {
      data,
      labels,
      barWidth,
      labelWidth,
      gap,
      higherValue,
      order,
      evolutionInterval,
      transitionTopInterval,
      renderValue,
    } = props;

    this.data = data;
    this.labels = labels;
    this.bars = [];
    this.barWidth = barWidth || 20;
    this.labelWidth = labelWidth;
    this.gap = gap;
    this.higherValue = higherValue;
    this.order = order;
    this.evolutionInterval = evolutionInterval;
    this.transitionTopInterval = transitionTopInterval;
    this.renderValue = renderValue;

    this.prepare();
  }

  prepare = () => {
    const label = new Element({ className: "evolution-chart__label" });

    const bars = new Element({ className: "evolution-chart__bars" });
    bars.setStyle(
      "height",
      `${(this.barWidth + this.gap) * this.data.length - this.gap}px`
    );

    for (const bar of this.data) {
      const newBar = new Bar({
        ...bar,
        width: this.barWidth,
        className: `evolution-chart__bar${
          bar?.className?.length ? ` ${bar.className}` : ""
        }`,
        labelWidth: this.labelWidth,
        chart: this,
        renderValue: this.renderValue,
      });

      bars.body.append(newBar.body);

      this.bars.push(newBar);
    }

    this.elements = {
      label,
      bars,
    };

    this.body.append(label.body);
    this.body.append(bars.body);
  };

  update = ({ currentEvolutionIndex }) => {
    this.elements.label.body.innerHTML = this.labels[currentEvolutionIndex];

    const sortedData = [...this.data].sort((a, b) =>
      ordernate(
        a.values[currentEvolutionIndex],
        b.values[currentEvolutionIndex],
        this.order
      )
    );

    this.bars.forEach((bar, index) => {
      const foundBar = sortedData.find(
        ({ label }) => label === this.data[index]?.label
      );

      bar.update({
        chart: this,
        newValue: this.data[index].values[currentEvolutionIndex],
        position: sortedData.indexOf(foundBar),
      });
    });
  };
}

export default Chart;
