import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export function LoadingState({ label = "Loading notifications..." }: { label?: string }) {
  return (
    <Box sx={{ py: 8 }}>
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <CircularProgress />
        <Typography color="text.secondary">{label}</Typography>
      </Stack>
    </Box>
  );
}