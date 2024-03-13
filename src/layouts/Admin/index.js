import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Menu = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "25px 16px",
  boxSizing: "border-box",
  backgroundColor: "#212121",
}));

const CardBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const MenuItem = styled(Typography)`
  color: ${(props) =>
    props.active
      ? props.theme.palette.primary.main
      : 'grey'};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  cursor: pointer;
`;

const Admin = (props) => {
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container spacing={0} sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={1.5}
          height="100%"
          sx={{borderRight: "1px solid #dedede", height: "100vh" }}
        >
          <Menu>
            <svg
              style={{ marginBottom: "20px" }}
              id="logo-38"
              width="78"
              height="32"
              viewBox="0 0 78 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
                class="ccustom"
                fill="#FF7A00"
              ></path>
              <path
                d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
                class="ccompli1"
                fill="#FF9736"
              ></path>
              <path
                d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
                class="ccompli2"
                fill="#FFBC7D"
              ></path>
            </svg>
            <MenuItem active={window.location.pathname === '/admin'} >
              <Link to="/admin">Dashboard</Link>
            </MenuItem>
            <MenuItem active={window.location.pathname.startsWith('/admin/orders')}>
              <Link to="/admin/orders">Orders</Link>
            </MenuItem>
            <MenuItem active={window.location.pathname.startsWith('/admin/products') || window.location.pathname.startsWith('/admin/create-product')}>
              <Link to="/admin/products">Products</Link>
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={10.5} sx={{ px: 3 }}>
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
