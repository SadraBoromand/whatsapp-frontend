import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import { getdefualtMiddleware } from "@reduxjs/toolkit";
// slices
import userSlice from "../features/userSlice";

// saveUserOnlyFilter
const saveUserOnlyFilter = createFilter("user", ["user"]);

// presist config
const presist = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice,
});
const presistedReducer = persistReducer(presist, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
  middleware: (getdefualtMiddleware) =>
    getdefualtMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
