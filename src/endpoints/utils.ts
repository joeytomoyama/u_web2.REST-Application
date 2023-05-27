import jwt from 'jsonwebtoken'

export function isAuthorized(req: any, res: any, next: Function) {
    if (!req.headers.authorization) return res.status(401).json({ Error: 'Please enter a Token.' })
    const token = req.headers.authorization.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret)
        const decodedObject = decode as jwt.JwtPayload
        console.log(decodedObject)
        res.decodedUser = decodedObject
    } catch (error: any) {
        return res.status(401).json({ Error: error })
    }
    next()
}

export function isAdmin(req: any, res: any, next: Function) {
    if (!res.decodedUser.isAdministrator) return res.status(403).json({ Error: 'You are not an administrator.' })
    next()
}

export function idProvided(req: any, res: any, next: Function) { // kinda useless function. if no id, route is not entered.
    if (!req.params.id) return res.status(400).json({ Error: 'ID missing.' })
    next()
}