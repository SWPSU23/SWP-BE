
const checkRole = (req, res, next) => {
    // ex check role === admin
    try {
        next();
    } catch {

    }
}

export const usersMiddleware = { checkRole };