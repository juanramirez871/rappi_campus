export const validate = (fn) => (req, res, next) => {

    Promise.resolve(fn(req, res, next))
        .catch((err) => {
            console.log(err)
            if (err.toString().includes("MongoServerError")) {

                if(err?.errInfo?.details?.schemaRulesNotSatisfied?.[0]?.propertiesNotSatisfied?.[0]){
                    delete err.errInfo.details?.schemaRulesNotSatisfied[0]?.propertiesNotSatisfied[0]?.details
                    res.status(400).json({ msg: "Error en la validacion en los campos", error: err.errInfo.details.schemaRulesNotSatisfied[0]?.propertiesNotSatisfied[0] })
                }else{

                if (err.errInfo && err.errInfo.details) {
                    res.status(400).json({ msg: 'Error en la validacion en los campos', error: "campos requeridos: " + err.errInfo.details.schemaRulesNotSatisfied[0].missingProperties.join(", ") });
                } else {
                    res.status(400).json({ msg: 'Error en la validacion en los campos', error: err.message });
                }
            }
            }else{
                res.status(400).json({
                    msg: "error en " + (fn.toString().split("("))[0],
                    error: err.toString(),
                })
            }
        });
}