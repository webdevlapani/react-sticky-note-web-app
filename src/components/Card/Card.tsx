import { StickyNoteProps } from '../../types/types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  
  card: {
    margin: '10px',
    padding: '1rem',
    borderRadius: '8px',
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    fontFamily: "'Source Sans Pro', sans-serif",
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
    '& button': {
      fontSize: '1.2rem',
      backgroundColor: '#E6DF44',
      border: '0',
      cursor: 'pointer',
      borderRadius: '5px',
      margin: '5px',
      padding: '5px 10px',
      color: '#00293C',
      boxShadow: '0 0 10px #00000029',
    },
  },
  description: {
    fontSize: '1rem',
    color: '#fff',
    height: '150px',
    overflowY: 'auto',
    wordBreak: 'break-all',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
    '&::-webkit-scrollbar' : {
      display : 'none',
    }
  },
}));

const Card = (props: StickyNoteProps) => {
  const classes = useStyles();
  const { color, description, isStarred, onEdit, onDelete, onStar } = props;

  return (
    <div className={classes.card} style={{ backgroundColor: color }}>
      <p className={classes.description}>{description}</p>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onStar}>
          {isStarred ? 'UnFavourite' : 'Favourite'}
        </button>
      </div>
    </div>
  );
};

export default Card;
