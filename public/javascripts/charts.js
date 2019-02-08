const ChartTypesEnum = Object.freeze({"TORUS":0, "PIE":1, "BAR":2, "COMPLETE":3});
let testNum = 0; //should be 0
let correctAnswer = 42;
let userAnswer = 666;
let currType = ChartTypesEnum.TORUS;
let userID;

var theTwoValues = [];

init = () => {
    window.addEventListener("keydown", keyPressHandler);
    identifyUser();
    drawChart();
};

identifyUser = () => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", newIdentity);
    xhr.open("GET", '/user', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
};

function newIdentity () {
    const data = this.response;
    if (data) {
        const oldID = parseInt(JSON.parse(this.response)[0].id);
        console.log(oldID);
        userID = oldID + 1;
    } else {
        userID = 0;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/user', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=" + userID);
}

keyPressHandler = (e) => {
    switch (e.key) {
        case "Enter":
            updateChart();
            break;
    }
};

updateChart = () => {
    if (currType !== ChartTypesEnum.COMPLETE) {
        let input = document.getElementById("number");
        userAnswer = input.value;
        if (userAnswer !== "" && ((parseInt(userAnswer) >= 1) && (parseInt(userAnswer) <= 100))) {
            console.log(userAnswer);
            let min = Math.min(theTwoValues[0], theTwoValues[1]);
            let max = Math.max(theTwoValues[0], theTwoValues[1]);
            correctAnswer = 100 * min / max;

            input.value = '';
            console.log("USER:" + userAnswer + " CORRECT: " + correctAnswer);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", '/', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("u=" + userAnswer + "&c=" + correctAnswer + "&t=" + currType + "&id=" + userID);

            drawChart();
        } else if ((parseInt(userAnswer) < 1) || (parseInt(userAnswer > 100))) {
            alert("Please input a value between 1 and 100 (inclusive)")
        } else { // the user did not write any number in the box.
            alert("Please write the answer in the box.");
        }
    }
};

drawChart = () => {
    clearChart();
    testNum++;
    updateChartType();
    switch (currType) {
        case ChartTypesEnum.TORUS:
            donutChart();
            break;
        case ChartTypesEnum.PIE:
            pieChart();
            break;
        case ChartTypesEnum.BAR:
            triangleBar();
            break;
        case ChartTypesEnum.COMPLETE:
            document.getElementById("chart-area").innerHTML = "<h1>Thanks for taking our survey!</h1>";
    }
};

updateChartType = () => {
    if (testNum <= 20) {
        currType = ChartTypesEnum.TORUS;
    } else if (testNum <= 40) {
        currType = ChartTypesEnum.PIE;
    } else if (testNum <= 60) {
        currType = ChartTypesEnum.BAR;
    } else {
        currType = ChartTypesEnum.COMPLETE;
    }
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

    const randScale = d3.scaleLinear()
        .domain([1,10])
        .range([0,8]);

    var color = d3.scaleOrdinal(["#00000066", "#00000066", "#00000066",
        "#00000066", "#00000066", "#00000066"]);

    var pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    var arc = d3.arc()
        .innerRadius(150)
        .outerRadius(radius);

    const firstDot = Math.ceil(randScale(Math.random()*10));

    function update(val = this.value) {
        if (theTwoValues.length !== 0) {
            //we compute the real percentage

            // TODO Karsten Database: upload the percentageDonut in the database

            theTwoValues = [];
        }
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


        // Code for adding dots into each slice
        path.enter().append("circle")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr('r', function(d, i) {
                if (i === firstDot || i === firstDot+1) {
                    theTwoValues.push(d.data.value);
                    return 5;
                } else {
                    return 0;
                }
            })
            .style("fill", "#000");
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

    const randScale = d3.scaleLinear()
        .domain([1,10])
        .range([0,8]);

    const firstDot = Math.ceil(randScale(Math.random()*10));

    var color = d3.scaleOrdinal(["#00000066", "#00000066", "#00000066",
        "#00000066", "#00000066", "#00000066"]);

    var pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    function update(val = this.value) {
        if (theTwoValues.length !== 0) {
            theTwoValues = []; // we clear the array for the next chart
        }
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

        // Code for adding dots into each slice
        path.enter().append("circle")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr('r', function(d, i) {
                if (i === firstDot || i === firstDot+1) {
                    theTwoValues.push(d.data.value);
                    return 5;
                } else {
                    return 0;
                }
            })
            .style("fill", "#000");
    }

    update();
};

triangleBar = () => {
    if (theTwoValues.length !== 0) {
        theTwoValues = [];
    }

    const data = randomDataset().values;

    const margin = {top: 100, right: 40, bottom: 50, left: 40},
        triangleChartWidth = 960 - margin.left - margin.right,
        triangleChartHeight = 500 - margin.top - margin.bottom;

    const randScale = d3.scaleLinear()
        .domain([1,10])
        .range([0,8]);

    const firstDot = Math.ceil(randScale(Math.random()*10));


    const x = d3.scaleBand()
        .range([0, triangleChartWidth])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([triangleChartHeight, 0]);

    let triangleChartSvg = d3.select("#chart-area").append("svg")
        .attr("width", triangleChartWidth + margin.left + margin.right)
        .attr("height", triangleChartHeight + margin.top + margin.bottom)
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
            const left = x(d.key);
            const top = y(d.value);
            const bottom = triangleChartHeight;
            return left + "," + bottom + " " + (left + (x.bandwidth() / 2)) + "," + top + " " + (left + x.bandwidth() + 2) + "," + bottom;
        })
        .style("opacity", ".5");


    triangleChartSvg.append("line")
        .attr("x1", 0)
        .attr("y1", triangleChartHeight)
        .attr("x2", triangleChartWidth)
        .attr("y2", triangleChartHeight)
        .attr("stroke", "#000000")
        .attr("stroke-width", "3");

    triangleChartSvg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", ".dot")
        .attr("transform", (d) => {
            const left = x(d.key);
            const bottom = triangleChartHeight;
            return  "translate(" + (left + (x.bandwidth() / 2)) + "," + (bottom - 7) +  ")";
        })
        .attr('r', function (d, i) {
            if (i === firstDot || i === firstDot+1) {
                theTwoValues.push(d.value);
                return 5;
            } else {
                return 0;
            }
        })
        .style("fill", "#000");
};