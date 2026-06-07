import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { LoadingState } from "../components/LoadingState";

const AllNotificationsPage = lazy(() =>
  import("../pages/AllNotificationsPage").then((module) => ({ default: module.AllNotificationsPage }))
);

const PriorityInboxPage = lazy(() =>
  import("../pages/PriorityInboxPage").then((module) => ({ default: module.PriorityInboxPage }))
);

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingState label="Loading notifications page..." />}>
              <AllNotificationsPage />
            </Suspense>
          }
        />
        <Route
          path="/priority"
          element={
            <Suspense fallback={<LoadingState label="Loading priority inbox..." />}>
              <PriorityInboxPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}