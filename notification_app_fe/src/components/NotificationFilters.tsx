import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { NotificationTypeFilter } from "../types/notification";

interface NotificationFiltersProps {
  search: string;
  typeFilter: NotificationTypeFilter;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: NotificationTypeFilter) => void;
  onReset: () => void;
}

export function NotificationFilters({
  search,
  typeFilter,
  onSearchChange,
  onTypeChange,
  onReset,
}: NotificationFiltersProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "background.paper",
        boxShadow: "0 12px 30px rgba(18,53,91,0.08)",
      }}
    >
      <TextField
        label="Search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by title, message, or type"
        fullWidth
      />
      <TextField
        select
        label="Type"
        value={typeFilter}
        onChange={(event) => onTypeChange(event.target.value as NotificationTypeFilter)}
        sx={{ minWidth: { xs: "100%", md: 200 } }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </TextField>
      <Button variant="outlined" onClick={onReset} sx={{ minWidth: { xs: "100%", md: 140 } }}>
        Reset
      </Button>
    </Stack>
  );
}