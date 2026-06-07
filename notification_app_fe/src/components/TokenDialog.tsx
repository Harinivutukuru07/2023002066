import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useToken } from "../context/TokenContext";

interface TokenDialogProps {
  open: boolean;
  onClose: () => void;
}

export function TokenDialog({ open, onClose }: TokenDialogProps) {
  const { token, setToken, clearToken } = useToken();
  const [value, setValue] = useState(token);

  useEffect(() => {
    setValue(token);
  }, [token, open]);

  const saveToken = () => {
    setToken(value);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Set Access Token</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Paste your bearer token here so the app can fetch notifications and write frontend logs.
          </Typography>
          <TextField
            label="Access Token"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            fullWidth
            multiline
            minRows={4}
            placeholder="eyJhbGciOi..."
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearToken} color="inherit">
          Clear
        </Button>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={saveToken} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}