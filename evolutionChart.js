const evolutionChart = ({
  target = document.body,
  data = [],
  className = "",
  evolutionInterval = 1000,
  barWidth = 20,
  beforeValue = "",
  afterValue = "",
}) => {
  try {
    let higherChartValue = 0;
    let currentEvolutionIndex = 0;
    let interval = null;

    const compare = (a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    };

    const getHigherChartValue = () => {
      for (const { bars } of data) {
        for (const { value } of bars) {
          if (value > higherChartValue) higherChartValue = value;
        }
      }
    };

    const createBars = (bars) =>
      bars.map(
        ({ label, color, image, value }, index) => `
            <div 
              class="
                evolution-chart__item 
                ${label.replace(" ", "-").toLowerCase()}
              "
              style="
                top: ${barWidth * 2 * index}px; 
                transition: all ${evolutionInterval}ms linear, 
                top ${evolutionInterval / 2}ms linear;
              "
            >
              <div class="evolution-chart__item__label">
                  ${
                    image?.length
                      ? `
                      <div class="evolution-chart__item__image">
                        <img src="${image}" />
                      </div>`
                      : ""
                  }
                  <label>${label}</label>
              </div>
              <div class="evolution-chart__item__track">
                  <div class="evolution-chart__item__bar" style="width: 1px; background-color: ${color}; transition: all ${evolutionInterval}ms linear;">
                      ${beforeValue}${value}${afterValue}
                  </div>
              </div>
            </div>
        `
      );

    const updateChart = () => {
      if (currentEvolutionIndex >= data?.length) return;

      const chart = document.querySelector(".evolution-chart");
      const chartLabel = document.querySelector(".evolution-chart__label");
      const items = Array.from(
        document.querySelectorAll(".evolution-chart__item")
      );

      const sortedData = [...data[currentEvolutionIndex]?.bars].sort(compare);

      items.forEach((item, index) => {
        const newValue = data[currentEvolutionIndex]?.bars[index]?.value;
        const itemLabel = item.querySelector(".evolution-chart__item__label");
        const itemBar = item.querySelector(".evolution-chart__item__bar");

        if (!chart || !newValue || !itemLabel || !itemBar) {
          clearInterval(interval);
          return;
        }

        const foundItem = sortedData.find(
          (item) =>
            item.label === data[currentEvolutionIndex]?.bars[index]?.label
        );

        itemBar.style.width = `calc(${(newValue / higherChartValue) * 100}%`;
        item.style.top = `${sortedData.indexOf(foundItem) * barWidth * 2}px`;
        itemBar.textContent = `${beforeValue}${newValue}${afterValue}`;
      });

      chartLabel.textContent = data[currentEvolutionIndex].label;

      currentEvolutionIndex++;
    };

    const renderChart = () => {
      const chart = document.createElement("div");
      chart.classList.add("evolution-chart");
      if (className?.length) chart.classList.add(className);

      const chartLabel = document.createElement("div");
      chartLabel.classList.add("evolution-chart__label");

      chartLabel.textContent = data[currentEvolutionIndex].label;

      const chartBars = document.createElement("div");
      chartBars.classList.add("evolution-chart__bars");

      chartBars.style.height = `${
        data[currentEvolutionIndex].bars?.length * barWidth * 2 - barWidth
      }px`;

      const newBars = createBars(data[currentEvolutionIndex].bars);

      for (const newBar of newBars) chartBars.innerHTML += newBar;

      chart.append(chartLabel);

      chart.append(chartBars);

      target.append(chart);
    };

    const startEvolution = () => {
      getHigherChartValue();

      renderChart();

      updateChart();

      interval = setInterval(updateChart, evolutionInterval);
    };

    startEvolution();
  } catch (error) {
    console.warn("evolutionChart ERROR", error);
  }
};
