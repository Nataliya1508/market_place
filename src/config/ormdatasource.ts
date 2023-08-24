import { DataSource } from 'typeorm';
import config from '@app/config/ormconfig';

export default new DataSource(config);
