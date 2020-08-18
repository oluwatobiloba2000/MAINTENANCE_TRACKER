import pool from '../models/index';

class UserStats {

    //FOR ADMIN[all logged in users]
    static async allloggedinusers(req, res) {
      
        try {
            const query = "SELECT * FROM users"
            const users = await pool.query(query);
            if (!users.rows.length) return res.status(200).json({
                message: 'no user',
                code: 200
            });
            return res.status(200).json({
                users: users.rows
            })
        } catch (e) {
            return res.status(500).json({
                status: 'server error',
                message: 'Internal server error',
                code: 500
                })
        }
    }

    static async usersCount(req, res) {
      
        try {
            const query = "SELECT COUNT(*) FROM users"
            const usersCount = await pool.query(query);
            return res.status(200).json({
                count: usersCount.rows
            })
        } catch (e) {
            return res.status(500).json({
                status: 'server error',
                message: 'Internal server error',
                code: 500
                })
        }
    }
}

export default UserStats