const HOST = 'http://localhost:4000/';
const IMG = 'http://localhost:4000/static/';

export {
    HOST,
    IMG
};

export function errorHandler(err, ctx) {
    console.error(err);
    if (err?.response?.status === 401) {
        // Unauthorised Clear Cookie
        document.cookie = 'ID=;expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear Cookie
    }
    if (err.response?.data?.error) {
        ctx.setState({ apiError: err.response.data.error });
    } else {
        ctx.setState({ apiError: "Something Went Wrong!" });
    }
}

export function toFormData(obj) {
    const data = new FormData();
    for (const key in obj) {
        if (obj[key]) {
            data.append(key, obj[key]);
        }
    }
    return data;
}

export function getCookies() {
    const cookies = document.cookie.split(';');
    const ans = {};
    for (const cookie of cookies) {
        const key_val = cookie.split('=');
        if (key_val.length === 2) {
            ans[key_val[0]] = key_val[1];
        }
    }
    return ans;
}