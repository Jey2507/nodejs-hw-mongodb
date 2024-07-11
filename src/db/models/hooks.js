export const mongoodeSaveError = (error, data, next) => {
    error.status = 400;
    next();
}

export const setUpdateSetting = function(error, data, next) {
    this.options.new = true;
    this.options.runValidotors = true;
    next()
}