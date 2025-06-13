export function getInitials(name) {
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts[parts.length - 1]?.[0] || "";

  if (parts.length === 1) return first.toUpperCase();
  return `${first}${last}`.toUpperCase();
}
