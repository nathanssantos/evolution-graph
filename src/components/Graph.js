import Element from "./Element.js";
import Bar from "./Bar.js";
import Timeline from "./Timeline.js";
import ordernate from "../utils/ordenate.js";

const previousIcon =
  '<svg fill="black" viewBox="0 0 24 24" width="24" height="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>';
const playIcon =
  '<svg fill="black" viewBox="0 0 24 24"  width="24" height="24"><path d="M8 5v14l11-7z"></path></svg>';
const pauseIcon =
  '<svg fill="black" viewBox="0 0 24 24"  width="24" height="24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
const nextIcon =
  '<svg fill="black" viewBox="0 0 24 24"  width="24" height="24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>';

class Graph extends Element {
  constructor(props) {
    super(props);

    const {
      data,
      labels,
      order,
      stepInterval,
      barTransitionTopInterval,
      gap,
      barThickness,
      barLabelWidth,
      barDataGap,
      timelineTrackThickness,
      timelineTrackColor,
      timelineTrackFillColor,
      timelineMarkerSize,
      timelineMarkerColor,
      showActionButtons,
      renderBarValue,
      renderTitle,
      isPlaying,
      setCurrentStep,
      goToPreviousStep,
      goToNextStep,
      play,
      pause,
      higherValue,
    } = props;

    this.data = data;
    this.labels = labels;
    this.order = order;
    this.stepInterval = stepInterval;
    this.barTransitionTopInterval = barTransitionTopInterval;
    this.gap = gap;
    this.barThickness = barThickness;
    this.barLabelWidth = barLabelWidth;
    this.barDataGap = barDataGap;
    this.timelineTrackThickness = timelineTrackThickness;
    this.timelineTrackColor = timelineTrackColor;
    this.timelineTrackFillColor = timelineTrackFillColor;
    this.timelineMarkerColor = timelineMarkerColor;
    this.timelineMarkerSize = timelineMarkerSize;
    this.showActionButtons = showActionButtons;
    this.renderBarValue = renderBarValue;
    this.renderTitle = renderTitle;
    this.isPlaying = isPlaying;
    this.setCurrentStep = setCurrentStep;
    this.goToPreviousStep = goToPreviousStep;
    this.goToNextStep = goToNextStep;
    this.play = play;
    this.pause = pause;
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
          renderValue: this.renderBarValue,
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

    const actions = new Element({
      className: "evolution-graph__actions",
    });

    const btPrevious = new Element({
      className: "evolution-graph__actions__bt bt-previous",
      type: "button",
    });
    btPrevious.body.innerHTML = previousIcon;
    btPrevious.body.addEventListener("click", () =>
      this.goToPreviousStep({ stopEvolution: true })
    );

    const btPlayPause = new Element({
      className: "evolution-graph__actions__bt bt-play-pause",
      type: "button",
    });
    btPlayPause.body.innerHTML = playIcon;
    btPlayPause.body.addEventListener("click", () => {
      this.isPlaying ? this.pause() : this.play();
    });

    const btNext = new Element({
      className: "evolution-graph__actions__bt bt-next",
      type: "button",
    });
    btNext.body.innerHTML = nextIcon;
    btNext.body.addEventListener("click", () =>
      this.goToNextStep({ stopEvolution: true })
    );

    this.elements = {
      title,
      barsContainer,
      bars,
      timeline,
      actions,
      btPrevious,
      btPlayPause,
      btNext,
    };

    bars.forEach((bar) => barsContainer.body.append(bar.body));
    actions.body.append(btPrevious.body);
    actions.body.append(btPlayPause.body);
    actions.body.append(btNext.body);
    this.body.append(title.body);
    this.body.append(barsContainer.body);
    this.body.append(timeline.body);
    if (this.showActionButtons) this.body.append(actions.body);
  };

  update = ({ currentStep, isPlaying }) => {
    this.elements.title.body.innerHTML = this.renderTitle
      ? this.renderTitle(this.labels[currentStep])
      : this.labels[currentStep];

    this.isPlaying = isPlaying;

    const sortedData = [...this.data].sort((a, b) =>
      ordernate(a.values[currentStep], b.values[currentStep], this.order)
    );

    let higherBarDataWidth = 0;

    this.elements.bars.forEach((bar, index) => {
      const foundBar = sortedData.find(
        ({ label }) => label === this.data[index]?.label
      );

      bar.update({
        graph: this,
        newValue: this.data[index].values[currentStep],
        position: sortedData.indexOf(foundBar),
      });
    });

    this.elements.bars.forEach((bar) => {
      const barDataWidth = window
        .getComputedStyle(bar.elements.data.body)
        .width.replace("px", "");

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

    this.elements.btPlayPause.body.innerHTML = isPlaying ? pauseIcon : playIcon;
  };
}

export default Graph;
