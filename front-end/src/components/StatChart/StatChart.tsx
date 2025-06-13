import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

type DayStat = {
  date: string;
  minutes: number;
};
type StatsChartProps = {
  data: DayStat[];
};

export function StatsChart({ data }: StatsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value} min`} />
        <Bar dataKey="minutes" fill="#82ca9d" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}
