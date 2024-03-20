import {createContext, useContext, useRef} from "react";
import data from "../resource/data.json";

export const InitDataContext = createContext(data);

export const HttpResourceContext = createContext (null);

export const AppResourceContext = createContext(null);
