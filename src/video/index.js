import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import AppStateProvider, { useAppState } from "./state";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ErrorDialog from "./components/ErrorDialog/ErrorDialog";
import LoginPage from "./components/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import theme from "./theme";
import "./types";
import { ChatProvider } from "./components/ChatProvider";
import { ParticipantProvider } from "./components/ParticipantProvider";
import { VideoProvider } from "./components/VideoProvider";
import useConnectionOptions from "./utils/useConnectionOptions/useConnectionOptions";
import UnsupportedBrowserWarning from "./components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";

const VideoApp = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      {/* Ensure that AppStateProvider wraps the component using useAppState */}
      <ParticipantProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ParticipantProvider>
    </VideoProvider>
  );
};

export default function ReactApp() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <UnsupportedBrowserWarning>
          <AppStateProvider>
            <VideoApp />
          </AppStateProvider>
        </UnsupportedBrowserWarning>
      </MuiThemeProvider>
    </div>
  );
}
