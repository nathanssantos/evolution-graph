import Graph from "./components/Graph.js";

class EvolutionGraph {
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
      timelineTrackWidth,
      timelineMarkerSize,
      timelineMarkerColor,
      timelineTrackColor,
      timelineTrackFillColor,
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
    this.timelineTrackWidth = timelineTrackWidth || 4;
    this.timelineMarkerSize = timelineMarkerSize || 14;
    this.timelineMarkerColor = timelineMarkerColor || "rgb(206, 206, 206)";
    this.timelineTrackColor = timelineTrackColor || "rgb(206, 206, 206)";
    this.timelineTrackFillColor = timelineTrackFillColor || "rgb(9, 132, 227)";
    this.renderValue = renderValue;
    this.order = order || "asc";

    this.currentEvolutionIndex = 0;
    this.interval = null;

    this.graph = this.createGraph();

    this.isPlaying = false;

    this.prepare();
  }

  get cantGoBack() {
    return this.currentEvolutionIndex <= 0;
  }

  get cantGoForward() {
    return this.currentEvolutionIndex >= this.data[0]?.values?.length - 1;
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

  createGraph = () => {
    try {
      const {
        data,
        labels,
        barWidth,
        labelWidth,
        gap,
        order,
        evolutionInterval,
        transitionTopInterval,
        timelineTrackWidth,
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
        label: this.labels[this.currentEvolutionIndex],
        barWidth,
        labelWidth,
        gap,
        higherValue: this.getHigherValue(),
        order,
        evolutionInterval,
        transitionTopInterval,
        timelineTrackWidth,
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

  prepare = () => {
    this.graph.update({ currentEvolutionIndex: this.currentEvolutionIndex });
    this.target.append(this.graph.body);
  };

  updateGraph = (direction) => {
    this.currentEvolutionIndex =
      this.currentEvolutionIndex + (direction === "previous" ? -1 : 1);

    this.graph.update({ currentEvolutionIndex: this.currentEvolutionIndex });
  };

  goToPreviousStep = () => {
    this.stop();
    if (this.cantGoBack) return;
    this.updateGraph("previous");
  };

  goToNextStep = () => {
    this.stop();
    if (this.cantGoForward) return;
    this.updateGraph();
  };

  setCurrentStep = (step) => {
    this.stop();
    this.currentEvolutionIndex = step;
    this.graph.update({ currentEvolutionIndex: this.currentEvolutionIndex });
  };

  start = () => {
    if (this.cantGoForward) return;

    this.isPlaying = true;
    this.updateGraph();

    this.interval = setInterval(() => {
      this.updateGraph();
      if (this.cantGoForward) clearInterval(this.interval);
    }, this.evolutionInterval);
  };

  stop = () => {
    this.isPlaying = false;
    clearInterval(this.interval);
  };
}

export default EvolutionGraph;
