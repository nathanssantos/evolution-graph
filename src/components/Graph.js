import Element from "./Element.js";
import Bar from "./Bar.js";
import ordernate from "../utils/ordenate.js";
import Timeline from "./Timeline.js";

class Graph extends Element {
  constructor(props) {
    super(props);

    const {
      data,
      labels,
      barThickness,
      labelWidth,
      gap,
      higherValue,
      order,
      trackThickness,
      stepInterval,
      transitionTopInterval,
      timelineTrackThickness,
      timelineTrackColor,
      timelineMarkerSize,
      timelineMarkerColor,
      timelineTrackFillColor,
      renderValue,
      setCurrentStep,
    } = props;

    this.data = data;
    this.labels = labels;
    this.bars = [];
    this.barThickness = barThickness;
    this.labelWidth = labelWidth;
    this.gap = gap;
    this.higherValue = higherValue;
    this.order = order;
    this.trackThickness = trackThickness;
    this.stepInterval = stepInterval;
    this.transitionTopInterval = transitionTopInterval;
    this.timelineTrackThickness = timelineTrackThickness;
    this.timelineTrackColor = timelineTrackColor;
    this.timelineMarkerColor = timelineMarkerColor;
    this.timelineMarkerSize = timelineMarkerSize;
    this.timelineTrackFillColor = timelineTrackFillColor;
    this.renderValue = renderValue;
    this.setCurrentStep = setCurrentStep;

    this.prepare();
  }

  prepare = () => {
    const label = new Element({ className: "evolution-graph__label" });

    const barsContainer = new Element({
      className: "evolution-graph__bars-container",
    });
    barsContainer.setStyle(
      "height",
      `${(this.barThickness + this.gap) * this.data.length - this.gap}px`
    );

    const bars = this.data.map(
      (bar) =>
        new Bar({
          ...bar,
          thickness: this.barThickness,
          className: `evolution-graph__bar${
            bar?.className?.length ? ` ${bar.className}` : ""
          }`,
          labelWidth: this.labelWidth,
          graph: this,
          renderValue: this.renderValue,
        })
    );

    const timeline = new Timeline({
      className: "evolution-graph__timeline",
      graph: this,
      markerSize: this.timelineMarkerSize,
      markerColor: this.timelineMarkerColor,
      trackThickness: this.timelineTrackThickness,
      trackColor: this.timelineTrackColor,
      trackFillColor: this.timelineTrackFillColor,
      setCurrentStep: this.setCurrentStep,
    });

    this.elements = {
      label,
      barsContainer,
      timeline,
    };

    this.bars = bars;
    this.timeline = timeline;
    bars.forEach((bar) => barsContainer.body.append(bar.body));
    this.body.append(label.body);
    this.body.append(barsContainer.body);
    this.body.append(timeline.body);
  };

  update = ({ currentStep }) => {
    this.elements.label.body.innerHTML = this.labels[currentStep];

    const sortedData = [...this.data].sort((a, b) =>
      ordernate(
        a.values[currentStep],
        b.values[currentStep],
        this.order
      )
    );

    this.bars.forEach((bar, index) => {
      const foundBar = sortedData.find(
        ({ label }) => label === this.data[index]?.label
      );

      bar.update({
        graph: this,
        newValue: this.data[index].values[currentStep],
        position: sortedData.indexOf(foundBar),
      });
    });

    this.timeline.update({
      graph: this,
      currentStep,
    });
  };
}

export default Graph;
