import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { NotificationFilters } from "../components/NotificationFilters";
import { NotificationList } from "../components/NotificationList";
import { SectionHeader } from "../components/SectionHeader";
import { useToken } from "../context/TokenContext";
import { fetchPriorityNotifications } from "../services/notifications.service";
import { logFrontend } from "../services/log.service";
import { Notification, NotificationTypeFilter } from "../types/notification";

function matchesSearch(notification: Notification, search: string): boolean {
  if (!search) {
    return true;
  }

  const haystack = `${notification.title ?? ""} ${notification.message} ${notification.type}`.toLowerCase();
  return haystack.includes(search.toLowerCase());
}

export function PriorityInboxPage() {
  const { token } = useToken();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<NotificationTypeFilter>("all");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    void logFrontend("info", "page", "Priority Inbox page loaded", token);
  }, [token]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("Add an access token to load priority notifications.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPriorityNotifications(token);
        if (!active) {
          return;
        }

        setNotifications(data);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "Failed to load priority notifications");
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

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const typeMatches = typeFilter === "all" || notification.type === typeFilter;
      return typeMatches && matchesSearch(notification, search);
    });
  }, [notifications, search, typeFilter]);

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
  };

  return (
    <Stack spacing={3}>
      <SectionHeader
        title="Priority Inbox"
        description="Top 10 notifications ranked by Placement, Result, then Event with recency as a tie-breaker."
      />

      {!token ? <Alert severity="info">Set your access token to load priority data from the backend.</Alert> : null}

      <NotificationFilters
        search={search}
        typeFilter={typeFilter}
        onSearchChange={setSearch}
        onTypeChange={setTypeFilter}
        onReset={resetFilters}
      />

      {loading ? <LoadingState label="Loading priority inbox..." /> : null}

      {error ? <ErrorState message={error} onRetry={() => setReloadKey((value) => value + 1)} /> : null}

      {!loading && !error ? (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredNotifications.length} priority notifications.
          </Typography>
          <NotificationList notifications={filteredNotifications} emptyLabel="No priority notifications matched your filters." />
        </Box>
      ) : null}
    </Stack>
  );
}