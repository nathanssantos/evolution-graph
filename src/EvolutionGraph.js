import Graph from "./components/Graph.js";

class EvolutionGraph {
  constructor(props) {
    const {
      target,
      className,
      data,
      labels,
      stepInterval,
      transitionTopInterval,
      gap,
      barThickness,
      barLabelWidth,
      timelineTrackThickness,
      timelineMarkerSize,
      timelineMarkerColor,
      timelineTrackColor,
      timelineTrackFillColor,
      order,
      renderValue,
      onChange,
    } = props;

    this.target = target || document.body;
    this.className = className || "";
    this.data = data || [];
    this.labels = labels || [];
    this.stepInterval = stepInterval || 1500;
    this.order = order || "desc";
    this.gap = gap || 10;
    this.transitionTopInterval = transitionTopInterval || this.stepInterval / 2;
    this.barThickness = barThickness || 20;
    this.barLabelWidth = barLabelWidth || 100;
    this.timelineTrackThickness = timelineTrackThickness || 4;
    this.timelineMarkerSize = timelineMarkerSize || 14;
    this.timelineMarkerColor = timelineMarkerColor || "rgb(206, 206, 206)";
    this.timelineTrackColor = timelineTrackColor || "rgb(206, 206, 206)";
    this.timelineTrackFillColor = timelineTrackFillColor || "rgb(9, 132, 227)";
    this.renderValue = renderValue;
    this.onChange = onChange;

    this.isPlaying = false;
    this.interval = null;
    this.currentStep = 0;

    this.graph = this.build();

    this.prepare();
  }

  get cantGoBack() {
    return this.currentStep <= 0;
  }

  get cantGoForward() {
    return this.currentStep >= this.data[0]?.values?.length - 1;
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

  setCurrentStep = (step, stopEvolution) => {
    if (stopEvolution) this.stop();

    if (step < 0 || step > this.labels.length - 1) return;

    if (this.onChange) this.onChange(step);

    this.currentStep = step;

    this.graph.update({ currentStep: this.currentStep });
  };

  previous = ({ stopEvolution } = {}) => {
    this.setCurrentStep(this.currentStep - 1, stopEvolution);
  };

  next = ({ stopEvolution } = {}) => {
    this.setCurrentStep(this.currentStep + 1, stopEvolution);
  };

  start = () => {
    if (this.cantGoForward) return;

    this.isPlaying = true;

    this.next();

    this.interval = setInterval(() => {
      this.next();
      if (this.cantGoForward) clearInterval(this.interval);
    }, this.stepInterval);
  };

  stop = () => {
    this.isPlaying = false;
    clearInterval(this.interval);
  };

  prepare = () => {
    this.graph.update({ currentStep: this.currentStep });
  };

  build = () => {
    try {
      const {
        data,
        labels,
        stepInterval,
        order,
        gap,
        barThickness,
        barLabelWidth,
        transitionTopInterval,
        timelineTrackThickness,
        timelineMarkerSize,
        timelineMarkerColor,
        timelineTrackColor,
        timelineTrackFillColor,
        renderValue,
        setCurrentStep,
      } = this;

      const graph = new Graph({
        data,
        labels,
        className: `evolution-graph${
          this.className?.length ? ` ${this.className}` : ""
        }`,
        stepInterval,
        higherValue: this.getHigherValue(),
        gap,
        order,
        barThickness,
        barLabelWidth,
        transitionTopInterval,
        timelineTrackThickness,
        timelineMarkerSize,
        timelineMarkerColor,
        timelineTrackColor,
        timelineTrackFillColor,
        renderValue,
        setCurrentStep,
      });

      return graph;
    } catch (error) {
      console.warn(error);
    }
  };

  create = () => this.graph.body;
}

export default EvolutionGraph;
