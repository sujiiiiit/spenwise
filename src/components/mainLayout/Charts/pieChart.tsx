"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartsProps {
  incomeData: {
    category: string;
    amount: number;
    fill: string;
    percent: number;
  }[];
  expenseData: {
    category: string;
    amount: number;
    fill: string;
    percent: number;
  }[];
  totalincome: string;
  totalexpense: string;
}

const chartConfig: ChartConfig = {
  income: {
    label: "Income",
  },
  expense: {
    label: "Expense",
  },
};

export function PieCharts({
  incomeData,
  expenseData,
  totalincome,
  totalexpense,
}: PieChartsProps) {
  return (
    <div className="flex flex-row gap-4 w-full">
      {incomeData.length == 0 ? (
        "No Income"
      ) : (
        <Card className="flex flex-col w-full border-0 shadow-none">
          <CardHeader className="items-center pb-0">
            {/* <CardTitle>Income Distribution</CardTitle> */}
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto ">
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="category" hideLabel />}
                />
                <Pie
                  data={incomeData}
                  dataKey="amount"
                  labelLine={false}
                  label={({ payload, ...props }) => (
                    <text
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                    >
                      {`${payload.category} (${(payload.percent * 100).toFixed(
                        1
                      )}%)`}
                    </text>
                  )}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
          <div className="bg-green-500/10 p-2 w-full rounded-lg text-[var(--green)] font-bold text-center">+ Income : {totalincome}</div>

          </CardFooter>
        </Card>
      )}

      {expenseData.length == 0 ? (
        "No Expense"
      ) : (
        <Card className="flex flex-col w-full border-0 shadow-none">
          <CardHeader className="items-center pb-0">
            {/* <CardTitle>Expense Distribution</CardTitle> */}
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto">
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="category" hideLabel />}
                />
                <Pie
                  data={expenseData}
                  dataKey="amount"
                  labelLine={false}
                  label={({ payload, ...props }) => (
                    <text
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                    >
                      {`${payload.category} (${(payload.percent * 100).toFixed(
                        1
                      )}%)`}
                    </text>
                  )}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex mt-5 items-center justify-between">
          <div className="bg-red-500/10 p-2 w-full rounded-lg text-[var(--red)] font-bold text-center">- Expenses :{totalexpense}</div>

          </CardFooter>
        </Card>
      )}
    </div>
  );
}
