export function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header class={"space-x-4"}>
      {isAuthenticated && (
        <a target="_blank" href="https://mjml.io/try-it-live">
          MJML Editor
        </a>
      )}
      {isAuthenticated && <a href="/dashboard">Dashboard</a>}
      {isAuthenticated && <a href="/logout">Logout</a>}
      {!isAuthenticated && <a href="/login">Logout</a>}
    </header>
  );
}
