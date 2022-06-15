module.exports = {
    // A func that takes in two parameters `req` and `res` [request, response]
    // could typically be a controller in an api
    getIndexPage: (req, res) => {
        // Using stubs allows us to fake a call on res.send an check which args it sent
        res.send("Hey");
    }
}