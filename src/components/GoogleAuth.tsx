import { WebView } from 'react-native-webview';
import { EXPO_PUBLIC_LOGIN_GOOGLE_URL } from '@env';
import { useRef } from 'react';

export default function GoogleAuth(): JSX.Element {
  const webviewRef = useRef<WebView>(null);

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: `${EXPO_PUBLIC_LOGIN_GOOGLE_URL}` }}
      onNavigationStateChange={navState => {
        console.log(navState.url);
      }}
    />
  );
}
