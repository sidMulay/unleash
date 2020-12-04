'use strict';

const cors = require('cors');
const unleash = require('./lib/server-impl.js');

// You typically will not hard-code this value in your code!
const sharedSecret = 'dev_test_haptik123';

unleash
    .start({
        db: {
            user: 'unleash_user',
            password: 'passord',
            host: 'localhost',
            port: 5432,
            database: 'unleash',
            ssl: false,
        },
        enableLegacyRoutes: false,
        preRouterHook: app => {
            app.use('/api/client', cors(), (req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                if (req.header('authorization') === sharedSecret) {
                    next();
                } else {
                    res.sendStatus(401);
                }
            });
        },
    })
    .then(server => {
        // eslint-disable-next-line no-console
        console.log(
            `Unleash started on http://localhost:${server.app.get('port')}`,
        );
    });
