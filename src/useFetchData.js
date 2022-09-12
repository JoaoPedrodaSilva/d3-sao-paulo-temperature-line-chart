import { useEffect } from "react"
import { csv } from "d3"
import { useDataContext } from "./dataContext"

export const useFetchData = () => {
    const { setData } = useDataContext()

    useEffect(() => {
        const preliminaryData = []

        csv("https://gist.githubusercontent.com/JoaoPedrodaSilva/45aa586e7d221d66e40ecf9647d16c59/raw/2a0ae797c3bf959a90bf74e377fa79cb44d245cf/sao-paulo-temperature")
            .then(response => {
                response.map(row => (
                    preliminaryData.push(
                        {
                            date: new Date(row.date),
                            temperature: {
                                max: Number(row.maximum),
                                mean: Number(row.mean),
                                min: Number(row.minimum)
                            }
                        })
                ))
                setData(preliminaryData)
            })
    }, [setData])
}