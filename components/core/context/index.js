import {createContext, useContext, useRef} from "react";
import data from "../resource/data.json";
import {HttpResourceFactory} from "../factory/HttpResourceFactory";
import {AuthenticationManager} from "../authentication/AuthenticationManager";

export const InitDataContext = createContext(data);

