const requireAuth = (req, res, next) => {
  if (!req.session.jwt) {
    return res.status(401).send({
      error: {
        message: 'Tidak diizinkan',
      },
    });
  }

  next();
};

module.exports = { requireAuth };
