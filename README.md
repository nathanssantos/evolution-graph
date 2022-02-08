# `Evolution Graph`

_Vanilla JavaScript fully customizable, responsive and animated evolution graph._

# Install

```shell
$ npm install evolution-graph
```

or

```shell
$ npm install evolution-graph
```

# Example

![](src/docs/evolution-graph.gif)

### [Customized graph demo](https://nathanssantos.github.io/evolution-graph)

# Usage

```js
import EvolutionGraph from "evolution-graph";
// or
const EvolutionGraph = require("evolution-graph");

const data = [
  {
    label: "JavaScript",
    className: "javascript",
    color: "#F0DB4F",
    image:
      "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/javascript/javascript.svg",
    values: [0, 7, 10, 10, 10, 12, 14, 20, 20, 24, 28, 32],
  },
  {
    label: "Python",
    className: "python",
    color: "#387EB8",
    image:
      "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/python/python.svg",
    values: [0, 1, 1, 2, 3, 3, 4, 7, 8, 11, 13, 15],
  },
  {
    label: "Ruby",
    className: "ruby",
    color: "#E82609",
    image:
      "https://raw.githubusercontent.com/abranhe/programming-languages-logos/30a0ecf99188be99a3c75a00efb5be61eca9c382/src/ruby/ruby.svg",
    values: [0, 2, 4, 5, 6, 8, 10, 11, 14, 17, 20, 21],
  },
];

const labels = ["01/01/2021", "01/02/2021", "01/03/2021"];

const graph = new EvolutionGraph({
  target: document.getElementById("evolution-graph-example"),
  data,
  labels,
});

// data and labels must have the same length
```

Thanks to [Abraham Hernandez](https://github.com/abranhe) for the [programming-languages-logos](https://github.com/abranhe/programming-languages-logos) repository assets used on the demo.

# Props

| Prop                         | Type             | Default                   | Description                                                                                      |
| :--------------------------- | :--------------- | :------------------------ | :----------------------------------------------------------------------------------------------- |
| **`target`**                 | _`HTML element`_ | `document.body`           | HTML element where the graph will be rendered.                                                   |
| **`className`**              | _`String`_       | `""`                      | Custom css class applied on the graph container.                                                 |
| **`data`**                   | _`Array`_        | `[]`                      | Array of objects, each one representing a bar on the graph. See **Usage** for the object format. |
| **`labels`**                 | _`Array`_        | `[]`                      | Array of strings, each one representing a label on the graph. See **Usage** for an example.      |
| **`stepInterval`**           | _`Number`_       | `1500` milliseconds       | Step transition time in and interval between steps when de the graph is playing.                 |
| **`order`**                  | _`String`_       | `desc`                    | Graph bars ordenation. Can be `desc` or `asc`. `asc`.                                            |
| **`gap`**                    | _`Number`_       | `10` pixels               | Gap between graph bars.                                                                          |
| **`transitionTopInterval`**  | _`Number`_       | stepInterval / 2          | Step transition time in and interval between steps when de the graph is playing.                 |
| **`barThickness`**           | _`Number`_       | `20` pixels               | Graph bar thickness.                                                                             |
| **`barLabelWidth`**          | _`Number`_       | `100` pixels              | Width applied on all bar labels.                                                                 |
| **`timelineTrackThickness`** | _`Number`_       | `4` pixels                | Width applied on the timeline track.                                                             |
| **`timelineMarkerSize`**     | _`Number`_       | `14` pixels               | Width applied on the timeline markers.                                                           |
| **`timelineMarkerColor`**    | _`String`_       | `rgb(206, 206, 206)`      | Background color applied on the timeline markers.                                                |
| **`timelineTrackColor`**     | _`String`_       | `rgb(206, 206, 206)`      | Background color applied on the timeline track.                                                  |
| **`timelineTrackFillColor`** | _`String`_       | `rgb(9, 132, 227)`        | Background color applied on the timeline track fill.                                             |
| **`renderValue`**            | _`Function`_     | `(label:String) => label` | Callback function for label handling.                                                            |
| **`onChange`**               | _`Function`_     | `(step:Number) => step`   | Function called when the current step changes.                                                   |

## To Do

- Add action buttons
- Add showActionButtons prop
- Add renderGraphTitle prop
- Add renderBarLabel prop
- Add showBarLabel prop
- Add showBarValue prop
- Add showBarImage prop
- Add onClickBar prop
- Control z-index on bar position transition
- Improve timeline behavior
- Add graphOrientation prop
- Improve documentation
