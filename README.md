# evolution-graph

_Animated, responsive and fully customizable evolution graph built with Vanilla JavaScript._

## Install

```shell
$ npm install evolution-graph
```

or

```shell
$ yarn add evolution-graph
```

## Example

[Customized graph demo](https://nathanssantos.github.io/evolution-graph)

Thanks to [Abraham Hernandez](https://github.com/abranhe) for the [programming-languages-logos](https://github.com/abranhe/programming-languages-logos) repository assets used on this project demo.

## Usage

```js
import EvolutionGraph from "evolution-graph";
import "evolution-graph/src/css/styles.css";

const data = [
  {
    label: "Python",
    className: "python",
    color: "#387EB8",
    image:
      "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/python/python.svg",
    values: [0, 3, 4, 7, 8, 9, 9, 10, 12, 11, 13, 15],
  },
  {
    label: "Ruby",
    className: "ruby",
    color: "#E82609",
    image:
      "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/ruby/ruby.svg",
    values: [0, 2, 4, 5, 6, 8, 10, 13, 14, 17, 20, 21],
  },
  {
    label: "JavaScript",
    className: "javascript",
    color: "#F0DB4F",
    image:
      "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/javascript/javascript.svg",
    values: [0, 2, 3, 6, 7, 10, 14, 20, 20, 24, 28, 32],
  },
];

const labels = [
  "01/01/2021",
  "01/02/2021",
  "01/03/2021",
  "01/04/2021",
  "01/05/2021",
  "01/06/2021",
  "01/07/2021",
  "01/08/2021",
  "01/09/2021",
  "01/10/2021",
  "01/11/2021",
  "01/12/2021",
];

// data and labels must have the same length
const graph = new EvolutionGraph({
  data,
  labels,
  renderValue: (value: String) => `${value}k`,
  onChange: (step: Number) => console.log(step),
});

// pass a selector to graph.create function render the graph
graph.create("#evolution-graph-example");
```

## Props

| Prop                     | Type     | Default          | Description                                                                                 |
| :----------------------- | :------- | :--------------- | :------------------------------------------------------------------------------------------ |
| `data`                   | _Array_  | `[]`             | Array of objects, each one representing a bar on the graph. See **Usage** for an example.   |
| `labels`                 | _Array_  | `[]`             | Array of strings, each one representing a label on the graph. See **Usage** for an example. |
| `className`              | _String_ | `""`             | Custom css class applied on the graph container.                                            |
| `order`                  | _String_ | `"desc"`         | Graph bars ordenation. Can be `"desc"` or `"asc"`.                                          |
| `stepInterval`           | _Number_ | `1500`           | Step transition time in milliseconds.                                                       |
| `transitionTopInterval`  | _Number_ | `stepInterval/2` | Step transition time in milliseconds.                                                       |
| `gap`                    | _Number_ | `10`             | Gap in pixels applied between graph bars.                                                   |
| `barThickness`           | _Number_ | `20`             | Graph bar thickness in pixels.                                                              |
| `barLabelWidth`          | _Number_ | `100`            | Width in pixels applied on all bar labels.                                                  |
| `timelineTrackThickness` | _Number_ | `4`              | Width in pixels applied on the timeline track.                                              |
| `timelineTrackColor`     | _String_ | `#cecece`        | Background color applied on the timeline track.                                             |
| `timelineTrackFillColor` | _String_ | `#0984e3`        | Background color applied on the timeline track fill.                                        |
| `timelineMarkerSize`     | _Number_ | `14`             | Width in pixels applied on the timeline markers.                                            |
| `timelineMarkerColor`    | _String_ | `#cecece`        | Background color applied on the timeline markers.                                           |

## Callback props

| Prop          | Type       | Return               | Description                                                         |
| :------------ | :--------- | :------------------- | :------------------------------------------------------------------ |
| `renderValue` | _Function_ | `value:Number`       | Can be used for label handling. See **Usage** for an example.       |
| `onChange`    | _Function_ | `currentStep:Number` | Called when the current step changes. See **Usage** for an example. |

## Actions

| Prop                        | Type       | Payload            | Description                                                            |
| :-------------------------- | :--------- | :----------------- | :--------------------------------------------------------------------- |
| `create(selector)`          | _Function_ | `selector:String`  | Set the current evolution step by index. See **Usage** for an example. |
| `setCurrentStep(stepIndex)` | _Function_ | `stepIndex:Number` | Set the current evolution step by index.                               |
| `goToPreviousStep()`        | _Function_ | --                 | Go to previous evolution step.                                         |
| `goToNextStep()`            | _Function_ | --                 | Go to next evolution step.                                             |
| `play()`                    | _Function_ | --                 | Play step by step .                                                    |
| `pause()`                   | _Function_ | --                 | Pause the evolution if the graph is playing.                           |

## To Do

- Add action buttons
- Control z-index on change bar positions
- Add autoPlay prop
- Add showActionButtons prop
- Add renderGraphTitle callback prop
- Add renderBarLabel callback prop
- Add showBarLabel prop
- Add showBarValue prop
- Add showBarImage prop
- Add onClickBar prop
- Types
- Improve timeline behavior
- Improve react compatibility
- Add graphOrientation prop
- Improve documentation
