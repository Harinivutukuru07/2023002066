import { Stack, Typography } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <Stack spacing={1} sx={{ mb: 3 }}>
      <Typography variant="h4">{title}</Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Stack>
  );
}