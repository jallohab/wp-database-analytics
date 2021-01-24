import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ data, bar = { dataKey: "", name: "" } }) {
  return (
    <BarChart
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
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="white" />

      <YAxis stroke="white" />
      <Tooltip />
      <Legend />
      <Bar dataKey={bar.dataKey} fill="#455566" name={bar.name} />
    </BarChart>
  );
}
