import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Dispatch, SetStateAction } from 'react'

interface FiltersProps {
  categories: string[]
  selectedCategories: string[]
  resetPage: () => void
  setSelectedCategories: Dispatch<SetStateAction<string[]>>
}

export default function Filters({
  categories,
  selectedCategories,
  resetPage,
  setSelectedCategories,
}: FiltersProps) {
  const handleChangeSelection = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value)
    resetPage()
  }

  const handleResetSelection = () => setSelectedCategories([])

  return (
    <Stack direction="row" alignItems="center">
      <IconButton aria-label="clear" onClick={handleResetSelection}>
        <FilterAltOffIcon />
      </IconButton>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedCategories}
          onChange={handleChangeSelection}
          input={<OutlinedInput label="Catégories" />}
        >
          {categories.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
