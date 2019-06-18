import React from 'react';
import {axisBottom, axisLeft} from 'd3-axis';
import {select} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {ascending, sum} from 'd3-array';
import {nest} from 'd3-collection';

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

    // const data = [{x: 10, y: 20}, {x: 40, y: 90}, {x: 80, y: 50}];
    const data = [
      {"user": "Rm6vnmNPRvz", "value": 11, "category": 7}, {
        "user": "cB0hC",
        "value": 9,
        "category": 7
      }, {"user": "xFapEXx9", "value": 12, "category": 9}, {
        "user": "stHdo1TV",
        "value": 6,
        "category": 10
      }, {"user": "NlUafWkpjduC3", "value": 10, "category": 7}, {
        "user": "e7DwVrmJ",
        "value": 7,
        "category": 6
      }, {"user": "uEOJsO", "value": 6, "category": 14}, {
        "user": "zlTNlewuDKcRl",
        "value": 13,
        "category": 8
      }, {"user": "BQlhXiIHXUo42I", "value": 12, "category": 14}, {
        "user": "SO6lM",
        "value": 5,
        "category": 5
      }, {"user": "kn3LTrlFv6", "value": 5, "category": 11}, {
        "user": "rFKwr3vSxco3K7",
        "value": 7,
        "category": 9
      }, {"user": "1gzvu", "value": 11, "category": 14}, {
        "user": "BL ymOGU",
        "value": 13,
        "category": 10
      }, {"user": "vwEH33kh8 Bhny", "value": 6, "category": 5}];

    let groupByCategory = nest()
      .key((d) =>  d.category)
      .rollup((d) => {
        return sum(d, (v) => v.value);
      })
      .sortKeys(ascending)
      .entries(data);

    console.log(groupByCategory);

    let x = scaleLinear()
      .domain([0, 15])
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    let y = scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    svg.append('g')
      .call(axisLeft(y));

    svg.append("path")
      .datum(groupByCategory)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line()
        .x((d) => x(d.key))
        .y((d) => y(d.value)));
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
