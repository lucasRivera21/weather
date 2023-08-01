import React, { useContext} from "react";
import { DataContext } from "../context/DataContext";
import { Card, Title, AreaChart } from "@tremor/react";
/*
const chartdata = [
  {
    date: forecast.list[4].dt_txt.substr(5,5),
    Temp: Math.round(forecast.list[4].main.temp),
  },
  {
    date: forecast.list[12].dt_txt.substr(5,5),
    Temp: Math.round(forecast.list[12].main.temp),
  },
  {
    date: forecast.list[20].dt_txt.substr(5,5),
    Temp: Math.round(forecast.list[20].main.temp),
  },
  {
    date: forecast.list[28].dt_txt.substr(5,5),
    Temp: Math.round(forecast.list[28].main.temp),
  },
  {
    date: forecast.list[36].dt_txt.substr(5,5),
    Temp: Math.round(forecast.list[36].main.temp),
  },
];
*/
const dataFormatter = (number) => {
  return Intl.NumberFormat("us").format(number).toString() + "°C";
};

//extrae la información que quieres

function Graphic() {
  const { forecast, foundForecast, loadingForecast } = useContext(DataContext);

  const extractData = (forecast) => {
    if (forecast) {
      let array = [];
      let count = 0;
      forecast.list.forEach((e, i) => {
        count++;
        if (i == 4 || count == 8) {
          count = 0;
          array.push({ date: e.dt_txt.substr(5,5), Temp: Math.round(e.main.temp) });
        }
      });
      return array;
    }
    return [
      { date: "00-00", Temp: 0 },
      { date: "00-00", Temp: 0 },
      { date: "00-00", Temp: 0 },
      { date: "00-00", Temp: 0 },
      { date: "00-00", Temp: 0 },
    ];
  };

  return (
    <>
      {foundForecast && !loadingForecast && (
        <Card className="col-span-6 rounded-3xl max-lg:mb-10 transition ease-in-out duration-300">
          <Title className="font-roboto font-medium text-xl max-sm:text-lg transition ease-in-out duration-300">
            How's the temperature next 5 days?
          </Title>
          <AreaChart
            className="h-48 mt-3 transition ease-in-out duration-300"
            data={extractData(forecast)}
            index="date"
            categories={["Temp"]}
            colors={["indigo"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            showGridLines={false}
            curveType={"natural"}
          />
        </Card>
      )}
    </>
  );
}

export default Graphic;
