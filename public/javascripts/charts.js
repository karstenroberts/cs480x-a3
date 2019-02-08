let testNum = 1;



drawChart = () => {
    clearChart();
    if (testNum <= 20) {
        donutChart();
    } else if (testNum <= 40) {
        pieChart();
    } else if (testNum <= 60) {
        triangleBar();
    } else {
        document.getElementById("chart-area").innerHTML = "<img alt='Thanks!' src='/images/placeholder.jpg'/>"
    }
    testNum++;
};

clearChart = () => {
  const chartArea = document.getElementById("chart-area");
  while (chartArea.firstChild) {
      chartArea.removeChild(chartArea.firstChild);
  }
};

donutChart = () => {
    var dat = randomDataset().values;
    var width = 540;
    var height = 540;
    var radius = Math.min(width, height) / 2.1;

    var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${(width / 2)}, ${(height / 2)})`);

    var color = d3.scaleOrdinal(["#00000066", "#00000066", "#00000066",
        "#00000066", "#00000066", "#00000066"]);

    var pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    var arc = d3.arc()
        .innerRadius(150)
        .outerRadius(radius);

    function update(val = this.value) {
        // Join new data
        var path = svg.selectAll("path")
            .data(pie(dat));

        // Enter new arcs
        path.enter().append("path")
            .attr("fill", (d, i) => color(i))
            .attr("d", arc)
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .each(function (d) {
                this._current = d;
            });
    }

    update();
};

pieChart = () => {
    var dat = randomDataset().values;
    var width = 540;
    var height = 540;
    var radius = Math.min(width, height) / 2.1;

    var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${(width / 2)}, ${(height / 2)})`);

    var color = d3.scaleOrdinal(["#00000066", "#00000066", "#00000066",
        "#00000066", "#00000066", "#00000066"]);

    var pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    function update(val = this.value) {
        // Join new data
        var path = svg.selectAll("path")
            .data(pie(dat));

        // Enter new arcs
        path.enter().append("path")
            .attr("fill", (d, i) => color(i))
            .attr("d", arc)
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .each(function (d) {
                this._current = d;
            });
    }

    update();
};

triangleBar = () => {
    const data = randomDataset().values;

    const margin = {top: 100, right: 40, bottom: 50, left: 40},
        triangleChartWidth = 960 - margin.left - margin.right,
        trinagleChartHeight = 500 - margin.top - margin.bottom;

    const overlap = 15;

    const x = d3.scaleBand()
        .range([0, triangleChartWidth])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([trinagleChartHeight, 0]);

    let triangleChartSvg = d3.select("#chart-area").append("svg")
        .attr("width", triangleChartWidth + margin.left + margin.right)
        .attr("height", trinagleChartHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map((d) => {
        return d.key
    }));
    y.domain([0, d3.max(data, (d) => {
        return d.value
    }) + 1]);

    triangleChartSvg.selectAll(".bar")
        .data(data)
        .enter()
        .append("polygon")
        .attr("class", "bar")
        .attr("points", (d) => {
            const left = x(d.key) - overlap;
            const top = y(d.value);
            const bottom = trinagleChartHeight;
            return left + "," + bottom + " " + (left + (x.bandwidth() / 2) + overlap) + "," + top + " " + (left + x.bandwidth() + (2 * overlap)) + "," + bottom;
        })
        .style("opacity", ".5");

    triangleChartSvg.append("line")
        .attr("x1", 0 - overlap)
        .attr("y1", trinagleChartHeight)
        .attr("x2", triangleChartWidth + overlap)
        .attr("y2", trinagleChartHeight)
        .attr("stroke", "#000000")
        .attr("stroke-width", "3");
};