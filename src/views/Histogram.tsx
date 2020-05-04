import React from 'react';
import {
  Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,
} from 'recharts';


const Histogram = ({ set, setLength }: any) => {
  const data = Object.keys(set).map((key) => {
    return {
      name: key,
      percentage: Math.round(((set[key] / setLength) * 10000)) / 100,
    };
  });
  return (
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="percentage" fill="#82ca9d" />
    </BarChart>
  );
};

export default Histogram;