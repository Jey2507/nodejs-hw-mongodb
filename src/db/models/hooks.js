export const mongooseSaveError = (error, data, next) => {
    const {name, code} = error;
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    console.log(error.status)
    next();
}

export const setUpdateSetting = function(error, data, next) {
    this.options.new = true;
    this.options.runValidotors = true;
    next()
}