import { Button, InteractionRow } from "reaccord"
import { Dispatch, SetStateAction } from "react"

interface Props {
    page: number
    setPage: Dispatch<SetStateAction<number>>
}

export const Navigation = ({ page, setPage }: Props) => (
    <InteractionRow>
        <Button
            customId="firstPage"
            onClick={() => {
                setPage(1)
            }}
            disabled={page <= 1}
            style="Secondary"
        >
            {"<<"}
        </Button>
        <Button
            customId="previousPage"
            onClick={() => {
                setPage((page) => page - 1)
            }}
            disabled={page <= 1}
            style="Primary"
        >
            {"<"}
        </Button>
        <Button customId="current" disabled>
            Page {page}
        </Button>
        <Button
            customId="nextPage"
            onClick={() => {
                setPage((page) => page + 1)
            }}
            disabled={page >= 100}
            style="Primary"
        >
            {">"}
        </Button>
        <Button
            customId="lastPage"
            onClick={() => {
                setPage(100)
            }}
            disabled={page >= 100}
            style="Secondary"
        >
            {">>"}
        </Button>
    </InteractionRow>
)
