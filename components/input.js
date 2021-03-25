import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    '@media (max-width: 400px)': {
      width: 300,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Input (props) {
  const classes = useStyles()

  return (
    <Paper ref={props.InputProps.ref} className={classes.root}>
      <InputBase
        className={classes.input}
        inputProps={props.inputProps}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        placeholder="Search comic..."
      />
      <IconButton onClick={props.onSubmit} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
