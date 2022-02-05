const { check, validationResult } = require('express-validator');

exports.userSignupValidator = async (req, res, next) => {
    await check('name', 'Name is required').notEmpty().run(req)

    await check('email', 'Email must be between 4 to 32 characters')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('Do not use a common word as the password')
        .isLength({
            min: 5
        })
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .run(req)

    await check('password', 'Password is required').notEmpty().run(req)
    await check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage("Password must contain a number")
        .run(req)

    const errors = validationResult(req)
    if (errors) {
        const errObj = Object.values(errors)[1]
        const errA = []
        
        errObj.map((err) => errA.push(err.msg))

        return res.status(400).json({ error: errA })
    }

    next();
};