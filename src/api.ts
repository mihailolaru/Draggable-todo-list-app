//This function will accept the current state and send it to the backend as JSON. In case
// of an unsuccessful save we’ll throw an error.
import { AppState } from "./state/appStateReducer";

export const save = (payload: AppState) => {
    return fetch("http://localhost:4000/save", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (response.ok){
                return response.json();
            } else {
                throw new Error("Error while saving the state.");
            }
        })
};

// This function will load the previously saved data from the backend. We cast the JSON
// parsing result to the AppState type. Just like in the save function we’ll throw an error
// if the backend will return a non-ok status.

export const load = () => {
    console.log("load() worked!");
    return fetch("http://localhost:4000/load", {
        method: "GET",
    })
        .then(
        (response) => {
            if (response.ok){
                console.log("load() response: ", response);
                return response.json() as Promise<AppState>;
            } else {
                throw new Error("Error while loading the state.");
            }
        }
    );
};
