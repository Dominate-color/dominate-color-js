import { Main } from './Main/Main';
import { ThemeProvider } from './ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
