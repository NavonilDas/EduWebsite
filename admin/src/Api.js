const API = {
    HOST: 'http://localhost:4000/',
    // CDN or any URL
    IMG: 'http://localhost:4000/static/'
};

export default API;

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