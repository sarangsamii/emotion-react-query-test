import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@emotion/react";
import theme, { darkTheme } from "services/theme";

const queryClient = new QueryClient();

import styled from "@emotion/styled";
import { useState, createContext } from "react";
import { ContextType } from "types";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const ThemeContext = createContext<ContextType | null>({
  dark: false,
  toggleDark: () => console.log(""),
});

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider
        value={{ dark: isDark, toggleDark: () => setIsDark((prev) => !prev) }}
      >
        <ThemeProvider theme={isDark ? darkTheme : theme}>
          <Container>
            <Component {...pageProps} />
          </Container>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </ThemeProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
