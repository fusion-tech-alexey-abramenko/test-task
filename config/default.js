module.exports = {
  app: {
    port: 3000,
  },
  typeorm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test-task',
    password: 'test-task',
    database: 'test-task',
    synchronize: false,
    logging: false,
  },
  body_parser_limit: '1mb',
  user_password_salt: 'salt',
};
