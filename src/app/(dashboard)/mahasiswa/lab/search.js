// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const SearchHeader = props => {
  // Props
  const { mode, searchValue, setSearchValue } = props

  // Vars
  const lightIllustration = '/images/apps/academy/hand-with-bulb-light.png'
  const darkIllustration = '/images/apps/academy/hand-with-bulb-dark.png'

  // Hooks
  const theme = useTheme()
  const leftIllustration = useImageVariant(mode, lightIllustration, darkIllustration)

  return (
    <Card className='relative flex justify-center'>
      <img src={leftIllustration} className='max-md:hidden absolute max-is-[100px] top-12 start-12' />
      <div className='flex flex-col items-center gap-4 max-md:pli-5 plb-12 md:is-1/2'>
        <Typography variant='h4' className='text-center md:is-3/4'>
          Temukan program lab yang ingin anda programkan <span className='text-primary'>di semester ini.</span>
        </Typography>
        <Typography className='text-center'>
          Jelajahi berbagai pilihan laboratorium yang tersedia untuk mendukung pembelajaran Anda. Atur jadwal dan program lab Anda sesuai dengan kebutuhan akademik.
        </Typography>
        <div className='flex items-center gap-4 max-sm:is-full'>
          <CustomTextField
            placeholder='Temukan LAB anda'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className='sm:is-[350px] max-sm:flex-1'
          />
          <CustomIconButton variant='contained' color='primary'>
            <i className='tabler-search' />
          </CustomIconButton>
        </div>
      </div>
      <img
        src='/images/apps/academy/9.png'
        className={classnames('max-md:hidden absolute max-bs-[180px] bottom-0 end-0', {
          'scale-x-[-1]': theme.direction === 'rtl'
        })}
      />
    </Card>
  )
}

export default SearchHeader
