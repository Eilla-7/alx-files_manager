import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import db from '../utils/db';
import { getUserByToken } from '../utils/auth';

const FOLDER_PATH = process.env.FOLDER_PATH || '/tmp/files_manager';

const createFolderIfNotExists = () => {
  if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH, { recursive: true });
  }
};

const generateFilePath = (filename) => {
  return path.join(FOLDER_PATH, crypto.randomUUID(), filename);
};

export default {
  postUpload: async (req, res) => {
    try {
      const { name, type, parentId = 0, isPublic = false, data } = req.body;
      const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token format
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await getUserByToken(token); // Retrieve the user based on token

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!name) {
        return res.status(400).json({ error: 'Missing name' });
      }

      const acceptedTypes = ['folder', 'file', 'image'];
      if (!type || !acceptedTypes.includes(type)) {
        return res.status(400).json({ error: 'Missing or invalid type' });
      }

      if (type !== 'folder' && !data) {
        return res.status(400).json({ error: 'Missing data' });
      }

      if (parentId) {
        const parentFile = await db.query('SELECT * FROM files WHERE id = ?', [parentId]);
        if (!parentFile.length) {
          return res.status(400).json({ error: 'Parent not found' });
        }
        if (parentFile[0].type !== 'folder') {
          return res.status(400).json({ error: 'Parent is not a folder' });
        }
      }

      createFolderIfNotExists();

      let localPath = null;
      if (type !== 'folder') {
        localPath = generateFilePath(name);
        fs.writeFileSync(localPath, Buffer.from(data, 'base64'));
      }

      const newFile = {
        userId: user.id,
        name,
        type,
        isPublic,
        parentId,
        localPath: type !== 'folder' ? localPath : null
      };

      await db.query('INSERT INTO files SET ?', newFile);

      res.status(201).json(newFile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
