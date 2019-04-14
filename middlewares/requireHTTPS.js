module.exports = (req, res, next) => {
    const xfp = req.headers["X-Forwarded-Proto"] || req.headers["x-forwarded-proto"];
    if (xfp === "http") {
        const secureUrl = `https://${req.headers.hostname}${req.url}`;
        res.redirect(301, secureUrl);
    } else {
        next();
    }
  }