import Chart from "react-apexcharts";
import {options} from './options';
export const LineChart = (props) =>{
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