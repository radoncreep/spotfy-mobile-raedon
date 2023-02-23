import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { QueryClientManager, reactotronReactQuery } from "reactotron-react-query";
import { queryClient } from './queryClient';

const queryClientManager = new QueryClientManager({queryClient});

Reactotron
  .use(reactotronReactQuery(queryClientManager))
  .setAsyncStorageHandler!(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: "React Native Demo",
    host: '172.20.10.2', // when using expo use machine's ip address
    // host: '192.168.0.140',
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    }
  })
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: { // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate|127.0.0.1/
    },
    editor: false, // there are more options to editor
    errors: { veto: (stackFrame) => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();