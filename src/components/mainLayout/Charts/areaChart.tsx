import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type AreaChartProps = {
  data: { date: string; income: number; expense: number }[];
};

const chartConfig = {
  expense: {
    label: "expense",
    color: "hsl(var(--chart-1))",
  },
  income: {
    label: "income",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AreaChartComponent({ data }: AreaChartProps) {
  return (
    
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(8, 10)} // Extract and show only the day part (e.g., 07, 08)
            />
            
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              stackId="a"
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
     
  );
}
