import { useState } from "react";
import dynamic from "next/dynamic";
export const LineChart = (props) =>{
    const {options, series} = props;
    const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


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