import Chart from "./models/Chart.js";

const evolutionChart = ({
  target = document.body,
  className = "",
  data = [],
  labels = [],
  evolutionInterval = 2000,
  transitionTopInterval,
  barWidth = 20,
  gap = 10,
  labelWidth = 100,
  renderValue,
  order = "asc",
}) => {
  try {
    let currentEvolutionIndex = 0;
    let interval = null;

    const getHigherValue = () => {
      let higherValue = 0;

      for (const { values } of data) {
        for (const value of values) {
          if (value > higherValue) higherValue = value;
        }
      }

      return higherValue;
    };

    const createChart = () => {
      const chart = new Chart({
        data,
        labels,
        className: `evolution-chart${className?.length ? ` ${className}` : ""}`,
        label: labels[currentEvolutionIndex],
        barWidth,
        labelWidth,
        gap,
        dataLength: data.length,
        higherValue: getHigherValue(),
        order,
        evolutionInterval,
        transitionTopInterval: transitionTopInterval || evolutionInterval / 2,
        renderValue,
      });

      return chart;
    };

    const updateChart = ({ chart }) => {
      chart.update({ currentEvolutionIndex });
      currentEvolutionIndex++;
    };

    (() => {
      const chart = createChart();

      target.prepend(chart.body);

      updateChart({ chart });

      interval = setInterval(() => {
        if (currentEvolutionIndex >= data[0]?.values?.length) {
          clearInterval(interval);
          return;
        }
        updateChart({ chart });
      }, evolutionInterval);
    })();
  } catch (error) {
    console.warn("evolutionChart ERROR", error);
  }
};

export default evolutionChart;
