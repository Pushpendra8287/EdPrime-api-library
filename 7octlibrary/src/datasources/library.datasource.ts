import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Library',
  connector: 'mongodb',
  url: 'mongodb+srv://EdPrimeLibrary:PLUGVSHvvD2c3YPH@cluster0.fbavnvc.mongodb.net/ED',
  host: '',
  port: '',
  user: '',
  password: '',
  database: 'ED',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LibraryDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'Library';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Library', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
