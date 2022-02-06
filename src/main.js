import Chart from "./models/Chart.js";

class EvolutionChart {
  constructor(props) {
    const {
      target,
      className,
      data,
      labels,
      evolutionInterval,
      transitionTopInterval,
      barWidth,
      gap,
      labelWidth,
      renderValue,
      order,
    } = props;

    this.target = target || document.body;
    this.className = className || "";
    this.data = data || [];
    this.labels = labels || [];
    this.evolutionInterval = evolutionInterval || 2000;
    this.transitionTopInterval =
      transitionTopInterval || this.evolutionInterval / 2;
    this.barWidth = barWidth || 20;
    this.gap = gap || 20;
    this.labelWidth = labelWidth || 100;
    this.renderValue = renderValue;
    this.order = order || "asc";

    this.currentEvolutionIndex = 0;
    this.interval = null;

    this.chart = this.createChart();

    this.isPlaying = false;

    this.prepare();
  }

  getHigherValue = () => {
    let higherValue = 0;

    for (const { values } of this.data) {
      for (const value of values) {
        if (value > higherValue) higherValue = value;
      }
    }

    return higherValue;
  };

  createChart = () => {
    const {
      data,
      labels,
      barWidth,
      labelWidth,
      gap,
      order,
      evolutionInterval,
      transitionTopInterval,
      renderValue,
    } = this;

    const className = `evolution-chart${
      this.className?.length ? ` ${this.className}` : ""
    }`;

    const label = this.labels[this.currentEvolutionIndex];

    const higherValue = this.getHigherValue();

    const chart = new Chart({
      data,
      labels,
      className,
      label,
      barWidth,
      labelWidth,
      gap,
      higherValue,
      order,
      evolutionInterval,
      transitionTopInterval,
      renderValue,
    });

    return chart;
  };

  prepare = () => {
    this.target.prepend(this.chart.body);
    this.chart.update({ currentEvolutionIndex: this.currentEvolutionIndex });
  };

  updateChart = (direction) => {
    this.currentEvolutionIndex =
      this.currentEvolutionIndex + (direction === "previous" ? -1 : 1);

    this.chart.update({ currentEvolutionIndex: this.currentEvolutionIndex });
  };

  goToPreviousStep = () => {
    if (this.currentEvolutionIndex <= 0) return;
    this.updateChart("previous");
  };

  goToNextStep = () => {
    if (this.currentEvolutionIndex >= this.data[0]?.values?.length - 1) return;
    this.updateChart();
  };

  start = () => {
    this.isPlaying = true;
    this.goToNextStep();

    this.interval = setInterval(() => {
      this.goToNextStep();

      if (this.currentEvolutionIndex >= this.data[0]?.values?.length - 1) {
        clearInterval(this.interval);
      }
    }, this.evolutionInterval);
  };

  stop = () => {
    this.isPlaying = false;
    clearInterval(this.interval);
  };
}

export default EvolutionChart;
