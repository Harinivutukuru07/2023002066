import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Pagination, Stack, Typography } from "@mui/material";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { NotificationFilters } from "../components/NotificationFilters";
import { NotificationList } from "../components/NotificationList";
import { SectionHeader } from "../components/SectionHeader";
import { useToken } from "../context/TokenContext";
import { fetchNotifications } from "../services/notifications.service";
import { logFrontend } from "../services/log.service";
import { Notification, NotificationTypeFilter } from "../types/notification";

const PAGE_SIZE = 8;

function matchesSearch(notification: Notification, search: string): boolean {
  if (!search) {
    return true;
  }

  const haystack = `${notification.title ?? ""} ${notification.message} ${notification.type}`.toLowerCase();
  return haystack.includes(search.toLowerCase());
}

export function AllNotificationsPage() {
  const { token } = useToken();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<NotificationTypeFilter>("all");
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    void logFrontend("info", "page", "All Notifications page loaded", token);
  }, [token]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("Add an access token to load notifications.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchNotifications(token);
        if (!active) {
          return;
        }

        setNotifications(data);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "Failed to load notifications");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    setPage(1);
  }, [search, typeFilter]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const typeMatches = typeFilter === "all" || notification.type === typeFilter;
      return typeMatches && matchesSearch(notification, search);
    });
  }, [notifications, search, typeFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredNotifications.length / PAGE_SIZE));
  const pagedNotifications = filteredNotifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setPage(1);
  };

  return (
    <Stack spacing={3}>
      <SectionHeader
        title="All Notifications"
        description="Browse the full feed with search, type filters, and page-by-page navigation."
      />

      {!token ? <Alert severity="info">Set your access token to load data from the backend.</Alert> : null}

      <NotificationFilters
        search={search}
        typeFilter={typeFilter}
        onSearchChange={setSearch}
        onTypeChange={setTypeFilter}
        onReset={resetFilters}
      />

      {loading ? <LoadingState /> : null}

      {error ? <ErrorState message={error} onRetry={() => setReloadKey((value) => value + 1)} /> : null}

      {!loading && !error ? (
        <Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {pagedNotifications.length} of {filteredNotifications.length} matching notifications.
            </Typography>
          </Stack>
          <NotificationList notifications={pagedNotifications} emptyLabel="Try clearing the current filters." />

          {filteredNotifications.length > PAGE_SIZE ? (
            <Stack alignItems="center" sx={{ mt: 3 }}>
              <Pagination count={pageCount} page={page} onChange={(_event, value) => setPage(value)} color="primary" />
            </Stack>
          ) : null}
        </Box>
      ) : null}
    </Stack>
  );
}