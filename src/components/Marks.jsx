import { line, curveNatural } from "d3"
import { useDataContext } from "../dataContext"

export const Marks = ({ xScale, yScale, xAccessor, yAccessor, xAccessorTickFormat, yAccessorTickFormat }) => {
    const { data } = useDataContext()

    return (
        <g>
            {/* lines */}
            <path
                d={line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(yAccessor(d)))
                    .curve(curveNatural)
                    (data)
                }
                fill="none"
                stroke="black"
                stroke-width={3}
                stroke-linejoin="round"
                stroke-linecap="round"
            />

            {/* circles */}
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(xAccessor(d))}
                    cy={yScale(yAccessor(d))}
                    r={4}
                >
                    <title>
                        {`${xAccessorTickFormat(xAccessor(d))}  -  ${yAccessorTickFormat(yAccessor(d))}ºC`}
                    </title>
                </circle>
            ))}
        </g>
    )
}