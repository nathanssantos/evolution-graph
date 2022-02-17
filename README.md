<h1 align="center">Evolution Graph</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/evolution-graph">
    <img src="https://badge.fury.io/js/evolution-graph.svg">
  </a>
</p>

<p align="center">
Animated, responsive, highly customizable, and dependency-free evolution graph built with HTML, Vanilla JavaScript, and CSS which can be used to create flexible data visualizations and to present evolution relationships between entities.
</p>

## Examples of Usage

### React

[Demo](https://nathanssantos.github.io/evolution-graph-react-demo) | [Repository](https://github.com/nathanssantos/evolution-graph-react-demo)

### Vanilla JavaScript

[Demo](https://nathanssantos.github.io/evolution-graph-demo) | [Repository](https://github.com/nathanssantos/evolution-graph-demo)

Thanks to [Abraham Hernandez](https://github.com/abranhe) for the [programming-languages-logos](https://github.com/abranhe/programming-languages-logos) project wich was very useful on this demonstrations.

## React Usage

### Install

```shell
$ npm install evolution-graph
```

or

```shell
$ yarn add evolution-graph
```

### Code Example

```jsx
import React from "react";
import EvolutionGraph from "evolution-graph";
import "evolution-graph/src/css/styles.css";

const data = [
  {
    label: "Python",
    className: "python",
    color: "#387EB8",
    image: "./assets/images/python.svg",
    values: [0, 3, 4, 7, 8, 9, 9, 10, 11, 12, 13, 15],
  },
  {
    label: "Ruby",
    className: "ruby",
    color: "#E82609",
    image: "./assets/images/ruby.svg",
    values: [0, 2, 4, 5, 6, 8, 10, 13, 14, 17, 20, 21],
  },
  {
    label: "JavaScript",
    className: "javascript",
    color: "#F0DB4F",
    image: "./assets/images/javascript.svg",
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

  // graph.goToNextStep()
  // graph.goToPreviousStep()
  // graph.pause()
  // graph.play()
  // graph.setCurrentStep(3)

  return (
    <div className="app">
      <EvolutionGraph
        data={data}
        labels={labels}
        autoPlay={false}
        barDataGap={4}
        barLabelWidth={100}
        barThickness={20}
        barTransitionTopInterval={750}
        className="custom-evolution-graph"
        gap={10}
        order="desc"
        stepInterval={1500}
        showActionButtons
        timelineTrackColor="#cecece"
        timelineTrackFillColor="#0984e3"
        timelineMarkerColor="#cecece"
        timelineMarkerSize={14}
        timelineTrackThickness={4}
        getController={(controllerInstance) => {
          graph = controllerInstance;
        }}
        onChange={(currentStep) => {
          console.log(currentStep);
        }}
        renderBarValue={(value) => `${value}k`}
        renderGraphTitle={(title) => `Date - ${title}`}
      />
    </div>
  );
};

export default App;
```

## Vanilla JavaScript Usage

### Install

[Download the package latest version](https://github.com/nathanssantos/evolution-graph/archive/refs/heads/main.zip)

### Code Example

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
          image: "./assets/images/python.svg",
          values: [0, 3, 4, 7, 8, 9, 9, 10, 11, 12, 13, 15],
        },
        {
          label: "Ruby",
          className: "ruby",
          color: "#E82609",
          image: "./assets/images/ruby.svg",
          values: [0, 2, 4, 5, 6, 8, 10, 13, 14, 17, 20, 21],
        },
        {
          label: "JavaScript",
          className: "javascript",
          color: "#F0DB4F",
          image: "./assets/images/javascript.svg",
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

      const graph = new EvolutionGraph({
        data,
        labels,
        autoPlay: false,
        barDataGap: 4,
        barLabelWidth: 100,
        barThickness: 20,
        barTransitionTopInterval: 750,
        className: "custom-evolution-graph",
        gap: 10,
        order: "desc",
        showActionButtons: true,
        stepInterval: 1500,
        timelineTrackColor: "#cecece",
        timelineTrackFillColor: "#0984e3",
        timelineMarkerColor: "#cecece",
        timelineMarkerSize: 14,
        timelineTrackThickness: 4,
        onChange: (currentStep) => {
          console.log(currentStep);
        },
        renderBarValue: (value) => `${value}k`,
        renderGraphTitle: (title) => `Date - ${title}`,
      });

      // graph.goToNextStep()
      // graph.goToPreviousStep()
      // graph.pause()
      // graph.play()
      // graph.setCurrentStep(3)

      graph.render("#evolution-graph-example");
    </script>
  </body>
</html>
```

## Required Props

### **`data`**

**type:** _Array_

Array of objects, each one representing a bar on the graph. Must have the same length as `labels`.

### **`labels`**

**type:** _Array_

Array of strings, each one representing a label on the graph timeline. Must have the same length as `data`.

## Optional Props

### **`autoPlay`**

**type:** _Boolean_

**default:** `false`

Play the graph on component mount.

### **`barDataGap`**

**type:** _Number_

**default:** `4`

Gap in pixels applied between bar and bar data.

### **`barLabelWidth`**

**type:** _Number_

**default:** `100`

Width in pixels applied on all bar labels.

### **`barThickness`**

**type:** _Number_

**default:** `20`

Bar thickness in pixels.

### **`barTransitionTopInterval`**

**type:** _Number_

**default:** `stepInterval / 2`

Bar transition top time in milliseconds.

### **`className`**

**type:** _String_

**default:** `""`

Custom css class applied on the graph container.

### **`gap`**

**type:** _Number_

**default:** `"desc"`

Gap in pixels applied between graph bars.

### **`order`**

**type:** _String_

**default:** `"desc"`

Graph bars ordenation. Can be either "desc" or "asc".

### **`showActionButtons`**

**type:** _Boolean_

**default:** `true`

The action buttons visibility.

### **`stepInterval`**

**type:** _Number_

**default:** `1500`

Step transition time in milliseconds.

### **`timelineTrackColor`**

**type:** _String_

**default:** `"#cecece"`

Background color applied on the timeline track.

### **`timelineTrackFillColor`**

**type:** _String_

**default:** `"#0984e3"`

Background color applied on the timeline track fill.

### **`timelineMarkerColor`**

**type:** _String_

**default:** `"#cecece"`

Background color applied on the timeline markers.

### **`timelineMarkerSize`**

**type:** _Number_

**default:** `14`

Width and height in pixels applied on the timeline markers.

### **`timelineTrackThickness`**

**type:** _Number_

**default:** `4`

Height in pixels applied on the timeline track.

## Callback Props

### **`getController`**

**default:** `(controller:Controller) => controller`

Return the graph controller instance. **React prop only**.

### **`onChange`**

**default:** `(currentStep:Number) => currentStep`

Return the current step when the graph changes.

### **`renderBarValue`**

**default:** `(value:Number) => value`

Return the current bar value for handling.

### **`renderGraphTitle`**

**default:** `(title:String) => title`

Return the current graph title for handling.

## API Methods

### **`goToNextStep`**

Go to next step.

### **`goToPreviousStep`**

Go to previous step.

### **`pause`**

Pause the graph if it is playing.

### **`play`**

Play step by step.

### **`render`**

**argument:** `selector`

**argument type:** _String_

Create and append a graph as child of the element found with the selector passed as argument.

### **`setCurrentStep`**

**argument:** `step`

**argument type:** _Number_

Set the current step by the index passed as argument.

## To Do

- renderBarLabel callback prop
- showBarLabel prop
- showBarValue prop
- showBarImage prop
- onClickTimelineLabel prop
- onClickBar prop
- Global types declaration
