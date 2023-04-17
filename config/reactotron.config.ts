import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { QueryClientManager, reactotronReactQuery } from "reactotron-react-query";
import { queryClient } from './queryClient';

const queryClientManager = new QueryClientManager({queryClient});

Reactotron
  .use(reactotronReactQuery(queryClientManager))
  .setAsyncStorageHandler!(AsyncStorage)
  .configure({
    name: "React Native Demo",
    host: '',
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    }
  })
  .useReactNative({
    asyncStorage: false, 
    networking: { 
      ignoreUrls: /symbolicate|127.0.0.1/
    },
    editor: false, 
    errors: { veto: (stackFrame) => false }, 
    overlay: false, 
  })
  .connect();
