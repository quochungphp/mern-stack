const util = require('util');
const notify = require('../configs/notify');

const options = {
    field: {
        min: 1,
        max: 50
    }
}

module.exports = {
    validator: (req) => {
        req.checkBody('fullname', util.format(notify.FIELD_IS_NOT_EMPTY))
            .isLength({
                min: options.field.min,
                max: options.field.max
            })

        req.checkBody('address', util.format(notify.FIELD_IS_NOT_EMPTY))
            .isLength({
                min: options.field.min,
                max: options.field.max
            })

        req.checkBody('order', util.format(notify.FIELD_IS_NOT_EMPTY))
            .isLength({
                min: options.field.min,
                max: options.field.max
            })

        req.checkBody('status', util.format(notify.FIELD_IS_NOT_EMPTY))
            .isLength({
                min: options.field.min,
                max: options.field.max
            })

        req.checkBody('order', util.format(notify.FIELD_IS_NOT_EMPTY))
            .notEmpty()
    }
}
