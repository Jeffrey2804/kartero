import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
export const localstorageService = {
    getStorageValue,
    useLocalStorage,
};


function getStorageValue(key, defaultValue) {
    // getting stored value
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
}

function useLocalStorage(key, defaultValue) {
    return getStorageValue(key, defaultValue);

}