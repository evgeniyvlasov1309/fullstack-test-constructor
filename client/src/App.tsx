import { Provider } from "react-redux";
import Root from "./pages/root.page";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
