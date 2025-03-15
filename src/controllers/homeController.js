const index = (req, res) => {
    res.render('index', { title: 'Trang Chủ' });
};

module.exports = { index };
