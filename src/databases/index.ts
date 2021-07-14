import config from 'config';
import Sequelize from 'sequelize';
import { sqlDbConfig, noSQLDbConfig } from '@interfaces/db.interface';
import UserModel from '@/models/parents.model';
import { logger } from '@utils/logger';
import ChildModel from '@/models/children.model';
import DeviceModel from '@/models/devices.model';
import DevicePositions from '@/models/positions.model';
import AndroidDeviceModel from '@/models/android.model';
import AndroidDevicePolicyModel from '@/models/android_device_policy.model';
import { mongoose } from '@typegoose/typegoose';
import AndroidDeviceReportModel from '@/models/android_device_report.model';

const { host, user, password, database, pool }: sqlDbConfig = config.get('dbConfig');
const noSqlConfig: noSQLDbConfig = config.get('noSqldbConfig');

const typegoose = mongoose.connect(noSqlConfig.uri, {
  user: noSqlConfig.user,
  pass: noSqlConfig.password,
  dbName: noSqlConfig.database,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Parents: UserModel(sequelize),
  Children: ChildModel(sequelize),
  DevicePositions: DevicePositions(sequelize),
  Devices: DeviceModel(sequelize),
  AndroidDevices: AndroidDeviceModel(sequelize),
  AndroidDevicePolicies: AndroidDevicePolicyModel(),
  AndroidDeviceReports: AndroidDeviceReportModel(),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
  typegoose, // connection instance (RAW quieries)
};

export default DB;
