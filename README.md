<h1 align="center">Evolution Graph</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/evolution-graph">
    <img src="https://badge.fury.io/js/evolution-graph.svg">
  </a>
</p>

<p align="center">
Animated, responsive, and highly customizable evolution graph built with HTML, Vanilla JavaScript, and CSS to create flexible data visualizations.
</p>

## Examples

### React

[Demo](https://nathanssantos.github.io/evolution-graph-react-demo) | [Repository](https://github.com/nathanssantos/evolution-graph-react-demo)

### Vanilla JavaScript

[Demo](https://nathanssantos.github.io/evolution-graph-demo) | [Repository](https://github.com/nathanssantos/evolution-graph-demo)

Thanks to [Abraham Hernandez](https://github.com/abranhe) for the [programming-languages-logos](https://github.com/abranhe/programming-languages-logos) repository wich was very useful on this project demo.

## React Usage

### Install

```shell
$ npm install evolution-graph
```

or

```shell
$ yarn add evolution-graph
```

### Code example

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
        barTransitionTopInterval={750}
        gap={10}
        barThickness={20}
        barLabelWidth={100}
        barDataGap={4}
        timelineTrackThickness={4}
        timelineTrackColor="#cecece"
        timelineTrackFillColor="#0984e3"
        timelineMarkerSize={14}
        timelineMarkerColor="#cecece"
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

## Vanilla JavaScript Usage

### Install

[Download the last version of the package](https://github.com/nathanssantos/evolution-graph/archive/refs/heads/main.zip)

### Code example

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
        className: "custom-evolution-graph",
        order: "desc",
        stepInterval: 1500,
        barTransitionTopInterval: 750,
        gap: 10,
        barThickness: 20,
        barLabelWidth: 100,
        barDataGap: 4,
        timelineTrackThickness: 4,
        timelineTrackColor: "#cecece",
        timelineTrackFillColor: "#0984e3",
        timelineMarkerSize: 14,
        timelineMarkerColor: "#cecece",
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

## Required Props

### **`data`**

**type:** _Array_

Array of objects, each one representing a bar on the graph. Must have the same length as `labels`.

### **`labels`**

**type:** _Array_

Array of strings, each one representing a label on the graph. Must have the same length as `data`.

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

Set the action buttons visibility.

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

Width in pixels applied on the timeline markers.

### **`timelineTrackThickness`**

**type:** _Number_

**default:** `4`

Width in pixels applied on the timeline track.

## Callback Props

### **`getController`**

**default:** `(controller:Controller) => controller`

Returns the graph controller instance. **React only**

### **`onChange`**

**default:** `(step:Number) => step`

Called when the current step changes.

### **`renderBarValue`**

**default:** `(value:Number) => value`

Bar value handling.

### **`renderGraphTitle`**

**default:** `(title:String) => title`

Graph title handling.

## API Methods

### **`goToNextStep`**

Go to next evolution step.

### **`goToPreviousStep`**

Go to next evolution step.

### **`pause`**

Pause the evolution if the graph is playing.

### **`play`**

Play step by step.

### **`render`**

**param:** `selector`

**param type:** _String_

Create and append a graph as selector's child.

### **`setCurrentStep`**

**param:** `step`

**param type:** _Number_

Set the current evolution step by index.

## To Do

- Add renderBarLabel callback prop
- Add showBarLabel prop
- Add showBarValue prop
- Add showBarImage prop
- Add onClickTimelineLabel prop
- Add onClickBar prop
- Types
- Improve documentation
