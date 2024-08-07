import { checkRedis, checkDb, countUsers, countFiles } from '../utils';

const AppController = {
  async getStatus(req, res) {
    try {
      const redisAlive = await checkRedis();
      const dbAlive = await checkDb();

      res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getStats(req, res) {
    try {
      const usersCount = await countUsers();
      const filesCount = await countFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default AppController;
