import Graph from "./components/Graph.js";

class Controller {
  constructor(props) {
    const {
      data,
      labels,
      className,
      order,
      stepInterval,
      transitionTopInterval,
      gap,
      barThickness,
      barLabelWidth,
      barDataGap,
      timelineTrackThickness,
      timelineTrackColor,
      timelineTrackFillColor,
      timelineMarkerSize,
      timelineMarkerColor,
      renderValue,
      onChange,
    } = props;

    this.data = data || [];
    this.labels = labels || [];
    this.className = className || "";
    this.order = order || "desc";
    this.stepInterval = stepInterval || 1500;
    this.transitionTopInterval = transitionTopInterval || this.stepInterval / 2;
    this.gap = gap || 10;
    this.barThickness = barThickness || 20;
    this.barLabelWidth = barLabelWidth || 100;
    this.barDataGap = barDataGap || 4;
    this.timelineTrackThickness = timelineTrackThickness || 4;
    this.timelineTrackColor = timelineTrackColor || "rgb(206, 206, 206)";
    this.timelineTrackFillColor = timelineTrackFillColor || "rgb(9, 132, 227)";
    this.timelineMarkerSize = timelineMarkerSize || 14;
    this.timelineMarkerColor = timelineMarkerColor || "rgb(206, 206, 206)";
    this.renderValue = renderValue;
    this.onChange = onChange;

    this.mounted = false;
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
    if (stopEvolution) this.pause();

    if (step < 0 || step > this.labels.length - 1) return;

    if (this.onChange) this.onChange(step);

    this.currentStep = step;

    this.graph.update({ currentStep: this.currentStep });
  };

  goToPreviousStep = ({ stopEvolution } = {}) => {
    this.setCurrentStep(this.currentStep - 1, stopEvolution);
  };

  goToNextStep = ({ stopEvolution } = {}) => {
    this.setCurrentStep(this.currentStep + 1, stopEvolution);
  };

  play = () => {
    if (this.cantGoForward || this.interval) return;

    this.isPlaying = true;

    this.goToNextStep();

    this.interval = setInterval(() => {
      this.goToNextStep();
      if (this.cantGoForward) clearInterval(this.interval);
    }, this.stepInterval);
  };

  pause = () => {
    this.isPlaying = false;
    clearInterval(this.interval);
    this.interval = null;
  };

  prepare = () => {
    this.graph.update({ currentStep: this.currentStep });
  };

  build = () => {
    try {
      const {
        data,
        labels,
        order,
        stepInterval,
        transitionTopInterval,
        gap,
        barThickness,
        barLabelWidth,
        barDataGap,
        timelineTrackThickness,
        timelineTrackColor,
        timelineTrackFillColor,
        timelineMarkerSize,
        timelineMarkerColor,
        renderValue,
        setCurrentStep,
      } = this;

      const graph = new Graph({
        data,
        labels,
        className: `evolution-graph${
          this.className?.length ? ` ${this.className}` : ""
        }`,
        order,
        stepInterval,
        transitionTopInterval,
        gap,
        barThickness,
        barLabelWidth,
        barDataGap,
        timelineTrackThickness,
        timelineTrackColor,
        timelineTrackFillColor,
        timelineMarkerSize,
        timelineMarkerColor,
        renderValue,
        higherValue: this.getHigherValue(),
        setCurrentStep,
      });

      return graph;
    } catch (error) {
      console.warn(error);
    }
  };

  create = (selector) => {
    if (!this.mounted) {
      document.querySelector(selector).append(this.graph.body);
      this.mounted = true;
    }
  };
}

export default Controller;
