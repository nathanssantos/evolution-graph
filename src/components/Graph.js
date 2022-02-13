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
      higherValue,
    } = props;

    this.data = data;
    this.labels = labels;
    this.order = order;
    this.stepInterval = stepInterval;
    this.transitionTopInterval = transitionTopInterval;
    this.gap = gap;
    this.barThickness = barThickness;
    this.barLabelWidth = barLabelWidth;
    this.barDataGap = barDataGap;
    this.timelineTrackThickness = timelineTrackThickness;
    this.timelineTrackColor = timelineTrackColor;
    this.timelineTrackFillColor = timelineTrackFillColor;
    this.timelineMarkerColor = timelineMarkerColor;
    this.timelineMarkerSize = timelineMarkerSize;
    this.renderValue = renderValue;
    this.setCurrentStep = setCurrentStep;
    this.higherValue = higherValue;

    this.prepare();
  }

  prepare = () => {
    const title = new Element({ className: "evolution-graph__title" });

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
          labelWidth: this.barLabelWidth,
          dataGap: this.barDataGap,
          graph: this,
          renderValue: this.renderValue,
        })
    );

    const timeline = new Timeline({
      graph: this,
      className: "evolution-graph__timeline",
      trackThickness: this.timelineTrackThickness,
      trackColor: this.timelineTrackColor,
      trackFillColor: this.timelineTrackFillColor,
      markerSize: this.timelineMarkerSize,
      markerColor: this.timelineMarkerColor,
      setCurrentStep: this.setCurrentStep,
    });

    this.elements = {
      title,
      barsContainer,
      bars,
      timeline,
    };

    bars.forEach((bar) => barsContainer.body.append(bar.body));
    this.body.append(title.body);
    this.body.append(barsContainer.body);
    this.body.append(timeline.body);
  };

  update = ({ currentStep }) => {
    this.elements.title.body.innerHTML = this.labels[currentStep];

    const sortedData = [...this.data].sort((a, b) =>
      ordernate(a.values[currentStep], b.values[currentStep], this.order)
    );

    let higherBarDataWidth = 0;

    this.elements.bars.forEach((bar, index) => {
      const barDataWidth = window
        .getComputedStyle(bar.elements.data.body)
        .width.replace("px", "");

      const foundBar = sortedData.find(
        ({ label }) => label === this.data[index]?.label
      );

      bar.update({
        graph: this,
        newValue: this.data[index].values[currentStep],
        position: sortedData.indexOf(foundBar),
      });

      if (barDataWidth > higherBarDataWidth) {
        higherBarDataWidth = barDataWidth;
      }
    });

    this.elements.barsContainer.setStyle(
      "transition",
      `all ${this.stepInterval}ms linear`
    );

    this.elements.barsContainer.setStyle(
      "margin-right",
      `${Math.ceil(higherBarDataWidth) + this.barDataGap}px`
    );

    this.elements.timeline.update({
      graph: this,
      currentStep,
    });
  };
}

export default Graph;
