import {
  useEffect,
  useState
} from 'react';
import {
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" rounded-md border p-2 transition-colors duration-200 hover:bg-muted active:scale-95"
    >
      {theme === "dark" ? (
          <Sun className="h-5 w-5 transition-transform duration-300 rotate-180 scale-100" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
        )
      }
    </button>
  );
}
