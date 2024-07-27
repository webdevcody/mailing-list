export function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header>
      {isAuthenticated && <a href="/">Dashboard</a>}
      {isAuthenticated && <a href="/logout">Logout</a>}
      {!isAuthenticated && <a href="/login">Logout</a>}
    </header>
  );
}
