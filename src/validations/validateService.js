export const validate = (fn) => (req, res, next) => {

    Promise.resolve(fn(req, res, next))
        .catch((err) => {
            console.log(err)
            res.json({
                msg: "error en " + (fn.toString().split("("))[0],
                error: err.toString(),
            })
        });
}