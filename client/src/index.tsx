import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./App";
import { UserProvider } from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";
import { ChoiceProvider } from "./contexts/dialogContext";
import { MenuProvider } from "./contexts/menuContext";
import { FilterProvider } from "./contexts/filterContext";
import { SelectionProvider } from "./contexts/selectionContext";


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      retryDelay: 5000
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <FilterProvider>
          <ChoiceProvider>
            <MenuProvider>
              <SelectionProvider>
                <App />
              </SelectionProvider>
            </MenuProvider>
          </ChoiceProvider>
        </FilterProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
