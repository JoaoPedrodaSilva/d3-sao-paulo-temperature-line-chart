import { line, curveNatural } from "d3"
import { useDataContext } from "../dataContext"

export const Marks = ({ xScale, yScale, xAccessor, yAccessorMinTemp, yAccessorMaxTemp, xAccessorTickFormat, yAccessorTickFormat }) => {
    const { data } = useDataContext()

    return (
        <g>
            {/* max temp line */}
            <path
                d={line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(yAccessorMaxTemp(d)))
                    .curve(curveNatural)
                    (data)
                }
                fill="none"
                stroke="#dd6e6e"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* min temp line */}
            <path
                d={line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(yAccessorMinTemp(d)))
                    .curve(curveNatural)
                    (data)
                }
                fill="none"
                stroke="#176dae"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* max temp circles */}
            {data.map((d, i) => (
                <circle
                    key={i}
                    fill="#dd6e6e"
                    cx={xScale(xAccessor(d))}
                    cy={yScale(yAccessorMaxTemp(d))}
                    r={4}
                >
                    <title>
                        {`${xAccessorTickFormat(xAccessor(d))}  -  ${yAccessorTickFormat(yAccessorMaxTemp(d))}ºC`}
                    </title>
                </circle>
            ))}

            {/* min temp circles */}
            {data.map((d, i) => (
                <circle
                    key={i}
                    fill="#176dae"
                    cx={xScale(xAccessor(d))}
                    cy={yScale(yAccessorMinTemp(d))}
                    r={4}
                >
                    <title>
                        {`${xAccessorTickFormat(xAccessor(d))}  -  ${yAccessorTickFormat(yAccessorMinTemp(d))}ºC`}
                    </title>
                </circle>
            ))}
        </g>
    )
}