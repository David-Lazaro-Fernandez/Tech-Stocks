import { useState } from "react";
import Chart from "react-apexcharts";
export const LineChart = (props) =>{
    const {options, series} = props;
    


    return (
        <>
            <Chart 
                type="area"
                options={options.options}
                series={series}
                height="500"
                width="1000"
            />
        </>
    )
}

export default LineChart;