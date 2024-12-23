export default function verifyRoles(...roles) {
	return (req, res, next) => {
        console.log(req.user.role)
		const userRoles = req.user.role;
        if (roles.includes(userRoles)) {
            return next();
        }
        return res.sendStatus(403);
	};
}