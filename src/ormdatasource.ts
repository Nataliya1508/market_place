import config from '@app/ormconfig';
import { DataSource } from 'typeorm';

export default new DataSource(config);
