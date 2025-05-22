export default function Footer() {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} RoadBuddy. Всі права захищені.</p>
        <p className="mt-1">Ваш розумний помічник для перетину кордону та заправок.</p>
      </div>
    </footer>
  );
}
