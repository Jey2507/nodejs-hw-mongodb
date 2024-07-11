import createHttpError from "http-errors";

const validateBody = validSchema => {
    const func = async (req, res, next) => {
        try {
            await validSchema.validateAsync(req.body,{
                abortEarly: false,
            });

            next()

        } catch (error) {
            const responseError = createHttpError(400, error.message, {
                errors: error.details,
            })

            next(responseError)
        }
    }
   
    return func;
}

export default validateBody;