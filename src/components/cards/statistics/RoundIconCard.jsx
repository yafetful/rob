import PropTypes from 'prop-types';

// material-ui
import { Grid,Box, Chip, Stack, Typography } from '@mui/material';

// assets
import { RiseOutlined, FallOutlined, MinusOutlined} from '@ant-design/icons';

// project imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// ============================|| ROUND ICON CARD ||============================ //

const RoundIconCard = ({ primary, secondary,percentage,isLoss, content, iconPrimary, color, bgcolor, data,names }) => {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <MainCard sx={{ bgcolor }}>
      <Grid container alignItems="center" spacing={0} justifyContent="space-between">
        <Grid item>
          <Stack spacing={1}>
            <Typography variant="h5" color="inherit">
              {primary}
            </Typography>
            <Stack direction="row" alignItems="center">
            <Typography variant="h3">{secondary}</Typography>
            {typeof percentage === 'number' && (
            <Chip
              variant="combined"
              color={percentage < 0 ? "error" : percentage > 0 ? "success" : "warning"}
              icon={
                <>
                  {isLoss === true ? <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} /> : 
                  isLoss === false ? <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} /> : 
                  <MinusOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          )}
          </Stack>
            <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic' }}>
              {content}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          {primaryIcon && (
            <IconButton sx={{ bgcolor, color, '& .MuiSvgIcon-root': { fontSize: '1.5rem' } }} size="small">
          {primaryIcon}
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Box mt={2}>
      <Grid container spacing={2}>
        {names && data && names.map((item, index) => (
        <Grid item xs={3} key={index}>
          <Typography variant="body1" color="textSecondary">{item}</Typography>
          <Typography variant="body1">{data[index]}</Typography>
        </Grid>
        ))}
      </Grid>
      </Box>
    </MainCard>
  );
};

RoundIconCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  content: PropTypes.string,
  iconPrimary: PropTypes.object,
  color: PropTypes.string,
  bgcolor: PropTypes.string
};

export default RoundIconCard;