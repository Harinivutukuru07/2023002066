import { AppBar, Box, Button, Container, Stack, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { TokenDialog } from "./TokenDialog";
import { useToken } from "../context/TokenContext";

const NAV_ITEMS = [
  { label: "All Notifications", path: "/" },
  { label: "Priority Inbox", path: "/priority" },
];

export function AppShell() {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { token } = useToken();
  const [dialogOpen, setDialogOpen] = useState(false);

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(18,53,91,0.12), transparent 30%), linear-gradient(180deg, #f8fbff 0%, #eef3f8 100%)",
      }}
    >
      <AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: "blur(16px)" }}>
        <Toolbar sx={{ py: 1.5, gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography variant="h6" color="primary">
              Notification Priority Inbox
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Responsive Stage 7 dashboard with priority ranking and filters.
            </Typography>
          </Box>

          <Stack direction={isDesktop ? "row" : "column"} spacing={1} alignItems={isDesktop ? "center" : "stretch"}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                variant={activePath === item.path ? "contained" : "outlined"}
                color="primary"
                sx={{ minWidth: 170 }}
              >
                {item.label}
              </Button>
            ))}
            <Button variant="contained" color="secondary" onClick={() => setDialogOpen(true)}>
              {token ? "Update Token" : "Set Token"}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 3, md: 4 } }}>
        <Outlet />
      </Container>

      <TokenDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}