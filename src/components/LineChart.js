import React from 'react';
import {axisBottom,axisLeft} from 'd3-axis';
import {select} from 'd3-selection';
import {scaleLinear} from 'd3-scale';

let margin = {top: 10, right: 40, bottom: 30, left: 30},
  width = 550 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;

class LineChart extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    let svg = select("#" + this.props.id)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const data = [{x: 10, y: 20}, {x: 40, y: 90}, {x: 80, y: 50}];

    let x = scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    let y = scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    svg.append('g')
      .call(axisLeft(y));

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 7);
  }

  render() {
    return (
      <div>
        <h1>Line Chart</h1>
        <div id={this.props.id}/>
      </div>
    );
  }
}

export default LineChart;
