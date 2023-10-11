import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import MobiledataOffIcon from '@mui/icons-material/MobiledataOff'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ActiveType } from '../../../../../redux/reducers/adminSlice/type';
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'

type MoreOptionProps = {
  handleSortActive: (activeType : ActiveType) => void
}


const commonStyle = {
  color: 'grey.600',
  fontSize: '14px'
}

const itemStyle = {
  display: 'flex', gap: 1
}

export default function ActiveOptions({handleSortActive} : MoreOptionProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSortActiveTrue = () => {
    handleSortActive(true)
    setAnchorEl(null)
  }

  const handleSortActiveFalse = () => {
    handleSortActive(false)
    setAnchorEl(null)
  }

  const handleNoneSort = () => {
    handleSortActive('', '')
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
        PaperProps={{
          style: {
            width: '20ch'
          },
        }}
      >
        <MenuItem onClick={handleSortActiveTrue} sx={itemStyle}>
          <CheckBoxIcon sx={commonStyle}/>
          <Typography variant='subtitle2' sx={commonStyle}>Active</Typography>
        </MenuItem>
        <MenuItem onClick={handleSortActiveFalse} sx={itemStyle}>
          <IndeterminateCheckBoxIcon sx={commonStyle} />
          <Typography variant='subtitle2' sx={commonStyle}>Inactive</Typography>
        </MenuItem>
        <MenuItem onClick={handleNoneSort} sx={itemStyle}>
          <MobiledataOffIcon  sx={commonStyle}/>
          <Typography variant='subtitle2' sx={commonStyle}>None Sort</Typography>
        </MenuItem>

      </Menu>
    </div>
  );
}