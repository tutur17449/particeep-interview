import { useEffect, useMemo, useState } from 'react'
import { Movie as TMovie, getMovies } from '../api/movies'
import { Movie, Filters, Pagination } from '../components'
import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { usePagination } from '../hooks/usePagination'
import { motion } from 'framer-motion'
import { containerVariant } from '../utils/framer'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [movies, setMovies] = useState<TMovie[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const {
    page,
    itemsPerPage,
    nextPage,
    previousPage,
    updateItemsPerPage,
    resetPage,
  } = usePagination()

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setCategories(Array.from(new Set(movies.map(movie => movie.category))))
  }, [movies])

  const handleRemoveMovie = (id: string) => {
    const newMovies = movies.filter(movie => movie.id !== id)
    if (newMovies.length % itemsPerPage === 0) previousPage()
    setMovies(prevState => prevState.filter(movie => movie.id !== id))
  }

  const filteredMovies = useMemo(
    () =>
      selectedCategories.length
        ? movies.filter(movie => selectedCategories.includes(movie.category))
        : movies,
    [movies, selectedCategories],
  )

  const currentMovies = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredMovies.slice(start, end)
  }, [filteredMovies, page, itemsPerPage])

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariant}>
      <Stack
        alignItems="center"
        gap="1rem"
        width="90%"
        m="auto"
        sx={{ height: '100%', overflow: 'hidden' }}
      >
        <Typography component="h1" variant="h3">
          Particeep interview
        </Typography>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Stack gap="1rem" width="100%" overflow="hidden" flex={1}>
            <Stack direction="row" justifyContent="space-between">
              <Filters
                {...{
                  categories,
                  selectedCategories,
                  resetPage,
                  setSelectedCategories,
                }}
              />
              <Pagination
                {...{
                  count: Math.ceil(filteredMovies.length / itemsPerPage),
                  page,
                  itemsPerPage,
                  nextPage,
                  previousPage,
                  updateItemsPerPage,
                }}
              />
            </Stack>
            {currentMovies.length ? (
              <Grid container spacing={2} overflow="scroll">
                {currentMovies.map(movie => (
                  <Movie
                    key={movie.id}
                    movie={movie}
                    onRemove={handleRemoveMovie}
                    // !TODO: to implement
                    toggleLikeDislike={() => void 0}
                  />
                ))}
              </Grid>
            ) : (
              <Typography>No data found ...</Typography>
            )}
          </Stack>
        )}
      </Stack>
    </motion.div>
  )
}
