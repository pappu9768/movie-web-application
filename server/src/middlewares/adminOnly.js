


export const adminOnly = (req, res, next) => {
    try {
        if (req.user == 0) {
            // console.log(req.user);
           return next()
        } else {
            return res.status(403).json({
                message:"Access denied"
            })
        }
        // console.log(req.user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Server error"

        })
    }

    
}