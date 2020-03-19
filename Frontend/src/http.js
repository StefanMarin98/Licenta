import axios from "axios";
import { toast } from "bulma-toast";
const config = require("./config.json");

axios.defaults.withCredentials = true; //send cookies

export default {
    /**
     * Get data using ajax
     * @param {string} url
     * @param {mixed} data
     */
    get(url, data = {}) {
        return this.submit("get", url, { params: data });
    },

    /**
     * Put data using ajax
     * @param {string} url
     * @param {mixed} data
     */
    put(url, data = {}) {
        return this.submit("put", url, data);
    },

    /**
     * Post data using ajax
     * @param {string} url
     * @param {mixed} data
     */
    post(url, data = {}) {
        return this.submit("post", url, data);
    },

    /**
     * Delete data using ajax
     * @param {string} url
     * @param {mixed} data
     */
    delete(url, data = {}) {
        return this.submit("delete", url, data);
    },

    /**
     * Patch data using ajax
     * @param {string} url
     * @param {mixed} data
     */
    patch(url, data = {}) {
        return this.submit("patch", url, data);
    },

    /**
     * Make the actual http request and handle the response
     * @param {string} requestType
     * @param {string} url
     * @param {object} data
     */
    submit(requestType, url, data = {}) {
        return new Promise((resolve, reject) => {
            axios[requestType](config.server + url, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error);

                    reject(
                        typeof error.response !== "undefined"
                            ? error.response.data
                            : {}
                    );
                });
        });
    },

    onFail(error) {
        //Process data on failure
        if (error.response && error.response.data) {
            toast({
                message: error.response.data.message,
                type: "is-danger",
                position: "center"
            });
        }
    }
};