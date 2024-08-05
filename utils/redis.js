import { createClient } from 'redis';

class RedisClient {
  constructor () {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });

    this.client.on('connect', () => {
      console.log('Redis client connected');
      this.isClientConnected = true;
    });
  }

  isAlive () {
    return this.isClientConnected;
  }

  async get (key) {
    if (!this.isClientConnected) {
      console.error('Redis client is not connected');
    }
    return await this.client.get(key);
  }

  async set (key, value, duration) {
    if (!this.isClientConnected) {
      throw new Error('Redis client is not connected');
    }
    await this.client.setEx(key, duration, value);
  }

  async del (key) {
    if (!this.isClientConnected) {
      throw new Error('Redis client is not connected');
    }
    await this.client.del(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
