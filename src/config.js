module.exports = {
    api:
        process.env.NODE_ENV === "development"
            ? "http://localhost:5000"
            : "https://health-nut-api.herokuapp.com/",
};
