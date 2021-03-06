const autobahn = require('autobahn')

async function main() {
  const connection = new autobahn.Connection({ url: 'ws://127.0.0.1:41240/ws', realm: 'realm1' })

  connection.onopen = session => {
    session.publish('com.myapp.hello', ['Hello, world!'])

    session.call('com.myapp.add2', [2, 3]).then(function(res) {
      console.log('Result:', res)
    })
  }

  await connection.open()
  setTimeout(() => {
    connection.close()
  }, 1000)
}

main()
