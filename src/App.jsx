import { scaleLinear, scaleTime, extent, timeFormat, format } from "d3"
import { useDataContext } from "./dataContext"
import { useFetchData } from "./useFetchData"
import { Title } from "./components/Title"

import { AxisBottom } from "./components/AxisBottom"
// import { LabelBottom } from "./components/LabelBottom"
import { AxisLeft } from "./components/AxisLeft"
// import { LabelLeft } from "./components/LabelLeft"
import { Marks } from "./components/Marks"
import { Source } from "./components/Source"

export const App = () => {
    //states and variables
    const { data } = useDataContext()

    const width = 960
    const height = 500
    const margin = { top: 80, right: 30, bottom: 50, left: 60 }
    const innerWidth = width - margin.right - margin.left
    const innerHeight = height - margin.top - margin.bottom

    const xAccessor = d => d.date
    const yAccessor = d => d.temperature.mean

    const xAccessorTickFormat = timeFormat("%b %d")
    const yAccessorTickFormat = format(".0f")


    //fetch data
    useFetchData()


    //render in case of no data
    if (!data) {
        return <pre>Loading...</pre>
    }


    //scales
    const xScale = scaleLinear()
        .domain(extent(data, xAccessor))
        .range([0, innerWidth])
        .nice()

    const yScale = scaleLinear()
        .domain(extent(data, yAccessor))
        .range([innerHeight, 0])
        .nice()


    //render scatterplot
    return (
        <div className="responsive-div">
            <svg
                preserveAspectRatio="xMinYMin meet"
                viewBox={`0 0 ${width} ${height}`}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {/* {console.log((yAccessor(data[0]).max))} */}
                    <Title />

                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                        tickFormat={xAccessorTickFormat}
                    />
                    {/* <LabelBottom /> */}

                    <AxisLeft
                        yScale={yScale}
                        innerWidth={innerWidth}
                        tickFormat={yAccessorTickFormat}
                    />
                    {/* <LabelLeft /> */}

                    <Marks
                        xScale={xScale}
                        yScale={yScale}
                        xAccessor={xAccessor}
                        yAccessor={yAccessor}
                        xAccessorTickFormat={xAccessorTickFormat}
                        yAccessorTickFormat={yAccessorTickFormat}
                    />

                    <Source />
                </g>
            </svg>
        </div>
    )
}
