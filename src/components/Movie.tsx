import { Movie as TMovie } from '../api/movies'
import {
  Grid,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { motion } from 'framer-motion'
import { itemVariant } from '../utils/framer'

interface MovieProps {
  movie: TMovie
  onRemove: (id: string) => void
  toggleLikeDislike: (id: string, action: 'like' | 'dislike') => void
}

export default function Movie({
  movie,
  onRemove,
  toggleLikeDislike,
}: MovieProps) {
  const { likesPercentage, dislikesPercentage } = (() => {
    const total = movie.likes + movie.dislikes
    const likesPercentage = Math.round((movie.likes / total) * 100)
    const dislikesPercentage = Math.round((movie.dislikes / total) * 100)
    return { likesPercentage, dislikesPercentage }
  })()

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <motion.div variants={itemVariant}>
        <Paper
          sx={{
            p: '.5rem',
            position: 'relative',
            height: '6rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ position: 'absolute', top: '.25rem', right: '.25rem' }}
            onClick={() => onRemove(movie.id)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <Typography sx={{ fontWeight: 'bold' }}>{movie.title}</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt="1rem"
          >
            <Chip label={movie.category} variant="outlined" size="small" />
            <Stack gap=".5rem" alignItems="flex-end">
              <Box
                sx={{
                  width: '60px',
                  p: '.1rem',
                  background: `linear-gradient(to left, green ${likesPercentage}%, red ${dislikesPercentage}%) right`,
                }}
              />
              <Stack direction="row" gap=".5rem">
                <InteractionButton
                  icon={ThumbUpIcon}
                  count={movie.likes}
                  onClick={() => toggleLikeDislike(movie.id, 'like')}
                />
                <InteractionButton
                  icon={ThumbDownIcon}
                  count={movie.dislikes}
                  onClick={() => toggleLikeDislike(movie.id, 'dislike')}
                />
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </motion.div>
    </Grid>
  )
}

interface InteractionButtonProps {
  icon: typeof ThumbDownIcon
  count: number
  onClick: () => void
}

const InteractionButton = ({
  icon: Icon,
  count,
  onClick,
}: InteractionButtonProps) => (
  <Stack direction="row" alignItems="center">
    <IconButton aria-label="delete" size="small" onClick={onClick}>
      <Icon fontSize="inherit" />
    </IconButton>
    <Typography component="span" variant="caption">
      {count}
    </Typography>
  </Stack>
)
