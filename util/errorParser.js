function errorParser(err) {

    if (err.type == "ValidationError") {
        return Object.values(err.errors).map(x => x.message);
    } else if (Array.isArray(err)) {
        return err.map(x => x.msg);
    } else {
        return err.message.split('/n');
    }
}

module.exports = errorParser;