import joi from "joi";

async function checkoutValidation (req, res, next) {
    if (!req.body.billingAdress || !req.body.payment || !req.body.purchase || req.body.purchase.length === 0) {
        return res.sendStatus(422);
    }

    const adressSchema = joi.object({
        street: joi.string().required(),
        number: joi.number().required(),
        CEP: joi.string().length(8).pattern(/^[0-9]{8}$/).required()
    }).unknown(true);

    const paymentSchema = joi.object({
        CCNumber: joi.string().length(16).pattern(/^[0-9]{16}$/).required(),
        CCOwner: joi.string().required(),
        CPF: joi.string().length(11).pattern(/^[0-9]{11}$/).required(),
        telephone: joi.string().length(12).pattern(/^[0-9]{12}$/).required(),
        CCSecurityCode: joi.string().length(3).pattern(/^[0-9]{3}$/).required(),
        CCExpirationDate: joi.date().required()
    }).unknown(true);

    const adressValidation = adressSchema.validate(req.body.billingAdress, { abortEarly: false });
    const paymentValidation = paymentSchema.validate(req.body.payment, { abortEarly: false });

    if (adressValidation.error || paymentValidation.error) {
        console.log(paymentValidation.error)
        return res.sendStatus(422);
    }

    next();
}

export default checkoutValidation;