# evolution-graph

_Animated, responsive, and highly customizable evolution graph built with Vanilla JavaScript to create flexible data visualizations._

## Install

```shell
$ npm install evolution-graph
```

or

```shell
$ yarn add evolution-graph
```

## Examples

### Vanilla JavaScript

[Demo](https://nathanssantos.github.io/evolution-graph-demo) | [Repository](https://github.com/nathanssantos/evolution-graph-demo)

### React

[Demo](https://nathanssantos.github.io/evolution-graph-react-demo) | [Repository](https://github.com/nathanssantos/evolution-graph-react-demo)

Thanks to [Abraham Hernandez](https://github.com/abranhe) for the [programming-languages-logos](https://github.com/abranhe/programming-languages-logos) repository wich was very useful on this project demo.

## Usage

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./vendor/evolution-graph/src/css/styles.css" />
    <title>Evolution Graph</title>
  </head>
  <body>
    <div id="evolution-graph-example"></div>
    <script type="module">
      import EvolutionGraph from "./vendor/evolution-graph/Controller.js";

      const data = [
        {
          label: "Python",
          className: "python",
          color: "#387EB8",
          image:
            "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/python/python.svg",
          values: [0, 3, 4, 7, 8, 9, 9, 10, 11, 12, 13, 15],
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
        className: "custom-evolution-graph",
        order: "desc",
        stepInterval: 1500,
        transitionTopInterval: 750,
        gap: 10,
        barThickness: 20,
        barLabelWidth: 100,
        barDataGap: 4,
        timelineTrackThickness: 4,
        timelineTrackColor: "rgb(206, 206, 206)",
        timelineTrackFillColor: "rgb(9, 132, 227)",
        timelineMarkerSize: 14,
        timelineMarkerColor: "rgb(206, 206, 206)",
        showActionButtons: true,
        autoPlay: false,
        renderGraphTitle: (title) => `Date - ${title}`,
        renderBarValue: (value) => `${value}k`,
        onChange: (step) => {
          console.log(step);
        },
      });

      // graph.setCurrentStep(3)
      // graph.goToPreviousStep()
      // graph.goToNextStep()
      // graph.play()
      // graph.pause()

      // draw the graph by passing the selector of a html element to the method render()
      graph.render("#evolution-graph-example");
    </script>
  </body>
</html>
```

### React

```jsx
import React from "react";
import EvolutionGraph from "evolution-graph";
import "evolution-graph/src/css/styles.css";

const data = [
  {
    label: "Python",
    className: "python",
    color: "#387EB8",
    image:
      "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/python/python.svg",
    values: [0, 3, 4, 7, 8, 9, 9, 10, 11, 12, 13, 15],
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

const App = () => {
  let graph = null;

  // graph.setCurrentStep(3)
  // graph.goToPreviousStep()
  // graph.goToNextStep()
  // graph.play()
  // graph.pause()

  return (
    <div className="app">
      <EvolutionGraph
        data={data}
        labels={labels}
        className="custom-evolution-graph"
        order="desc"
        stepInterval={1500}
        transitionTopInterval={750}
        gap={10}
        barThickness={20}
        barLabelWidth={100}
        barDataGap={4}
        timelineTrackThickness={4}
        timelineTrackColor="rgb(206, 206, 206)"
        timelineTrackFillColor="rgb(9, 132, 227)"
        timelineMarkerSize={14}
        timelineMarkerColor="rgb(206, 206, 206)"
        showActionButtons
        autoPlay={false}
        renderGraphTitle={(title) => `Date - ${title}`}
        renderBarValue={(value) => `${value}k`}
        onChange={(step) => {
          console.log(step);
        }}
        getController={(controllerInstance) => (graph = controllerInstance)}
      />
    </div>
  );
};

export default App;
```

## Options

| Prop                     | Type      | Default          | Description                                                   |
| :----------------------- | :-------- | :--------------- | :------------------------------------------------------------ |
| `data`                   | _Array_   | `[]`             | Array of objects, each one representing a bar on the graph.   |
| `labels`                 | _Array_   | `[]`             | Array of strings, each one representing a label on the graph. |
| `className`              | _String_  | `""`             | Custom css class applied on the graph container.              |
| `order`                  | _String_  | `"desc"`         | Graph bars ordenation. Can be `"desc"` or `"asc"`.            |
| `stepInterval`           | _Number_  | `1500`           | Step transition time in milliseconds.                         |
| `transitionTopInterval`  | _Number_  | `stepInterval/2` | Step transition time in milliseconds.                         |
| `gap`                    | _Number_  | `10`             | Gap in pixels applied between graph bars.                     |
| `barThickness`           | _Number_  | `20`             | Graph bar thickness in pixels.                                |
| `barLabelWidth`          | _Number_  | `100`            | Width in pixels applied on all bar labels.                    |
| `barDataGap`             | _Number_  | `4`              | Gap in pixels applied between bar and bar data.               |
| `timelineTrackThickness` | _Number_  | `4`              | Width in pixels applied on the timeline track.                |
| `timelineTrackColor`     | _String_  | `#cecece`        | Background color applied on the timeline track.               |
| `timelineTrackFillColor` | _String_  | `#0984e3`        | Background color applied on the timeline track fill.          |
| `timelineMarkerSize`     | _Number_  | `14`             | Width in pixels applied on the timeline markers.              |
| `timelineMarkerColor`    | _String_  | `#cecece`        | Background color applied on the timeline markers.             |
| `showActionButtons`      | _Boolean_ | `true`           | Set the action buttons visibility.                            |
| `autoPlay`               | _Boolean_ | `false`          | Play on mount.                                                |

## Callback Functions

| Prop                                                   | Description                                           |
| :----------------------------------------------------- | :---------------------------------------------------- |
| `renderGraphTitle: (title:String) => title`            | Graph title handling.                                 |
| `renderBarValue: (value:Number) => value`              | Bar value handling.                                   |
| `onChange: (step:Number) => step`                      | Called when the current step changes.                 |
| `getController: (controller:Controller) => controller` | Returns the graph controller instance. **React only** |

## API Methods

| Prop                          | Description                                    |
| :---------------------------- | :--------------------------------------------- |
| `render(selector:String)`     | Create and append a graph as selector's child. |
| `setCurrentStep(step:Number)` | Set the current evolution step by index.       |
| `goToPreviousStep()`          | Go to previous evolution step.                 |
| `goToNextStep()`              | Go to next evolution step.                     |
| `play()`                      | Play step by step.                            |
| `pause()`                     | Pause the evolution if the graph is playing.   |

## To Do

- Add renderBarLabel callback prop
- Add showBarLabel prop
- Add showBarValue prop
- Add showBarImage prop
- Add onClickBar prop
- Types
- Improve documentation
