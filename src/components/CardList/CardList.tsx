import { useState } from 'react';
import Card from '../Card/Card';
import ReactColorPicker from '@super-effective/react-color-picker';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { SortableItemProps, SortableListProps, INote } from '../../types/types';
import { AddCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Backdrop,
  Button,
  Fade,
  Grid,
  IconButton,
  Dialog,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';


const SortableItem = SortableElement(({ children }: SortableItemProps) => {
  return <li style={{ listStyle: 'none' }}>{children}</li>;
});

const CustomSwitch = withStyles({
  switchBase: {
    color: '#fff',
    '& + $track': {
      backgroundColor: '#fff',
    },
    '&$checked': {
      color: '#E6DF44',
    },
    '&$checked + $track': {
      backgroundColor: '#E6DF44',
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  header: {
    backgroundColor: '#00293C',
    '& > div': {
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
      },
      '& > div': {
        [theme.breakpoints.down('sm')]: {
          flex: '100%',
        },
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#E6DF44',
    '& svg': {
      width: '2em',
      height: '2em',
    },
  },
  description: {
    width: '100%',
    wordBreak: 'break-all'
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
  },
  addNote: {
    '& button': {
      backgroundColor: '#E6DF44',
      color: '#00293C',
    },
  },
  cardList: {
    listStyle: 'none',
    padding: '0',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  colorPalate: {
    margin : '2rem 0',
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0',
    },
  }
}));

const SortableList = SortableContainer((props: SortableListProps) => {
  const classes = useStyles();
  const { items, onEdit, onDelete, onStar } = props;
  return (
    <ul className={classes.cardList}>
      {items.map((note: INote, index: number) => (
        <SortableItem key={`item-${note.id}`} index={index}>
          <Card
            key={note.id}
            id={note.id}
            index={index}
            description={note.description}
            color={note.color}
            isStarred={note.isStarred}
            onEdit={() => onEdit(note.id)}
            onDelete={() => onDelete(note.id)}
            onStar={() => onStar(note.id)}
          />
        </SortableItem>
      ))}
    </ul>
  );
});

const CardList = () => {
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState('#F2AA4CFF');
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setselectedNote] = useState<INote>();
  const [showStarredNotes, setShowStarredNotes] = useState<boolean>(false);
  // const [show, setShow] = useState<boolean>(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    const note: INote = {
      id: selectedNote?.id ? selectedNote.id : +new Date(),
      description,
      color,
      isStarred: false,
    };
    let newNotes;
    if (selectedNote?.id) {
      newNotes = notes.map((oldNote: INote) => {
        if (oldNote.id === selectedNote.id) {
          return { ...note };
        }
        return oldNote;
      });
    } else {
      newNotes = [...notes, note];
    }
    setNotes(newNotes);
    setDescription('');
    setColor('#F2AA4CFF');
    setselectedNote(Object);
    handleClose();
  };

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setNotes((items: INote[]) => arrayMove(items, oldIndex, newIndex));
  };

  const onColorChange = (updatedColor: string) => {
    setColor(updatedColor);
  };

  const onEdit = (id: number) => {
    const note = notes.find((note: INote) => note.id === id);
    if (note) {
      setselectedNote(note);
      setDescription(note?.description);
      setColor(note?.color);
      handleOpen();
    }
  };

  const onDelete = (id: number) => {
    setNotes((oldValue: INote[]) =>
      oldValue.filter((note: INote) => note.id !== id)
    );
  };

  const onStar = (id: number) => {
    const note = [...notes].find((note: INote) => note.id === id);
    if (note) {
      note.isStarred = !note.isStarred;
      const newNotes = notes.map((oldNote: INote) => {
        if (oldNote.id === note.id) {
          return { ...note };
        }
        return oldNote;
      });
      setNotes(newNotes);
    }
  };

  const onSelect = () => setShowStarredNotes((prevStar) => !prevStar);
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={()=>{
                setselectedNote(undefined)
                handleOpen()}}
            >
              <AddCircle />
            </IconButton>
            <Dialog
              fullWidth={true}
              maxWidth="sm"
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <TextField
                    className={classes.description}
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    rowsMax={6}
                    id="standard-basic"
                    placeholder="Add description for Your note"
                  />
                  <div className={classes.colorPalate}>
                    <ReactColorPicker color={color} onChange={onColorChange} />
                  </div>

                  <div className={classes.addNote}>
                    <Button variant="contained" onClick={onSubmit}>
                      {selectedNote && selectedNote.id
                        ? 'Update Your Note'
                        : 'Add Your Note'}
                    </Button>
                  </div>
                </div>
              </Fade>
            </Dialog>
            <Typography variant="h6" className={classes.title}>
              Sticky Notes Board
            </Typography>
            <Typography component="div">
              <Grid component="label" container alignItems="center" justify="center" spacing={1}>
                <Grid item>Favourite Notes</Grid>
                <Grid item>
                  <CustomSwitch
                    checked={!showStarredNotes}
                    onChange={onSelect}
                    name="checkedC"
                  />
                </Grid>
                <Grid item>All Notes</Grid>
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12}>
            <SortableList
              axis={'xy'}
              items={
                showStarredNotes
                  ? notes.filter((note: INote) => note.isStarred)
                  : notes
              }
              onSortEnd={onSortEnd}
              onEdit={onEdit}
              onDelete={onDelete}
              onStar={onStar}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CardList;
