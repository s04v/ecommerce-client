import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const BaseBox = styled(Box)(({theme}) => ({
  minHeight: "100vh"
}));

const SearchInput = styled(TextField)(({theme}) => ({
}));

const Header = styled(Grid)`
  border-bottom: 1px solid #dedede;
`

const Menu = styled(Grid)`
`

const MenuItem = styled(Grid)`
  font-size: 16px;
  cursor: pointer;
  margin: 15px 0;
`

const PageHeader = styled(Grid)`
  color: ${props => props.theme.palette.neutral};
`

const Base = (props) => {
  return (
    <BaseBox >
      <Header container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 30, py: 3}}
      >
        <Grid item>
        <svg id="logo-38" width="78" height="32" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#FFBC7D"></path> </svg>
        </Grid>
        <Grid item md={4}>
          <SearchInput size="small" fullWidth placeholder="Enter Your Product Name" />
        </Grid>
        <Grid item>
          <PersonOutlineOutlinedIcon fontSize="large" />
          <FavoriteBorderOutlinedIcon fontSize="large" />
          <ShoppingBagOutlinedIcon fontSize="large" />
        </Grid>
      </Header>
      <Menu container justifyContent="center" spacing={3}>
        <MenuItem item>
          <Link to="/">
            <Typography>Home</Typography>
          </Link>
        </MenuItem>
        <MenuItem item>
          <Link to="/admin">
            <Typography>Admin</Typography>
          </Link>
        </MenuItem>
        <MenuItem item>
          <Link to="/cart">
            <Typography>Cart</Typography>
          </Link>
        </MenuItem>
      </Menu>
      <PageHeader container
        justifyContent="space-between"
        sx={{ px: 30, py: 4}}
      >
        <Grid item>Shop</Grid>
        <Grid item>Home >> shop</Grid>
      </PageHeader>
      <Box sx={{height: '100%', px: 30}}>
        {props.children}
      </Box>

    </BaseBox>
  );
}

export default Base;