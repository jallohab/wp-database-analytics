import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function SimpleLine({ data }) {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" stroke="white" />
      <YAxis stroke="white" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="White"
        stroke="#455566"
        strokeWidth="3px"
      />
      <Line
        type="monotone"
        dataKey="Black"
        stroke="#455566"
        strokeWidth="3px"
      />
      <Line
        type="monotone"
        dataKey="Hispanic"
        stroke="#455566"
        strokeWidth="3px"
      />
      <Line
        type="monotone"
        dataKey="Other"
        stroke="#455566"
        strokeWidth="3px"
      />
    </LineChart>
  );
}
