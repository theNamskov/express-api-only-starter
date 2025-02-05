import 'dotenv/config'
import mongoose from 'mongoose'
import chalk from 'chalk'
import {keys} from './keys'

const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta

const DB_URL =
  process.env.NODE_ENV === 'production'
    ? keys.DB_URL_PRODUCTION
    : keys.DB_URL_DEVELOPMENT

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const database = () => {
  mongoose.connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  mongoose.connection.on('connected', function () {
    console.log(connected('Mongoose default connection is open'))
  })

  mongoose.connection.on('error', function (err) {
    console.log(
      error('Mongoose default connection has occured ' + err + ' error'),
    )
  })

  mongoose.connection.on('disconnected', function () {
    console.log(disconnected('Mongoose default connection is disconnected'))
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          'Mongoose default connection is disconnected due to application termination',
        ),
      )
      process.exit(0)
    })
  })
}
