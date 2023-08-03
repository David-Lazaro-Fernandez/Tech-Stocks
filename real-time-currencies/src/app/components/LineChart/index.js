import { useState } from "react";
import Chart from "react-apexcharts";
export const LineChart = (props) =>{
    const {options} = props;
    


    return (
        <>
            <Chart 
                type="line"
                options={options.options}
                series={options.series}
                height="500"
                width="500"
            />
        </>
    )
}

export default LineChart;