import { useEffect } from "react"
import { csv } from "d3"
import { useDataContext } from "./dataContext"

export const useFetchData = () => {
    const { setData } = useDataContext()

    useEffect(() => {
        const preliminaryData = []

        csv("https://gist.githubusercontent.com/JoaoPedrodaSilva/45aa586e7d221d66e40ecf9647d16c59/raw/03ca52191fad89678ce48019aa588eefd6e22977/sao-paulo-temperature")
            .then(response => {
                response.map(row => (
                    preliminaryData.push(
                        {
                            date: Date(row.date),
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