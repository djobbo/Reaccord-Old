import { Button, ActionRow } from "reaccord"
import { Dispatch, SetStateAction } from "react"

interface Props {
    page: number
    setPage: Dispatch<SetStateAction<number>>
}

export const Navigation = ({ page, setPage }: Props) => (
    <ActionRow>
        <Button
            customId="firstPage"
            onClick={() => {
                setPage(1)
            }}
            disabled={page <= 1}
            style="SECONDARY"
        >
            {"<<"}
        </Button>
        <Button
            customId="previousPage"
            onClick={() => {
                setPage((page) => page - 1)
            }}
            disabled={page <= 1}
            style="PRIMARY"
        >
            {"<"}
        </Button>
        <Button customId="current" disabled style="SUCCESS">
            Page {page}
        </Button>
        <Button
            customId="nextPage"
            onClick={() => {
                setPage((page) => page + 1)
            }}
            disabled={page >= 100}
            style="PRIMARY"
        >
            {">"}
        </Button>
        <Button
            customId="lastPage"
            onClick={() => {
                setPage(100)
            }}
            disabled={page >= 100}
            style="SECONDARY"
        >
            {">>"}
        </Button>
    </ActionRow>
)
