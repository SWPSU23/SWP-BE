const getListUser = (res) => {
    try {
        return res.json([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
        ]);
    } catch {

    }
}

module.exports = getListUser;