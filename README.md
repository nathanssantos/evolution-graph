# evolution-graph

_Vanilla JavaScript fully customizable, responsive and animated evolution graph._

# Install

```shell
$ npm install evolution-graph
```

or

```shell
$ yarn add evolution-graph
```

# Example

[Customized graph demo](https://nathanssantos.github.io/evolution-graph)

# Usage

```js
import EvolutionGraph from "evolution-graph";
import "evolution-graph/src/css/styles.css";

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

| Prop                         | Type       | Default            | Description                                                                                 |
| :--------------------------- | :--------- | :----------------- | :------------------------------------------------------------------------------------------ |
| **`data`**                   | _Array_    | `[]`               | Array of objects, each one representing a bar on the graph. See **Usage** for an example.   |
| **`labels`**                 | _Array_    | `[]`               | Array of strings, each one representing a label on the graph. See **Usage** for an example. |
| **`className`**              | _String_   | `""`               | Custom css class applied on the graph container.                                            |
| **`stepInterval`**           | _Number_   | `1500`             | Step transition time in milliseconds.                                                       |
| **`order`**                  | _String_   | `"desc"`           | Graph bars ordenation. Can be `"desc"` or `"asc"`. `asc`.                                   |
| **`gap`**                    | _Number_   | `10`               | Gap between graph bars.                                                                     |
| **`transitionTopInterval`**  | _Number_   | `stepInterval / 2` | Step transition time in and interval between steps when de the graph is playing.            |
| **`barThickness`**           | _Number_   | `20`               | Graph bar thickness.                                                                        |
| **`barLabelWidth`**          | _Number_   | `100`              | Width in pixels applied on all bar labels.                                                  |
| **`timelineTrackThickness`** | _Number_   | `4`                | Width in pixels applied on the timeline track.                                              |
| **`timelineMarkerSize`**     | _Number_   | `14`               | Width in pixels applied on the timeline markers.                                            |
| **`timelineMarkerColor`**    | _String_   | `#cecece`          | Background color applied on the timeline markers.                                           |
| **`timelineTrackColor`**     | _String_   | `#cecece`          | Background color applied on the timeline track.                                             |
| **`timelineTrackFillColor`** | _String_   | `#0984e3`          | Background color applied on the timeline track fill.                                        |
| **`renderValue`**            | _Function_ | `() => String`     | Callback function for label handling. `(label:String) => label`                             |
| **`onChange`**               | _Function_ | `() => Number`     | Function called when the current step changes. `(step:String) => step`                      |

## To Do

- Types
- Add action buttons
- Add showActionButtons prop
- Add renderGraphTitle prop
- Add renderBarLabel prop
- Add showBarLabel prop
- Add showBarValue prop
- Add showBarImage prop
- Add onClickBar prop
- Control z-index on change bar positions
- Improve timeline behavior
- Add graphOrientation prop
- Improve documentation
