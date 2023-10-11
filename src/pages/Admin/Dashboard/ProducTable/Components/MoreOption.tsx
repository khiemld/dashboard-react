import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import MobiledataOffIcon from '@mui/icons-material/MobiledataOff'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { SortType } from '../../../../../redux/reducers/adminSlice/type';
import { getAllProduct } from '../../../../../redux/reducers/adminSlice/adminSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../redux/store';

type MoreOptionProps = {
  name: string,
  handleSort: (orderBy : string , sortBy : SortType) => void
}

const commonStyle = {
  color: 'grey.600',
  fontSize: '14px'
}

const itemStyle = {
  display: 'flex', gap: 1
}

export default function MoreOption({name, handleSort} : MoreOptionProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation()
  };
  const handleClose = () => {
    setAnchorEl(null)
  };


  const handleSortByASC = () => {
    handleSort(name, 'asc')
    setAnchorEl(null)
  }

  const handleSortByDESC = () => {
    handleSort(name, 'desc')
    setAnchorEl(null)
  }

  const handleNoneSort = () => {
    handleSort('', '')
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSortByASC} sx={itemStyle}>
          <NorthIcon  sx={commonStyle} />
          <Typography variant='subtitle2' sx={commonStyle} >Sort by ASC</Typography>
        </MenuItem>
        <MenuItem onClick={handleSortByDESC} sx={itemStyle}>
          <SouthIcon  sx={commonStyle}/>
          <Typography variant='subtitle2' sx={commonStyle}>Sort by DESC</Typography>
        </MenuItem>
        <MenuItem onClick={handleNoneSort} sx={itemStyle}>
          <MobiledataOffIcon  sx={commonStyle} />
          <Typography variant='subtitle2' sx={commonStyle}>None Sort</Typography>
        </MenuItem>

      </Menu>
    </div>
  );
}