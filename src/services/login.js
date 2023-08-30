export const loginV1 = (req, res) => {
    res.status(req.data.status).send(req.data);
}