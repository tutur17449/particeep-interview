import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination as MuiPagination,
  Select,
  Stack,
} from '@mui/material'

interface PaginationProps {
  count: number
  page: number
  itemsPerPage: number
  nextPage: () => void
  previousPage: () => void
  updateItemsPerPage: (value: number) => void
}

export default function Pagination({
  count,
  page,
  itemsPerPage,
  nextPage,
  previousPage,
  updateItemsPerPage,
}: PaginationProps) {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) =>
    value > page ? nextPage() : previousPage()

  return (
    <Stack direction="row" alignItems="center">
      <MuiPagination
        count={count}
        page={page}
        siblingCount={0}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel id="select-items-label">Items</InputLabel>
        <Select
          labelId="select-items-label"
          id="select-items"
          value={itemsPerPage}
          onChange={event => updateItemsPerPage(event.target.value as number)}
          variant="outlined"
          label="Items"
          size="small"
        >
          {[4, 6, 12].map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
